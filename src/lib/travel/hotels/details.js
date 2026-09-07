import { hotelsOps } from "./provider.js";
import { TravelError, TravelErrorCode } from "../errors.js";

/* Live rooms and rates for one hotel, keyed by the searchId that produced it. */

export async function getHotelDetails({ hotelId, searchId }) {
  if (!hotelId) {
    throw new TravelError(TravelErrorCode.INVALID_INPUT, "hotelId is required.", { expose: true });
  }

  const result = await hotelsOps.details({ hotelId, searchId });

  if (!result || !result.hotelId) {
    throw new TravelError(TravelErrorCode.AVAILABILITY_CHANGED, "This hotel is no longer available.", {
      expose: true,
    });
  }

  return {
    ...result,
    rooms: Array.isArray(result.rooms) ? result.rooms : [],
    isLive: true,
  };
}
