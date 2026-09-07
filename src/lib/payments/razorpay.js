import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

import { TravelError, TravelErrorCode } from "../travel/errors.js";

/* =========================================================
   RAZORPAY GATEWAY
   Signature verification is implemented in full: it is a
   documented HMAC over "orderId|paymentId" and needs no
   network call, so it is safe to write before we hold live
   keys.

   Order creation is left as a TODO — it needs the real
   credentials and the account's currency/receipt conventions,
   which arrive with the keys.

   RAZORPAY_KEY_SECRET must never be sent to the browser. Only
   RAZORPAY_KEY_ID is public, and it is returned explicitly by
   createOrder so nothing else has to reach for it.
========================================================= */

const credentials = () => ({
  keyId: process.env.RAZORPAY_KEY_ID,
  keySecret: process.env.RAZORPAY_KEY_SECRET,
});

function requireCredentials() {
  const { keyId, keySecret } = credentials();
  if (!keyId || !keySecret) {
    throw new TravelError(
      TravelErrorCode.PROVIDER_NOT_CONFIGURED,
      "RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set."
    );
  }
  return { keyId, keySecret };
}

export const razorpayGateway = {
  id: "razorpay",

  /**
   * TODO (tomorrow, with live keys): call Razorpay Orders API with the
   * `razorpay` SDK or a server-side fetch to create the order, then return its
   * id. Amount goes in the smallest currency unit (paise for INR).
   *
   * Until then this refuses rather than inventing an order id, so no booking
   * can reach a "paid" state without a real gateway order.
   */
  async createOrder({ amount, currency = "INR", bookingRef }) {
    const { keyId } = requireCredentials();

    void amount;
    void currency;
    void bookingRef;

    throw new TravelError(
      TravelErrorCode.PROVIDER_NOT_CONFIGURED,
      "Razorpay order creation is not implemented yet — awaiting live credentials.",
      { details: { keyIdPresent: Boolean(keyId) } }
    );
  },

  /**
   * Verifies the checkout callback. Razorpay signs `${orderId}|${paymentId}`
   * with the key secret; a mismatch means the callback was forged or tampered
   * with and the booking must not proceed.
   */
  async verifyPayment({ orderId, paymentId, signature }) {
    const { keySecret } = requireCredentials();

    if (!orderId || !paymentId || !signature) {
      return { verified: false, reason: "missing orderId, paymentId or signature" };
    }

    const expected = createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");

    const given = Buffer.from(String(signature));
    const mine = Buffer.from(expected);
    if (given.length !== mine.length) return { verified: false, reason: "signature length mismatch" };

    const verified = timingSafeEqual(given, mine);
    return verified ? { verified: true } : { verified: false, reason: "signature mismatch" };
  },
};
