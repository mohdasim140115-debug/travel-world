import { hotelsOps } from "./provider.js";
import { revalidateHotel } from "./revalidate.js";
import { TravelError, TravelErrorCode } from "../errors.js";
import { providerId } from "../provider.js";
import { createBooking, getBookingByRef, upsertUser } from "../../booking/store.js";
import { confirmWithSupplier } from "../../booking/confirm.js";
import { ProductType } from "../../booking/statuses.js";

/* Same two-step shape as flights: revalidate + draft before payment,
   supplier call only after the payment is verified. */

export async function prepareHotelBooking({
  idempotencyKey,
  rateKey,
  hotelId,
  expectedAmount,
  guests,
  contact,
  checkIn,
  checkOut,
  markup = 0,
}) {
  const rate = await revalidateHotel({ rateKey, expectedAmount });

  if (rate.priceChanged) {
    throw new TravelError(TravelErrorCode.FARE_CHANGED, "The room rate changed. Please review the new price.", {
      expose: true,
      details: { amount: rate.price.amount, currency: rate.price.currency, previousAmount: rate.previousAmount },
    });
  }

  await upsertUser({ name: contact.name, email: contact.email, phone: contact.phone });

  const { booking, reused } = await createBooking({
    productType: ProductType.HOTEL,
    idempotencyKey,
    contact,
    passengers: guests,
    offer: {
      hotelId,
      rateKey: rate.rateKey,
      checkIn,
      checkOut,
      cancellationPolicy: rate.cancellationPolicy,
      expiresAt: rate.expiresAt,
    },
    amount: Number(rate.price.amount) + Number(markup || 0),
    currency: rate.price.currency,
    markup,
    metadata: { provider: providerId() },
  });

  return { booking, rate, reused };
}

export async function confirmHotelBooking({ bookingRef }) {
  return confirmWithSupplier({
    bookingRef,
    productType: ProductType.HOTEL,
    bookFn: (request) => hotelsOps.book(request),
    buildRequest: (booking) => ({
      rateKey: booking.offer?.rateKey,
      hotelId: booking.offer?.hotelId,
      checkIn: booking.offer?.checkIn,
      checkOut: booking.offer?.checkOut,
      bookingRef: booking.bookingRef,
      contact: booking.contact,
      guests: booking.passengers,
      paymentReference: booking.bookingRef,
    }),
  });
}

export async function getHotelBooking(bookingRef) {
  return getBookingByRef(bookingRef);
}
