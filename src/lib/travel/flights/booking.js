import { flightOps } from "./provider.js";
import { revalidateFlight } from "./revalidate.js";
import { TravelError, TravelErrorCode } from "../errors.js";
import { providerId } from "../provider.js";
import { createBooking, getBookingByRef, upsertUser } from "../../booking/store.js";
import { confirmWithSupplier } from "../../booking/confirm.js";
import { ProductType } from "../../booking/statuses.js";

/* =========================================================
   FLIGHT BOOKING
   Two steps, on purpose:

     prepareFlightBooking()  before payment — revalidates the
       fare, then writes a DRAFT booking holding the price the
       customer is about to be charged.

     confirmFlightBooking()  after the payment is verified —
       sends it to the supplier and records the PNR.

   Nothing between them can mark a booking confirmed.
========================================================= */

export async function prepareFlightBooking({
  idempotencyKey,
  searchId,
  offerId,
  fareKey,
  expectedAmount,
  passengers,
  contact,
  markup = 0,
}) {
  const fare = await revalidateFlight({ searchId, offerId, fareKey, expectedAmount });

  if (fare.priceChanged) {
    throw new TravelError(TravelErrorCode.FARE_CHANGED, "The fare changed. Please review the new price.", {
      expose: true,
      details: { amount: fare.price.amount, currency: fare.price.currency, previousAmount: fare.previousAmount },
    });
  }

  await upsertUser({ name: contact.name, email: contact.email, phone: contact.phone });

  const { booking, reused } = await createBooking({
    productType: ProductType.FLIGHT,
    idempotencyKey,
    contact,
    passengers,
    offer: { searchId, offerId, fareKey: fare.fareKey, expiresAt: fare.expiresAt, baggage: fare.baggage },
    amount: Number(fare.price.amount) + Number(markup || 0),
    currency: fare.price.currency,
    markup,
    metadata: { provider: providerId() },
  });

  return { booking, fare, reused };
}

export async function confirmFlightBooking({ bookingRef }) {
  return confirmWithSupplier({
    bookingRef,
    productType: ProductType.FLIGHT,
    bookFn: (request) => flightOps.book(request),
    buildRequest: (booking) => ({
      fareKey: booking.offer?.fareKey,
      bookingRef: booking.bookingRef,
      contact: booking.contact,
      passengers: booking.passengers,
      paymentReference: booking.bookingRef,
    }),
  });
}

export async function getFlightBooking(bookingRef) {
  return getBookingByRef(bookingRef);
}
