import { flightOps } from "./provider.js";
import { TravelError, TravelErrorCode } from "../errors.js";

/* =========================================================
   FARE REVALIDATION
   Run immediately before payment. If the supplier comes back
   with a different price we surface FARE_CHANGED rather than
   charging the old amount.
========================================================= */

export async function revalidateFlight({ searchId, offerId, fareKey, expectedAmount }) {
  if (!fareKey) {
    throw new TravelError(TravelErrorCode.INVALID_INPUT, "fareKey is required.", { expose: true });
  }

  const result = await flightOps.revalidate({ searchId, offerId, fareKey });

  const amount = Number(result?.price?.amount);
  if (!Number.isFinite(amount)) {
    throw new TravelError(TravelErrorCode.SUPPLIER_UNAVAILABLE, "Adapter returned no price on revalidation.");
  }

  if (result?.available === false) {
    throw new TravelError(TravelErrorCode.AVAILABILITY_CHANGED, "This flight is no longer available.", { expose: true });
  }

  const changed =
    Boolean(result?.priceChanged) ||
    (Number.isFinite(Number(expectedAmount)) && Math.round(Number(expectedAmount)) !== Math.round(amount));

  return {
    fareKey: result?.fareKey ?? fareKey,
    price: result.price,
    priceChanged: changed,
    previousAmount: Number.isFinite(Number(expectedAmount)) ? Number(expectedAmount) : null,
    expiresAt: result?.expiresAt ?? null,
    baggage: result?.baggage ?? null,
    fareRules: result?.fareRules ?? null,
  };
}
