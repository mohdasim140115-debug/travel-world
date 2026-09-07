import "server-only";

import { providerId } from "../travel/provider.js";
import { TravelError, TravelErrorCode } from "../travel/errors.js";
import {
  closeSupplierOrder,
  getBookingByRef,
  openSupplierOrder,
  updateBooking,
} from "./store.js";
import { BookingStatus, PaymentStatus, SupplierOrderStatus } from "./statuses.js";

/* =========================================================
   SUPPLIER CONFIRMATION
   The one place a booking may become CONFIRMED, and it only
   does so when the supplier says so.

   Order of operations, deliberately:
     1. refuse unless the payment was verified server-side
     2. refuse a second attempt on an already-confirmed row
     3. record the attempt, then call the supplier
     4. write back exactly what came back — confirmed, pending
        or failed. A failure leaves the row FAILED with the
        payment still marked paid, which is what the refund
        process needs to see.
========================================================= */

export async function confirmWithSupplier({ bookingRef, productType, bookFn, buildRequest }) {
  const booking = await getBookingByRef(bookingRef);

  if (booking.paymentStatus !== PaymentStatus.PAID) {
    throw new TravelError(
      TravelErrorCode.PAYMENT_NOT_VERIFIED,
      "This booking has no verified payment, so it cannot be sent to the supplier."
    );
  }

  // Retried submit (double click, network retry) — hand back what we already have.
  if (booking.status === BookingStatus.CONFIRMED) {
    return { booking, alreadyConfirmed: true };
  }

  const request = buildRequest(booking);
  const orderId = await openSupplierOrder({
    bookingRef,
    provider: providerId(),
    productType,
    request,
  });

  await updateBooking(bookingRef, { status: BookingStatus.SUPPLIER_PENDING });

  let result;
  try {
    result = await bookFn(request);
  } catch (error) {
    await closeSupplierOrder(orderId, {
      status: SupplierOrderStatus.FAILED,
      error: error?.message ?? "supplier call failed",
    });

    await updateBooking(bookingRef, {
      status: BookingStatus.FAILED,
      supplierStatus: SupplierOrderStatus.FAILED,
      failureReason: error?.code ?? "SUPPLIER_ERROR",
    });

    if (error instanceof TravelError) throw error;
    throw new TravelError(TravelErrorCode.BOOKING_FAILED, "The supplier could not confirm this booking.", {
      cause: error,
    });
  }

  const supplierStatus = result?.status ?? SupplierOrderStatus.FAILED;
  const confirmed = supplierStatus === "confirmed";
  const pending = supplierStatus === "pending";

  await closeSupplierOrder(orderId, {
    status: confirmed
      ? SupplierOrderStatus.CONFIRMED
      : pending
      ? SupplierOrderStatus.PENDING
      : SupplierOrderStatus.FAILED,
    response: result?.raw ?? result,
  });

  const updated = await updateBooking(bookingRef, {
    status: confirmed
      ? BookingStatus.CONFIRMED
      : pending
      ? BookingStatus.SUPPLIER_PENDING
      : BookingStatus.FAILED,
    supplierStatus,
    supplierBookingId: result?.supplierBookingId ?? null,
    pnr: result?.pnr ?? null,
    ticket: result?.tickets ?? result?.ticketUrl ?? null,
    voucher: result?.voucherUrl ?? result?.confirmationNumber ?? null,
    confirmedAt: confirmed ? new Date() : null,
  });

  if (!confirmed && !pending) {
    throw new TravelError(TravelErrorCode.BOOKING_FAILED, "The supplier declined this booking.");
  }

  return { booking: { ...updated, passengers: booking.passengers }, alreadyConfirmed: false, pending };
}
