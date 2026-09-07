import { busesOps } from "./provider.js";
import { TravelError, TravelErrorCode } from "../errors.js";
import { isIsoDate } from "../validate.js";

/* Bus search. Cities are free text because operators name stops
   differently — the adapter maps them to supplier ids. */

export function normaliseBusSearch(input = {}) {
  const from = String(input.from ?? "").trim();
  const to = String(input.to ?? "").trim();

  if (!from || !to) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Pick a pickup and drop city.", { expose: true });
  }
  if (from.toLowerCase() === to.toLowerCase()) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Pickup and drop cannot be the same.", { expose: true });
  }
  if (!isIsoDate(input.date)) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Pick a travel date.", { expose: true });
  }
  if (input.date < new Date().toISOString().slice(0, 10)) {
    throw new TravelError(TravelErrorCode.INVALID_SEARCH, "Travel date cannot be in the past.", { expose: true });
  }

  return {
    from: from.slice(0, 80),
    to: to.slice(0, 80),
    date: input.date,
    currency: (input.currency || "INR").toUpperCase(),
  };
}

function assertBusShape(bus) {
  const missing = ["busId", "operator", "fareKey"].filter((key) => bus?.[key] == null);
  if (missing.length) {
    throw new TravelError(
      TravelErrorCode.SUPPLIER_UNAVAILABLE,
      `Adapter returned a bus missing: ${missing.join(", ")}`
    );
  }
  return { ...bus, isLive: true };
}

export async function searchBuses(input) {
  const params = normaliseBusSearch(input);
  const result = await busesOps.search(params);

  return {
    searchId: result?.searchId ?? null,
    params,
    buses: Array.isArray(result?.buses) ? result.buses.map(assertBusShape) : [],
    searchedAt: new Date().toISOString(),
  };
}
