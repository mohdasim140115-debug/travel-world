import "server-only";

import { getCollection } from "./mongodb.js";

/* =========================================================
   SPAM GUARD
   The public enquiry form was found by a link-spam botnet:
   it posted Cyrillic "money transfer" text with a payload
   URL, and because the site emailed a confirmation to the
   address the visitor typed, our Gmail ended up mailing that
   spam back out to hundreds of strangers. Google blocked
   those as suspicious, which puts the account at risk.

   Three layers now stand in the way:

     1. content rules   — what a submission may contain
     2. rate limit      — how often one address may submit
     3. auto-block      — repeat offenders are shut out

   A submission that fails is dropped silently. A bot must
   not learn which rule caught it, or it will tune its
   payload and try again.
========================================================= */

/** Cyrillic, Greek, Arabic, Hebrew, CJK — none of it belongs in an Indian travel enquiry. */
const NON_LATIN = /[Ѐ-ӿͰ-Ͽ؀-ۿ֐-׿぀-ヿ一-鿿]/;

/** Any link at all. Real callers type a name and a trip, not a URL. */
const LINK =
  /(https?:\/\/|www\.|\b[a-z0-9-]+\.(ru|su|xyz|top|click|link|tk|cn|info|online|site|shop|icu|buzz)\b|\bt\.me\b|\[url|<a\s|&lt;a\s)/i;

/** Indian mobile numbers are ten digits and start 6-9. */
const INDIAN_MOBILE = /^[6-9]\d{9}$/;

const SPAM_WORDS = [
  "перевод",
  "crypto",
  "bitcoin",
  "casino",
  "porn",
  "viagra",
  "seo service",
  "backlink",
  "loan approval",
  "forex",
];

/** "Hsmwn Kozlppdjc" — a machine-made name: long runs of consonants, almost no vowels. */
function looksGenerated(name) {
  const words = name.split(/\s+/).filter((w) => w.length >= 5);
  if (!words.length) return false;

  return words.every((word) => {
    const letters = word.toLowerCase().replace(/[^a-z]/g, "");
    if (letters.length < 5) return false;

    const vowels = (letters.match(/[aeiou]/g) || []).length;
    const longestConsonantRun = Math.max(
      ...(letters.split(/[aeiou]/).map((run) => run.length) || [0]),
    );

    return vowels / letters.length < 0.25 || longestConsonantRun >= 5;
  });
}

/**
 * @returns {string|null} the rule that matched, or null when the
 * submission looks like it came from a person.
 */
export function enquirySpamReason({
  name = "",
  phone = "",
  email = "",
  message = "",
  honeypot = "",
  elapsedMs = null,
  userAgent = null,
}) {
  // A field hidden from people; only a form-filling bot types in it.
  if (honeypot.trim()) return "honeypot filled";

  // Nobody reads a form and types a real enquiry in under three seconds.
  if (typeof elapsedMs === "number" && elapsedMs >= 0 && elapsedMs < 3000) {
    return "submitted too fast";
  }

  // A real browser always sends one; scripted posts often do not.
  if (typeof userAgent === "string" && userAgent.trim().length < 15) {
    return "no browser user-agent";
  }

  const haystack = `${name} ${message}`;

  if (NON_LATIN.test(haystack)) return "non-latin script";
  if (LINK.test(haystack)) return "contains a link";
  if (name.length > 60) return "name too long";
  if ((name.match(/\d/g) || []).length > 3) return "digits in name";
  if (looksGenerated(name)) return "machine-generated name";
  if (!INDIAN_MOBILE.test(phone)) return "not an Indian mobile number";
  if (email.length > 120) return "email too long";
  if (message.length > 1500) return "message too long";

  const lower = haystack.toLowerCase();
  if (SPAM_WORDS.some((word) => lower.includes(word))) return "spam keyword";

  return null;
}

/* ---------- per-IP rate limit, auto-block and a global brake ----------
   Held in MongoDB so the limits survive a redeploy and apply across
   every serverless instance — an in-memory counter resets far too
   easily to stop a determined flood. */

const WINDOW_MS = 60 * 60 * 1000; // one hour
const MAX_PER_WINDOW = 5; // submissions per address per hour
const STRIKES_TO_BLOCK = 3; // failures before a 24-hour block
const STRIKES_TO_BAN = 8; // failures before a 30-day block
const BLOCK_MS = 24 * 60 * 60 * 1000;
const BAN_MS = 30 * 24 * 60 * 60 * 1000;

/** Above this many submissions site-wide in ten minutes, stop mailing anyone but the office. */
const SURGE_WINDOW_MS = 10 * 60 * 1000;
const SURGE_LIMIT = 25;

async function visitors() {
  return getCollection("formVisitor");
}

/** Best-effort client IP from the proxy headers Vercel sets. */
export function clientIp(headerList) {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headerList.get("x-real-ip") || "";
}

/**
 * Record this attempt and say whether it should be let through.
 * Never throws: a database hiccup must not take the forms down.
 *
 * @returns {Promise<{ allowed: boolean, blocked: boolean, surge: boolean }>}
 */
export async function checkVisitor(ip, { spam }) {
  if (!ip) return { allowed: !spam, blocked: false, surge: false };

  try {
    const collection = await visitors();
    const now = Date.now();
    const existing = await collection.findOne({ _id: ip });

    if (existing?.blockedUntil > now) {
      await collection.updateOne({ _id: ip }, { $set: { lastSeen: now }, $inc: { attempts: 1 } });
      return { allowed: false, blocked: true, surge: false };
    }

    const recent = (existing?.times || []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);

    const strikes = (existing?.strikes || 0) + (spam ? 1 : 0);
    const overRate = recent.length > MAX_PER_WINDOW;

    const update = {
      lastSeen: now,
      times: recent.slice(-20),
      strikes,
    };

    // Repeat offenders stop being a problem we re-evaluate every time.
    if (strikes >= STRIKES_TO_BAN) update.blockedUntil = now + BAN_MS;
    else if (strikes >= STRIKES_TO_BLOCK) update.blockedUntil = now + BLOCK_MS;
    else if (overRate) update.blockedUntil = now + WINDOW_MS;

    await collection.updateOne({ _id: ip }, { $set: update }, { upsert: true });

    return {
      allowed: !spam && !overRate,
      blocked: Boolean(update.blockedUntil),
      surge: await inSurge(collection, now),
    };
  } catch (error) {
    console.error("[spamGuard] visitor check failed:", error.message);
    return { allowed: !spam, blocked: false, surge: false };
  }
}

async function inSurge(collection, now) {
  try {
    const since = now - SURGE_WINDOW_MS;
    const count = await collection.countDocuments({ lastSeen: { $gt: since } });
    return count > SURGE_LIMIT;
  } catch {
    return false;
  }
}

/** True while the site is being flooded — callers should skip guest email. */
export async function underAttack() {
  try {
    const collection = await visitors();
    return await inSurge(collection, Date.now());
  } catch {
    return false;
  }
}
