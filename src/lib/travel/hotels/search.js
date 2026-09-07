import { hotelsOps } from "./provider.js";
import { TravelError, TravelErrorCode } from "../errors.js";
import { isIsoDate } from "../validate.js";

/* =========================================================
   HOTEL SEARCH + DETAILS
   Validates the stay, then returns the shape the existing
   hotel listing and detail pages already render.
========================================================= */

export function normaliseStay(input = {}) {
  const city = String(input.city ?? "").trim();
  const hasCoords = Number.isFinite(Number(input.latitude)) && Number.isFinite(Number(input.longitude));

  if (!city && !hasCoords) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Pick a city to search hotels in.", { expose: true });
  }
  if (!isIsoDate(input.checkIn) || !isIsoDate(input.checkOut)) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Pick check-in and check-out dates.", { expose: true });
  }
  if (input.checkOut <= input.checkIn) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Check-out must be after check-in.", { expose: true });
  }
  if (input.checkIn < new Date().toISOString().slice(0, 10)) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Check-in date cannot be in the past.", { expose: true });
  }

  const rooms = Array.isArray(input.rooms) && input.rooms.length ? input.rooms : [{ adults: 2, children: 0 }];
  if (rooms.length > 6) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Up to 6 rooms per search.", { expose: true });
  }

  return {
    city: city || null,
    latitude: hasCoords ? Number(input.latitude) : null,
    longitude: hasCoords ? Number(input.longitude) : null,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    rooms: rooms.map((room) => ({
      adults: Math.min(Math.max(Number(room.adults) || 1, 1), 6),
      children: Math.min(Math.max(Number(room.children) || 0, 0), 4),
      childAges: Array.isArray(room.childAges) ? room.childAges.map(Number).filter(Number.isFinite) : [],
    })),
    nationality: (input.nationality || "IN").toUpperCase(),
    currency: (input.currency || "INR").toUpperCase(),
  };
}

function assertHotelShape(hotel) {
  const missing = ["hotelId", "name", "rateKey"].filter((key) => hotel?.[key] == null);
  if (missing.length) {
    throw new TravelError(
      TravelErrorCode.SUPPLIER_UNAVAILABLE,
      `Adapter returned a hotel missing: ${missing.join(", ")}`
    );
  }
  return { ...hotel, isLive: true };
}

export async function searchHotels(input) {
  const params = normaliseStay(input);
  const result = await hotelsOps.search(params);

  return {
    searchId: result?.searchId ?? null,
    params,
    hotels: Array.isArray(result?.hotels) ? result.hotels.map(assertHotelShape) : [],
    searchedAt: new Date().toISOString(),
  };
}
