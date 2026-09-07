import { notConfigured } from "../errors.js";

/* =========================================================
   FALLBACK ADAPTER
   Used until TRAVEL_PROVIDER names a real one. Every call
   fails with PROVIDER_NOT_CONFIGURED, which the API routes
   turn into 503 and the UI shows as "call us to book".

   This is deliberate: with no provider, the site must say so
   rather than quietly fall back to sample data.
========================================================= */

const fail = (what) => () => {
  throw notConfigured(what);
};

export const unconfiguredProvider = {
  id: "unconfigured",
  label: "No provider configured",

  capabilities: {
    flights: { search: false, revalidate: false, book: false, cancel: false },
    hotels: { search: false, details: false, revalidate: false, book: false, cancel: false },
    buses: { search: false, seats: false, lock: false, book: false, cancel: false },
  },

  flights: {
    search: fail("flight search"),
    revalidate: fail("flight revalidation"),
    book: fail("flight booking"),
    cancel: fail("flight cancellation"),
    getBooking: fail("flight booking lookup"),
  },

  hotels: {
    search: fail("hotel search"),
    details: fail("hotel details"),
    revalidate: fail("hotel revalidation"),
    book: fail("hotel booking"),
    cancel: fail("hotel cancellation"),
    getBooking: fail("hotel booking lookup"),
  },

  buses: {
    search: fail("bus search"),
    seats: fail("bus seat maps"),
    lock: fail("bus seat locking"),
    book: fail("bus booking"),
    cancel: fail("bus cancellation"),
    getBooking: fail("bus booking lookup"),
  },
};
