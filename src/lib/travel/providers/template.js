import { supplierFetch } from "../http.js";
import { notSupported, TravelError, TravelErrorCode } from "../errors.js";

/* =========================================================
   PROVIDER ADAPTER TEMPLATE  —  FILL IN TOMORROW
   ---------------------------------------------------------
   Copy this file to providers/<supplier>.js, register it in
   ../provider.js, and implement the TODOs against the
   supplier's official documentation.

   RULES
   1. Nothing here may run in the browser. Secrets stay in
      process.env and never reach a client component.
   2. Every function returns the NORMALISED shape documented
      beside it — the UI already speaks that shape, so the
      mapping happens here and nowhere else.
   3. Throw TravelError with the right code. Do not return
      empty results to paper over a supplier failure.
   4. Declare capabilities honestly: anything false makes the
      matching API route answer 501 instead of pretending.
   5. Do not log request/response bodies that contain
      credentials or full card/passport data.
========================================================= */

const config = () => ({
  baseUrl: process.env.TRAVEL_API_BASE_URL,
  apiKey: process.env.TRAVEL_API_KEY,
  apiSecret: process.env.TRAVEL_API_SECRET,
});

/** TODO: replace with the supplier's real auth (header, OAuth token, signed hash…). */
async function authHeaders() {
  const { apiKey } = config();
  if (!apiKey) {
    throw new TravelError(TravelErrorCode.PROVIDER_NOT_CONFIGURED, "TRAVEL_API_KEY is not set");
  }
  // TODO: supplier-specific. Many need a token call first — cache it here.
  return { authorization: `Bearer ${apiKey}` };
}

/** TODO: point at the supplier's documented paths. */
async function call(path, body, label) {
  const { baseUrl } = config();
  if (!baseUrl) {
    throw new TravelError(TravelErrorCode.PROVIDER_NOT_CONFIGURED, "TRAVEL_API_BASE_URL is not set");
  }
  return supplierFetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: await authHeaders(),
    body,
    label,
  });
}

export const templateProvider = {
  id: "template",
  label: "Template (not wired)",

  // TODO: set each flag once the matching function is implemented and tested.
  capabilities: {
    flights: { search: false, revalidate: false, book: false, cancel: false },
    hotels: { search: false, details: false, revalidate: false, book: false, cancel: false },
    buses: { search: false, seats: false, lock: false, book: false, cancel: false },
  },

  flights: {
    /* params : { from, to, departDate, returnDate, adults, children, infants, cabin, currency }
       returns: { searchId, offers: [{
                    offerId, airline, airlineCode, flightNumber, fromCode, toCode,
                    departureTime, arrivalTime, durationMinutes, stops, stopsLabel,
                    price: { amount, currency, base, taxes }, refundable, baggage,
                    fareKey  // opaque supplier token, required by revalidate/book
                  }] } */
    async search(params) {
      // TODO: map params -> supplier request, response -> the shape above.
      throw notSupported("flight search");
      // return normaliseFlightSearch(await call("/TODO/flight/search", params, "flight search"));
    },

    /* params : { searchId, offerId, fareKey }
       returns: { fareKey, price: { amount, currency }, priceChanged: bool,
                  previousPrice, expiresAt, baggage, fareRules } */
    async revalidate(params) {
      // TODO: the supplier's price/availability check right before payment.
      throw notSupported("flight revalidation");
    },

    /* params : { fareKey, passengers, contact, bookingRef, paymentReference }
       returns: { status: "confirmed"|"pending"|"failed", supplierBookingId,
                  pnr, tickets: [], raw } */
    async book(params) {
      // TODO: must be idempotent on params.bookingRef if the supplier allows it.
      throw notSupported("flight booking");
    },

    /* params : { supplierBookingId, reason } -> { status, refundAmount, penalty, raw } */
    async cancel(params) {
      throw notSupported("flight cancellation");
    },

    async getBooking({ supplierBookingId }) {
      throw notSupported("flight booking lookup");
    },
  },

  hotels: {
    /* params : { city|latitude/longitude, checkIn, checkOut, rooms:[{adults,children}], currency }
       returns: { searchId, hotels: [{ hotelId, name, starRating, address, image,
                  price:{amount,currency}, refundable, rateKey }] } */
    async search(params) {
      throw notSupported("hotel search");
    },

    /* params : { hotelId, searchId } -> { hotelId, name, description, images,
                  amenities, address, rooms: [{ roomId, type, board, price, rateKey }] } */
    async details(params) {
      throw notSupported("hotel details");
    },

    /* params : { rateKey } -> { rateKey, price, priceChanged, cancellationPolicy, expiresAt } */
    async revalidate(params) {
      throw notSupported("hotel revalidation");
    },

    /* params : { rateKey, guests, contact, bookingRef, paymentReference }
       returns: { status, supplierBookingId, confirmationNumber, voucherUrl, raw } */
    async book(params) {
      throw notSupported("hotel booking");
    },

    async cancel(params) {
      throw notSupported("hotel cancellation");
    },

    async getBooking({ supplierBookingId }) {
      throw notSupported("hotel booking lookup");
    },
  },

  buses: {
    /* params : { from, to, date } -> { searchId, buses: [{ busId, operator, busType,
                  departureTime, arrivalTime, durationMinutes, price, seatsAvailable,
                  boardingPoints, droppingPoints, fareKey }] } */
    async search(params) {
      throw notSupported("bus search");
    },

    /* params : { busId, fareKey } -> { layout: { rows, columns, decks },
                  seats: [{ seatId, label, deck, row, column, type, price, available, ladiesOnly }] } */
    async seats(params) {
      throw notSupported("bus seat maps");
    },

    /* Optional supplier feature — leave capabilities.buses.lock = false if unsupported.
       params : { busId, seatIds, passengers } -> { lockId, expiresAt } */
    async lock(params) {
      throw notSupported("bus seat locking");
    },

    /* params : { fareKey, lockId, seatIds, passengers, contact, boardingPointId,
                  droppingPointId, bookingRef, paymentReference }
       returns: { status, supplierBookingId, pnr, ticketUrl, raw } */
    async book(params) {
      throw notSupported("bus booking");
    },

    async cancel(params) {
      throw notSupported("bus cancellation");
    },

    async getBooking({ supplierBookingId }) {
      throw notSupported("bus booking lookup");
    },
  },
};
