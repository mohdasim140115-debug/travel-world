import nodemailer from "nodemailer";

/* =========================================================
   EMAIL
   Plain SMTP (Gmail works with an app password), so there is
   no paid service and no domain to verify.

   Nothing here ever throws. A booking that reached the
   database must not fail because the mail server was slow or
   the password was wrong — the row is what matters, the email
   is a convenience. Failures are logged and reported instead.

   Some hosts block port 465 outbound, so a connection failure
   is retried once on 587 (STARTTLS) before giving up.
========================================================= */

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, BOOKING_ALERT_TO } = process.env;

export const mailConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

// Google prints app passwords as "abcd efgh ijkl mnop"; the spaces are display only.
const password = (SMTP_PASS ?? "").replace(/\s/g, "");

const PRIMARY_PORT = Number(SMTP_PORT) || 465;
const FALLBACK_PORT = PRIMARY_PORT === 465 ? 587 : 465;

const CONNECTION_ERRORS = ["ETIMEDOUT", "ECONNREFUSED", "ESOCKET", "ECONNRESET", "EDNS"];

function buildTransport(port) {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: password },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
  });
}

const transports = new Map();

function getTransport(port) {
  if (!mailConfigured) return null;
  if (!transports.has(port)) transports.set(port, buildTransport(port));
  return transports.get(port);
}

const looksLikeConnectionProblem = (error) =>
  CONNECTION_ERRORS.includes(error?.code) || /timed? ?out|connection|socket/i.test(error?.message ?? "");

/** Where new-booking alerts go — falls back to the sending account. */
export function alertRecipient() {
  return BOOKING_ALERT_TO || SMTP_USER || null;
}

export async function sendMail({ to, subject, html, replyTo }) {
  if (!to) return { sent: false, reason: "no recipient" };
  if (!mailConfigured) {
    console.warn(`[mail] SMTP not configured — skipped "${subject}"`);
    return { sent: false, reason: "not configured" };
  }

  const message = {
    from: `"Honor Tour & Travels" <${SMTP_USER}>`,
    to,
    subject,
    html,
    replyTo,
  };

  for (const port of [PRIMARY_PORT, FALLBACK_PORT]) {
    try {
      await getTransport(port).sendMail(message);
      if (port !== PRIMARY_PORT) console.warn(`[mail] port ${PRIMARY_PORT} failed, sent on ${port} instead`);
      return { sent: true, port };
    } catch (error) {
      console.error(`[mail] port ${port} failed for "${subject}": ${error.message}`);
      if (!looksLikeConnectionProblem(error)) {
        return { sent: false, reason: error.message, port }; // bad password etc — retrying will not help
      }
    }
  }

  return { sent: false, reason: `both ports (${PRIMARY_PORT}, ${FALLBACK_PORT}) failed` };
}

/** Diagnostics for the admin-only status route: does the login actually work? */
export async function verifyMail() {
  if (!mailConfigured) {
    return {
      configured: false,
      host: SMTP_HOST ?? null,
      user: SMTP_USER ?? null,
      passwordLength: password.length,
      results: [],
    };
  }

  const results = [];
  for (const port of [PRIMARY_PORT, FALLBACK_PORT]) {
    try {
      await getTransport(port).verify();
      results.push({ port, ok: true });
    } catch (error) {
      results.push({ port, ok: false, code: error.code ?? null, error: error.message });
    }
  }

  return {
    configured: true,
    host: SMTP_HOST,
    user: SMTP_USER,
    passwordLength: password.length,
    alertTo: alertRecipient(),
    results,
  };
}
