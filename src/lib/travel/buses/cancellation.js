import { busesOps } from "./provider.js";
import { TravelError, TravelErrorCode } from "../errors.js";
import { getBookingByRef, updateBooking } from "../../booking/store.js";
import { BookingStatus } from "../../booking/statuses.js";

/* Cancellation is recorded only once the supplier accepts it. */

export async function cancelBusBooking({ bookingRef, reason }) {
  const booking = await getBookingByRef(bookingRef);

  if (booking.status === BookingStatus.CANCELLED) return { booking, alreadyCancelled: true };
  if (booking.status !== BookingStatus.CONFIRMED) {
    throw new TravelError(TravelErrorCode.CANCELLATION_FAILED, "Only a confirmed booking can be cancelled.", {
      expose: true,
    });
  }
  if (!booking.supplierBookingId) {
    throw new TravelError(TravelErrorCode.CANCELLATION_FAILED, "This booking has no supplier reference.");
  }

  let result;
  try {
    result = await busesOps.cancel({
      supplierBookingId: booking.supplierBookingId,
      seatIds: booking.offer?.seatIds ?? null,
      reason: reason ?? null,
    });
  } catch (error) {
    if (error instanceof TravelError) throw error;
    throw new TravelError(TravelErrorCode.CANCELLATION_FAILED, "The supplier could not cancel this booking.", {
      cause: error,
    });
  }

  const updated = await updateBooking(bookingRef, {
    status: BookingStatus.CANCELLED,
    cancellation: {
      cancelledAt: new Date(),
      reason: reason ?? null,
      refundAmount: result?.refundAmount ?? null,
      penalty: result?.penalty ?? null,
      supplierStatus: result?.status ?? null,
    },
  });

  return { booking: updated, alreadyCancelled: false };
}
