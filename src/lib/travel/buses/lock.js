import { busesOps } from "./provider.js";
import { busesSupport } from "./provider.js";
import { TravelError, TravelErrorCode } from "../errors.js";

/* =========================================================
   SEAT LOCK  —  OPTIONAL SUPPLIER FEATURE
   Some bus suppliers hold seats for a few minutes before
   payment; others do not. `isSeatLockSupported()` lets the
   caller skip the step instead of guessing, and the route
   answers 501 rather than pretending a hold exists.
========================================================= */

export const isSeatLockSupported = () => busesSupport("lock");

export async function lockBusSeats({ busId, fareKey, seatIds, passengers, boardingPointId, droppingPointId }) {
  if (!isSeatLockSupported()) {
    throw new TravelError(
      TravelErrorCode.NOT_SUPPORTED,
      "This supplier does not hold seats before payment.",
      { expose: true }
    );
  }
  if (!Array.isArray(seatIds) || seatIds.length === 0) {
    throw new TravelError(TravelErrorCode.INVALID_INPUT, "Select at least one seat.", { expose: true });
  }

  const result = await busesOps.lock({
    busId,
    fareKey,
    seatIds,
    passengers,
    boardingPointId,
    droppingPointId,
  });

  if (!result?.lockId) {
    throw new TravelError(TravelErrorCode.SEAT_UNAVAILABLE, "Those seats could not be held.", { expose: true });
  }

  return { lockId: result.lockId, expiresAt: result.expiresAt ?? null, seatIds };
}
