/* =========================================================
   TRAVEL ERRORS
   One error type with a stable code, so API routes can map a
   failure to an HTTP status and the UI can show the right
   message without parsing strings.

   `expose` marks a message safe to show a customer. Anything
   else is logged server-side and replaced with a generic line,
   so supplier internals never reach the browser.
========================================================= */

export const TravelErrorCode = {
  PROVIDER_NOT_CONFIGURED: "PROVIDER_NOT_CONFIGURED",
  NOT_SUPPORTED: "NOT_SUPPORTED",
  INVALID_SEARCH: "INVALID_SEARCH",
  INVALID_INPUT: "INVALID_INPUT",
  NO_RESULTS: "NO_RESULTS",
  TIMEOUT: "TIMEOUT",
  SUPPLIER_UNAVAILABLE: "SUPPLIER_UNAVAILABLE",
  FARE_CHANGED: "FARE_CHANGED",
  AVAILABILITY_CHANGED: "AVAILABILITY_CHANGED",
  SEAT_UNAVAILABLE: "SEAT_UNAVAILABLE",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  PAYMENT_NOT_VERIFIED: "PAYMENT_NOT_VERIFIED",
  BOOKING_FAILED: "BOOKING_FAILED",
  BOOKING_PENDING: "BOOKING_PENDING",
  BOOKING_NOT_FOUND: "BOOKING_NOT_FOUND",
  CANCELLATION_FAILED: "CANCELLATION_FAILED",
  DUPLICATE_REQUEST: "DUPLICATE_REQUEST",
};

const HTTP_STATUS = {
  [TravelErrorCode.PROVIDER_NOT_CONFIGURED]: 503,
  [TravelErrorCode.NOT_SUPPORTED]: 501,
  [TravelErrorCode.INVALID_SEARCH]: 400,
  [TravelErrorCode.INVALID_INPUT]: 400,
  [TravelErrorCode.NO_RESULTS]: 200,
  [TravelErrorCode.TIMEOUT]: 504,
  [TravelErrorCode.SUPPLIER_UNAVAILABLE]: 502,
  [TravelErrorCode.FARE_CHANGED]: 409,
  [TravelErrorCode.AVAILABILITY_CHANGED]: 409,
  [TravelErrorCode.SEAT_UNAVAILABLE]: 409,
  [TravelErrorCode.PAYMENT_FAILED]: 402,
  [TravelErrorCode.PAYMENT_NOT_VERIFIED]: 402,
  [TravelErrorCode.BOOKING_FAILED]: 502,
  [TravelErrorCode.BOOKING_PENDING]: 202,
  [TravelErrorCode.BOOKING_NOT_FOUND]: 404,
  [TravelErrorCode.CANCELLATION_FAILED]: 502,
  [TravelErrorCode.DUPLICATE_REQUEST]: 409,
};

/** Shown to customers when the real message is not safe to expose. */
const SAFE_MESSAGE = {
  [TravelErrorCode.PROVIDER_NOT_CONFIGURED]: "Live booking is not available yet. Please call us to book.",
  [TravelErrorCode.NOT_SUPPORTED]: "This option is not available for the selected supplier.",
  [TravelErrorCode.TIMEOUT]: "The supplier took too long to respond. Please try again.",
  [TravelErrorCode.SUPPLIER_UNAVAILABLE]: "The supplier is temporarily unavailable. Please try again shortly.",
  [TravelErrorCode.FARE_CHANGED]: "The fare changed while you were booking. Please review the new price.",
  [TravelErrorCode.AVAILABILITY_CHANGED]: "This option is no longer available. Please pick another.",
  [TravelErrorCode.SEAT_UNAVAILABLE]: "The selected seats were just taken. Please choose different seats.",
  [TravelErrorCode.PAYMENT_FAILED]: "The payment did not go through. You have not been charged for a booking.",
  [TravelErrorCode.PAYMENT_NOT_VERIFIED]: "We could not verify this payment. Please contact us before retrying.",
  [TravelErrorCode.BOOKING_FAILED]: "The supplier could not confirm this booking. Any payment will be refunded.",
  [TravelErrorCode.BOOKING_PENDING]: "Your booking is being confirmed. We will email you as soon as it is done.",
  [TravelErrorCode.BOOKING_NOT_FOUND]: "We could not find that booking.",
  [TravelErrorCode.CANCELLATION_FAILED]: "We could not cancel this booking automatically. Please contact us.",
  [TravelErrorCode.DUPLICATE_REQUEST]: "This request was already submitted.",
};

export class TravelError extends Error {
  constructor(code, message, { expose = false, details = null, cause = null } = {}) {
    super(message || SAFE_MESSAGE[code] || "Something went wrong.");
    this.name = "TravelError";
    this.code = code in TravelErrorCode ? code : TravelErrorCode.BOOKING_FAILED;
    this.expose = expose;
    this.details = details;
    if (cause) this.cause = cause;
  }

  get status() {
    return HTTP_STATUS[this.code] ?? 500;
  }

  /** Body for an API response — never carries supplier internals. */
  toResponse() {
    return {
      ok: false,
      code: this.code,
      message: this.expose ? this.message : SAFE_MESSAGE[this.code] ?? "Something went wrong.",
      ...(this.details ? { details: this.details } : {}),
    };
  }
}

export const notConfigured = (what) =>
  new TravelError(
    TravelErrorCode.PROVIDER_NOT_CONFIGURED,
    `No travel provider is configured for ${what}.`
  );

export const notSupported = (what) =>
  new TravelError(TravelErrorCode.NOT_SUPPORTED, `The configured provider does not support ${what}.`);
