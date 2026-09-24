import "server-only";

/* =========================================================
   SPAM GUARD
   The public enquiry form was found by a link-spam botnet:
   it posted Cyrillic "money transfer" text with a payload
   URL, and because the site emails a confirmation to the
   address the visitor types, our Gmail ended up mailing
   that spam back out to hundreds of strangers. Google then
   blocked those messages as suspicious.

   So every submission now has to clear these checks before
   anything is stored or emailed. A submission that fails is
   dropped silently — a bot must not learn which rule caught
   it, and a rejection message would only help it retry.
========================================================= */

/** Cyrillic, Greek, Arabic, Hebrew, CJK — none of it belongs in an Indian travel enquiry. */
const NON_LATIN = /[Ѐ-ӿͰ-Ͽ؀-ۿ֐-׿぀-ヿ一-鿿]/;

/** Any link at all. Real callers type a name and a trip, not a URL. */
const LINK = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(ru|su|xyz|top|click|link|tk|cn|info|online|site|shop)\b|\bt\.me\b|\[url|<a\s)/i;

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
];

/**
 * @returns {string|null} the rule that matched, or null when the
 * submission looks like it came from a person.
 */
export function enquirySpamReason({ name = "", phone = "", email = "", message = "", honeypot = "", elapsedMs = null }) {
  // A field hidden from people; only a form-filling bot types in it.
  if (honeypot.trim()) return "honeypot filled";

  // Nobody reads a form and types a real enquiry in under three seconds.
  if (typeof elapsedMs === "number" && elapsedMs >= 0 && elapsedMs < 3000) {
    return "submitted too fast";
  }

  const haystack = `${name} ${message}`;

  if (NON_LATIN.test(haystack)) return "non-latin script";
  if (LINK.test(haystack)) return "contains a link";
  if (name.length > 60) return "name too long";
  if ((name.match(/\d/g) || []).length > 3) return "digits in name";
  if (!INDIAN_MOBILE.test(phone)) return "not an Indian mobile number";
  if (email.length > 120) return "email too long";

  const lower = haystack.toLowerCase();
  if (SPAM_WORDS.some((word) => lower.includes(word))) return "spam keyword";

  return null;
}

/* ---------- per-IP rate limit ----------
   In-memory, so it resets on deploy and is per serverless
   instance. That is fine: it exists to blunt a flood from a
   single address, not to be an audit trail. */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 4;
const hits = new Map();

export function rateLimited(key) {
  if (!key) return false;

  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

/** Best-effort client IP from the proxy headers Vercel sets. */
export function clientIp(headerList) {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headerList.get("x-real-ip") || "";
}
