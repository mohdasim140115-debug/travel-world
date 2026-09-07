import { capabilities, operation, supports } from "../provider.js";

/* Flight slice of the active adapter. Everything in this folder goes
   through here, so swapping suppliers touches no domain code. */

export const flightOps = {
  search: (params) => operation("flights", "search")(params),
  revalidate: (params) => operation("flights", "revalidate")(params),
  book: (params) => operation("flights", "book")(params),
  cancel: (params) => operation("flights", "cancel")(params),
  getBooking: (params) => operation("flights", "getBooking")(params),
};

export const flightCapabilities = () => capabilities().flights;
export const flightsSupport = (op) => supports("flights", op);
