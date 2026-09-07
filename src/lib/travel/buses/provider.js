import { capabilities, operation, supports } from "../provider.js";

/* Buses slice of the active adapter. Everything in this folder
   goes through here, so swapping suppliers touches no domain code. */

export const busesOps = {
  search: (params) => operation("buses", "search")(params),
  seats: (params) => operation("buses", "seats")(params),
  lock: (params) => operation("buses", "lock")(params),
  book: (params) => operation("buses", "book")(params),
  cancel: (params) => operation("buses", "cancel")(params),
  getBooking: (params) => operation("buses", "getBooking")(params),
};

export const busesCapabilities = () => capabilities().buses;
export const busesSupport = (op) => supports("buses", op);
