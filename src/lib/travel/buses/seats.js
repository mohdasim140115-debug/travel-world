import { busesOps } from "./provider.js";
import { TravelError, TravelErrorCode } from "../errors.js";

/* Seat map for one bus. Returned as a flat seat list plus layout hints so the
   UI can draw any deck arrangement without knowing the supplier. */

export async function getBusSeats({ busId, fareKey, searchId }) {
  if (!busId) {
    throw new TravelError(TravelErrorCode.INVALID_INPUT, "busId is required.", { expose: true });
  }

  const result = await busesOps.seats({ busId, fareKey, searchId });
  const seats = Array.isArray(result?.seats) ? result.seats : [];

  if (!seats.length) {
    throw new TravelError(TravelErrorCode.AVAILABILITY_CHANGED, "No seats are available on this bus.", {
      expose: true,
    });
  }

  return {
    busId,
    layout: result?.layout ?? { decks: 1 },
    seats,
    boardingPoints: result?.boardingPoints ?? [],
    droppingPoints: result?.droppingPoints ?? [],
  };
}
