import "server-only";
import { randomUUID } from "node:crypto";

import { getCollection } from "../mongodb.js";
import { TravelError, TravelErrorCode } from "../travel/errors.js";
import { BookingStatus, PaymentStatus, SupplierOrderStatus } from "./statuses.js";

/* =========================================================
   BOOKING STORE
   Collections (indexed by scripts/init-travel-collections.mjs):

     travelBooking   one row per customer booking attempt
     passenger       travellers, linked by bookingRef
     payment         gateway orders and their verified result
     supplierOrder   every call we made to the supplier
     user            customers, keyed by email

   Nothing here stores card numbers, CVV or UPI credentials —
   only the gateway's own references.
========================================================= */

export function newBookingRef() {
  const random = randomUUID().replace(/-/g, "").toUpperCase();
  return `HT-${random.slice(0, 8)}`;
}

function normalise(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { id: _id?.toString?.() ?? _id, ...rest };
}

/** Keeps a supplier payload small and free of credentials and document numbers. */
function safeSnapshot(value) {
  const DROP = /(password|secret|token|authorization|apikey|api_key|cvv|cardnumber|card_number|passportnumber)/i;

  const walk = (node, depth = 0) => {
    if (node === null || typeof node !== "object" || depth > 4) return node;
    if (Array.isArray(node)) return node.slice(0, 20).map((item) => walk(item, depth + 1));

    return Object.fromEntries(
      Object.entries(node)
        .slice(0, 40)
        .map(([key, val]) => [key, DROP.test(key) ? "[redacted]" : walk(val, depth + 1)])
    );
  };

  return walk(value);
}

/**
 * Creates the booking row. `idempotencyKey` makes a retried submit return the
 * original booking instead of creating a second one — the unique index does the
 * enforcing, so two parallel requests cannot both win.
 */
export async function createBooking({
  productType,
  idempotencyKey,
  contact,
  passengers = [],
  offer,
  amount,
  currency = "INR",
  markup = 0,
  metadata = {},
}) {
  if (!idempotencyKey) {
    throw new TravelError(TravelErrorCode.INVALID_INPUT, "idempotencyKey is required.");
  }

  const bookings = await getCollection("travelBooking");

  const existing = await bookings.findOne({ idempotencyKey });
  if (existing) return { booking: normalise(existing), reused: true };

  const now = new Date();
  const doc = {
    bookingRef: newBookingRef(),
    idempotencyKey,
    productType,
    status: BookingStatus.DRAFT,
    paymentStatus: PaymentStatus.CREATED,
    supplierStatus: null,

    provider: metadata.provider ?? null,
    supplierBookingId: null,
    pnr: null,
    ticket: null,
    voucher: null,

    contact,
    offer,
    amount: Number(amount) || 0,
    markup: Number(markup) || 0,
    currency,

    cancellation: null,
    metadata,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await bookings.insertOne(doc);
  } catch (error) {
    if (error?.code === 11000) {
      const winner = await bookings.findOne({ idempotencyKey });
      if (winner) return { booking: normalise(winner), reused: true };
    }
    throw error;
  }

  if (passengers.length) {
    const people = await getCollection("passenger");
    await people.insertMany(
      passengers.map((person) => ({ ...person, bookingRef: doc.bookingRef, createdAt: now }))
    );
  }

  return { booking: normalise(doc), reused: false };
}

export async function getBookingByRef(bookingRef) {
  const bookings = await getCollection("travelBooking");
  const doc = await bookings.findOne({ bookingRef });
  if (!doc) throw new TravelError(TravelErrorCode.BOOKING_NOT_FOUND, "Booking not found.");

  const people = await getCollection("passenger");
  const passengers = await people.find({ bookingRef }).toArray();

  return { ...normalise(doc), passengers: passengers.map(normalise) };
}

export async function updateBooking(bookingRef, patch) {
  const bookings = await getCollection("travelBooking");
  const doc = await bookings.findOneAndUpdate(
    { bookingRef },
    { $set: { ...patch, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  if (!doc) throw new TravelError(TravelErrorCode.BOOKING_NOT_FOUND, "Booking not found.");
  return normalise(doc);
}

/* ---------- payments ---------- */

export async function recordPaymentOrder({ bookingRef, provider, orderId, amount, currency }) {
  const payments = await getCollection("payment");
  const now = new Date();

  await payments.insertOne({
    bookingRef,
    provider,
    orderId,
    paymentId: null,
    signatureVerified: false,
    status: PaymentStatus.CREATED,
    amount,
    currency,
    createdAt: now,
    updatedAt: now,
  });

  await updateBooking(bookingRef, {
    paymentStatus: PaymentStatus.CREATED,
    status: BookingStatus.PAYMENT_PENDING,
  });
}

export async function markPaymentPaid({ bookingRef, orderId, paymentId }) {
  const payments = await getCollection("payment");
  await payments.updateOne(
    { bookingRef, orderId },
    { $set: { paymentId, signatureVerified: true, status: PaymentStatus.PAID, updatedAt: new Date() } }
  );
  return updateBooking(bookingRef, { paymentStatus: PaymentStatus.PAID });
}

export async function markPaymentFailed({ bookingRef, orderId, reason }) {
  const payments = await getCollection("payment");
  await payments.updateOne(
    { bookingRef, orderId },
    { $set: { status: PaymentStatus.FAILED, failureReason: reason ?? null, updatedAt: new Date() } }
  );
  return updateBooking(bookingRef, {
    paymentStatus: PaymentStatus.FAILED,
    status: BookingStatus.FAILED,
  });
}

export async function getPayment(bookingRef, orderId) {
  const payments = await getCollection("payment");
  return payments.findOne({ bookingRef, orderId });
}

/* ---------- supplier calls ---------- */

/** Records the attempt before the call so a crash mid-flight still leaves a trail. */
export async function openSupplierOrder({ bookingRef, provider, productType, request }) {
  const orders = await getCollection("supplierOrder");
  const now = new Date();
  const { insertedId } = await orders.insertOne({
    bookingRef,
    provider,
    productType,
    status: SupplierOrderStatus.REQUESTED,
    request: safeSnapshot(request),
    response: null,
    createdAt: now,
    updatedAt: now,
  });
  return insertedId;
}

export async function closeSupplierOrder(orderObjectId, { status, response, error }) {
  const orders = await getCollection("supplierOrder");
  await orders.updateOne(
    { _id: orderObjectId },
    {
      $set: {
        status,
        response: response ? safeSnapshot(response) : null,
        error: error ?? null,
        updatedAt: new Date(),
      },
    }
  );
}

/* ---------- customers ---------- */

export async function upsertUser({ name, email, phone }) {
  if (!email) return null;
  const users = await getCollection("user");
  const now = new Date();

  await users.updateOne(
    { email },
    {
      $set: { name, phone, updatedAt: now },
      $setOnInsert: { email, createdAt: now, role: "customer" },
    },
    { upsert: true }
  );

  return users.findOne({ email });
}
