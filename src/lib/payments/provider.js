import "server-only";

import { razorpayGateway } from "./razorpay.js";
import { TravelError, TravelErrorCode } from "../travel/errors.js";

/* =========================================================
   PAYMENT GATEWAY REGISTRY
   PAYMENT_PROVIDER selects the gateway. Unset means payments
   are off: create-order answers 503 instead of letting a
   booking through unpaid.

   A gateway must implement:
     createOrder({ amount, currency, bookingRef, notes })
       -> { orderId, amount, currency, publicKey }
     verifyPayment({ orderId, paymentId, signature })
       -> { verified: boolean, reason? }

   `publicKey` is the only value that may reach the browser.
   Secrets never leave this module.
========================================================= */

const GATEWAYS = {
  razorpay: razorpayGateway,
};

export function getGateway() {
  const name = (process.env.PAYMENT_PROVIDER || "").trim().toLowerCase();
  if (!name) return null;

  const gateway = GATEWAYS[name];
  if (!gateway) {
    console.error(`[payment] PAYMENT_PROVIDER="${name}" is not registered. Known: ${Object.keys(GATEWAYS).join(", ")}`);
    return null;
  }
  return gateway;
}

export function requireGateway() {
  const gateway = getGateway();
  if (!gateway) {
    throw new TravelError(
      TravelErrorCode.PROVIDER_NOT_CONFIGURED,
      "Online payment is not enabled yet. Please call us to pay."
    );
  }
  return gateway;
}

export const paymentEnabled = () => Boolean(getGateway());
