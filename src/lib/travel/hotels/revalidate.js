import { hotelsOps } from "./provider.js";
import { TravelError, TravelErrorCode } from "../errors.js";

/* =========================================================
   RATE REVALIDATION
   Hotel rates move and rooms sell out between search and
   payment, so the rate is re-checked immediately before the
   customer is charged.
========================================================= */

export async function revalidateHotel({ rateKey, expectedAmount }) {
  if (!rateKey) {
    throw new TravelError(TravelErrorCode.INVALID_INPUT, "rateKey is required.", { expose: true });
  }

  const result = await hotelsOps.revalidate({ rateKey });

  if (result?.available === false) {
    throw new TravelError(TravelErrorCode.AVAILABILITY_CHANGED, "That room has just been taken.", { expose: true });
  }

  const amount = Number(result?.price?.amount);
  if (!Number.isFinite(amount)) {
    throw new TravelError(TravelErrorCode.SUPPLIER_UNAVAILABLE, "Adapter returned no price on revalidation.");
  }

  const changed =
    Boolean(result?.priceChanged) ||
    (Number.isFinite(Number(expectedAmount)) && Math.round(Number(expectedAmount)) !== Math.round(amount));

  return {
    rateKey: result?.rateKey ?? rateKey,
    price: result.price,
    priceChanged: changed,
    previousAmount: Number.isFinite(Number(expectedAmount)) ? Number(expectedAmount) : null,
    cancellationPolicy: result?.cancellationPolicy ?? null,
    expiresAt: result?.expiresAt ?? null,
  };
}
