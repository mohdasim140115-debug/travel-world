import nodemailer from "nodemailer";

/* =========================================================
   EMAIL
   Plain SMTP (Gmail works with an app password), so there is
   no paid service and no domain to verify.

   Nothing here ever throws. A booking that reached the
   database must not fail because the mail server was slow or
   the password was wrong — the row is what matters, the email
   is a convenience. Failures are logged instead.
========================================================= */

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, BOOKING_ALERT_TO } = process.env;

export const mailConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

let transporter = null;

function getTransporter() {
  if (!mailConfigured) return null;

  transporter ??= nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: Number(SMTP_PORT) !== 587, // 465 = implicit TLS, 587 = STARTTLS
    // Google shows app passwords as "abcd efgh ijkl mnop"; the spaces are display only.
    auth: { user: SMTP_USER, pass: SMTP_PASS.replace(/\s/g, "") },
  });

  return transporter;
}

/** Where new-booking alerts go — falls back to the sending account. */
export function alertRecipient() {
  return BOOKING_ALERT_TO || SMTP_USER || null;
}

export async function sendMail({ to, subject, html, replyTo }) {
  if (!to) return { sent: false, reason: "no recipient" };

  const mail = getTransporter();
  if (!mail) {
    console.warn(`[mail] SMTP not configured — skipped "${subject}"`);
    return { sent: false, reason: "not configured" };
  }

  try {
    await mail.sendMail({
      from: `"Honor Tour & Travels" <${SMTP_USER}>`,
      to,
      subject,
      html,
      replyTo,
    });
    return { sent: true };
  } catch (error) {
    console.error(`[mail] failed to send "${subject}":`, error.message);
    return { sent: false, reason: error.message };
  }
}
