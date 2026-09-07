import { capabilities, operation, supports } from "../provider.js";

/* Hotels slice of the active adapter. Everything in this folder
   goes through here, so swapping suppliers touches no domain code. */

export const hotelsOps = {
  search: (params) => operation("hotels", "search")(params),
  details: (params) => operation("hotels", "details")(params),
  revalidate: (params) => operation("hotels", "revalidate")(params),
  book: (params) => operation("hotels", "book")(params),
  cancel: (params) => operation("hotels", "cancel")(params),
  getBooking: (params) => operation("hotels", "getBooking")(params),
};

export const hotelsCapabilities = () => capabilities().hotels;
export const hotelsSupport = (op) => supports("hotels", op);
