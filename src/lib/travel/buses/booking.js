import { busesOps } from "./provider.js";
import { isSeatLockSupported, lockBusSeats } from "./lock.js";
import { TravelError, TravelErrorCode } from "../errors.js";
import { providerId } from "../provider.js";
import { createBooking, getBookingByRef, upsertUser } from "../../booking/store.js";
import { confirmWithSupplier } from "../../booking/confirm.js";
import { ProductType } from "../../booking/statuses.js";

/* =========================================================
   BUS BOOKING
   Buses have no separate fare-revalidate call in most supplier
   APIs; the seat lock plays that role where it exists. Where it
   does not, we go straight to the draft and rely on the book
   call to reject a seat that has since gone.
========================================================= */

export async function prepareBusBooking({
  idempotencyKey,
  busId,
  fareKey,
  seatIds,
  amount,
  passengers,
  contact,
  boardingPointId,
  droppingPointId,
  markup = 0,
}) {
  if (!Array.isArray(seatIds) || seatIds.length === 0) {
    throw new TravelError(TravelErrorCode.INVALID_INPUT, "Select at least one seat.", { expose: true });
  }
  if (passengers.length !== seatIds.length) {
    throw new TravelError(TravelErrorCode.INVALID_INPUT, "One passenger is required per seat.", { expose: true });
  }

  let lock = null;
  if (isSeatLockSupported()) {
    lock = await lockBusSeats({ busId, fareKey, seatIds, passengers, boardingPointId, droppingPointId });
  }

  await upsertUser({ name: contact.name, email: contact.email, phone: contact.phone });

  const { booking, reused } = await createBooking({
    productType: ProductType.BUS,
    idempotencyKey,
    contact,
    passengers,
    offer: {
      busId,
      fareKey,
      seatIds,
      boardingPointId: boardingPointId ?? null,
      droppingPointId: droppingPointId ?? null,
      lockId: lock?.lockId ?? null,
      expiresAt: lock?.expiresAt ?? null,
    },
    amount: Number(amount) + Number(markup || 0),
    currency: "INR",
    markup,
    metadata: { provider: providerId(), seatLockSupported: isSeatLockSupported() },
  });

  return { booking, lock, reused };
}

export async function confirmBusBooking({ bookingRef }) {
  return confirmWithSupplier({
    bookingRef,
    productType: ProductType.BUS,
    bookFn: (request) => busesOps.book(request),
    buildRequest: (booking) => ({
      busId: booking.offer?.busId,
      fareKey: booking.offer?.fareKey,
      lockId: booking.offer?.lockId,
      seatIds: booking.offer?.seatIds,
      boardingPointId: booking.offer?.boardingPointId,
      droppingPointId: booking.offer?.droppingPointId,
      bookingRef: booking.bookingRef,
      contact: booking.contact,
      passengers: booking.passengers,
      paymentReference: booking.bookingRef,
    }),
  });
}

export async function getBusBooking(bookingRef) {
  return getBookingByRef(bookingRef);
}
