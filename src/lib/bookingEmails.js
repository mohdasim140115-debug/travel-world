import { alertRecipient, sendMail } from "./mailer.js";
import { underAttack } from "./spamGuard.js";

/* =========================================================
   BOOKING EMAILS
   One alert to the office for every booking, and a short
   confirmation to the guest when they left an email address.

   Every booking type funnels through the same two builders,
   so all four kinds of alert look alike and only the rows in
   the table differ.
========================================================= */

const BRAND = "#0B3B63";
const ACCENT = "#FF7A1A";

const escape = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const money = (amount) =>
  typeof amount === "number" ? `₹${amount.toLocaleString("en-IN")}` : amount;

/** [["Label", "value"], …] -> table rows, skipping empty values */
function rows(pairs) {
  return pairs
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:9px 0;color:#64748B;font-size:13px;width:150px;">${escape(label)}</td>
          <td style="padding:9px 0;color:#0F172A;font-size:14px;font-weight:600;">${escape(value)}</td>
        </tr>`
    )
    .join("");
}

function shell(title, subtitle, body, footer = "") {
  return `
  <div style="margin:0;padding:24px;background:#F1F5F9;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;">
      <div style="background:${BRAND};padding:20px 24px;">
        <p style="margin:0;color:#5EEAD4;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
          Honor Tour &amp; Travels
        </p>
        <h1 style="margin:6px 0 0;color:#fff;font-size:19px;">${escape(title)}</h1>
        ${subtitle ? `<p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">${escape(subtitle)}</p>` : ""}
      </div>
      <div style="padding:22px 24px;">
        <table style="width:100%;border-collapse:collapse;">${body}</table>
        ${footer}
      </div>
    </div>
    <p style="max-width:560px;margin:14px auto 0;color:#94A3B8;font-size:11px;text-align:center;">
      Sent automatically by your website.
    </p>
  </div>`;
}

/** Alert to the office. Replying goes straight to the guest. */
async function alertOffice({ kind, headline, pairs, guestEmail, guestName, guestPhone }) {
  const body = rows([
    ...pairs,
    ["Guest", guestName],
    ["Phone", guestPhone],
    ["Email", guestEmail],
  ]);

  const footer = `
    <div style="margin-top:18px;padding-top:16px;border-top:1px solid #E5E7EB;">
      <a href="tel:${escape(guestPhone)}"
         style="display:inline-block;background:${ACCENT};color:#fff;text-decoration:none;
                padding:11px 20px;border-radius:9px;font-size:14px;font-weight:bold;">
        Call ${escape(guestName)}
      </a>
    </div>`;

  return sendMail({
    to: alertRecipient(),
    replyTo: guestEmail || undefined,
    subject: `New ${kind} booking — ${headline}`,
    html: shell(`New ${kind} booking`, headline, body, footer),
  });
}

/* ---------- guest confirmation ----------
   This is the one message the site sends to an address a
   stranger typed, so it is the one a spammer can abuse to
   make our Gmail mail the world. It is therefore the most
   tightly held thing here:

     • it repeats none of the visitor's own words
     • the name is stripped to plain letters
     • there is an hourly ceiling on how many can go out
     • it stops entirely while the site is being flooded
     • GUEST_CONFIRMATION=off turns it off for good
*/

const GUEST_EMAIL_LIMIT_PER_HOUR = 20;
let guestSends = [];

function guestQuotaLeft() {
  const now = Date.now();
  guestSends = guestSends.filter((t) => now - t < 60 * 60 * 1000);
  return guestSends.length < GUEST_EMAIL_LIMIT_PER_HOUR;
}

/** Letters, spaces and dots only — never the visitor's raw text. */
function safeName(value) {
  const cleaned = String(value ?? "")
    .replace(/[^p{L}s.'-]/gu, "")
    .trim()
    .slice(0, 30);
  return cleaned || "traveller";
}

/** Short confirmation to the guest, only when they gave an email. */
async function confirmGuest({ guestEmail, guestName }) {
  if (!guestEmail) return { sent: false, reason: "guest left no email" };
  if (process.env.GUEST_CONFIRMATION === "off") return { sent: false, reason: "disabled" };
  if (!guestQuotaLeft()) return { sent: false, reason: "hourly guest-mail cap reached" };
  if (await underAttack()) return { sent: false, reason: "traffic surge — guest mail paused" };

  guestSends.push(Date.now());

  const footer = `
    <p style="margin:0;color:#475569;font-size:13px;line-height:1.6;">
      Our team will call you shortly to confirm the details. No payment has been taken yet.
    </p>`;

  // Deliberately no table: nothing the visitor typed is echoed back.
  return sendMail({
    to: guestEmail,
    subject: "We have your request — Honor Tour & Travels",
    html: shell(
      `Thanks, ${safeName(guestName)}!`,
      "We have received your request.",
      "",
      footer
    ),
  });
}

/* ---------- one entry point per booking type ---------- */

export function notifyPackageBooking(b) {
  const pairs = [
    ["Package", b.packageTitle],
    ["Departure city", b.departureCity],
    ["Departure date", b.departureDate],
    ["Guests", b.guests],
    ["Total", money(b.totalPrice)],
  ];
  const shared = { kind: "package", headline: b.packageTitle, pairs };

  return Promise.all([
    alertOffice({ ...shared, guestName: b.customerName, guestPhone: b.customerPhone, guestEmail: b.customerEmail }),
    confirmGuest({ ...shared, guestName: b.customerName, guestEmail: b.customerEmail }),
  ]);
}

export function notifyHotelBooking(b) {
  const pairs = [
    ["Hotel", b.hotelName],
    ["Room", b.roomType],
    ["Check-in", b.checkIn],
    ["Check-out", b.checkOut],
    ["Guests", b.guests],
    ["Per night", money(b.pricePerNight)],
  ];
  const shared = { kind: "hotel", headline: b.hotelName, pairs };

  return Promise.all([
    alertOffice({ ...shared, guestName: b.customerName, guestPhone: b.customerPhone, guestEmail: b.customerEmail }),
    confirmGuest({ ...shared, guestName: b.customerName, guestEmail: b.customerEmail }),
  ]);
}

export function notifyFlightBooking(b) {
  const pairs = [
    ["Airline", b.airline],
    ["Flight", b.flightNumber],
    ["Route", `${b.from} → ${b.to}`],
    ["Departs", b.departureTime],
    ["Arrives", b.arrivalTime],
    ["Fare", money(b.price)],
  ];
  const shared = { kind: "flight", headline: `${b.from} → ${b.to}`, pairs };

  return Promise.all([
    alertOffice({ ...shared, guestName: b.customerName, guestPhone: b.customerPhone, guestEmail: b.customerEmail }),
    confirmGuest({ ...shared, guestName: b.customerName, guestEmail: b.customerEmail }),
  ]);
}

export function notifyTransportBooking(b) {
  const pairs = [
    ["Vehicle", b.vehicleName],
    ["Type", b.vehicleType],
    ["Pickup", b.pickupCity],
    ["Drop", b.dropCity],
    ["Days", b.days],
    ["Total", money(b.totalPrice)],
  ];
  const shared = {
    kind: "transport",
    headline: `${b.pickupCity} → ${b.dropCity}`,
    pairs,
  };

  return Promise.all([
    alertOffice({ ...shared, guestName: b.customerName, guestPhone: b.customerPhone, guestEmail: b.customerEmail }),
    confirmGuest({ ...shared, guestName: b.customerName, guestEmail: b.customerEmail }),
  ]);
}

/* ---------- enquiry form ---------- */

export function notifyEnquiry(enquiry) {
  const pairs = [
    ["About", enquiry.subject],
    ["Message", enquiry.message],
    ["Page", enquiry.source],
  ];

  const shared = { kind: "enquiry", headline: enquiry.subject, pairs };

  return Promise.all([
    alertOffice({
      ...shared,
      guestName: enquiry.name,
      guestPhone: enquiry.phone,
      guestEmail: enquiry.email,
    }),
    confirmGuest({ ...shared, guestName: enquiry.name, guestEmail: enquiry.email }),
  ]);
}
