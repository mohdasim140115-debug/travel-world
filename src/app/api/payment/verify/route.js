import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { requireString } from "@/lib/travel/validate";
import { requireGateway } from "@/lib/payments/provider";
import { getBookingByRef, getPayment, markPaymentFailed, markPaymentPaid } from "@/lib/booking/store";
import { PaymentStatus } from "@/lib/booking/statuses";
import { TravelError, TravelErrorCode } from "@/lib/travel/errors";

/* Server-side only. Gateway secrets never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Verifies a gateway callback, server-side, before anything is booked.
 *
 * A frontend "payment successful" flag is never trusted: the signature is
 * recomputed here from the key secret, and only a match marks the payment paid.
 * The supplier booking is a separate, explicit call afterwards, so a verified
 * payment never silently becomes a confirmed booking.
 */
export async function POST(request) {
  let bookingRef = null;
  let orderId = null;

  try {
    const body = await readJson(request);

    bookingRef = requireString(body, "bookingRef", { max: 32 });
    orderId = requireString(body, "orderId", { max: 120 });
    const paymentId = requireString(body, "paymentId", { max: 120 });
    const signature = requireString(body, "signature", { max: 512 });

    const booking = await getBookingByRef(bookingRef);
    const payment = await getPayment(bookingRef, orderId);

    if (!payment) {
      throw new TravelError(TravelErrorCode.PAYMENT_NOT_VERIFIED, "No such payment order for this booking.");
    }

    // Replay of an already-verified callback: report the existing state.
    if (payment.status === PaymentStatus.PAID) {
      return ok({ verified: true, alreadyVerified: true, bookingRef, status: booking.status });
    }

    const gateway = requireGateway();
    const { verified, reason } = await gateway.verifyPayment({ orderId, paymentId, signature });

    if (!verified) {
      await markPaymentFailed({ bookingRef, orderId, reason });
      console.error(`[payment/verify] rejected for ${bookingRef}: ${reason}`);
      throw new TravelError(
        TravelErrorCode.PAYMENT_NOT_VERIFIED,
        "We could not verify this payment. No booking has been made."
      );
    }

    const updated = await markPaymentPaid({ bookingRef, orderId, paymentId });

    // Deliberately does NOT book: the caller now posts stage="confirm" to the
    // product's book route, which is the only place a PNR/voucher is written.
    return ok({
      verified: true,
      bookingRef,
      status: updated.status,
      nextStep: { action: "confirm", endpoint: `/api/${updated.productType}s/book`, body: { stage: "confirm", bookingRef } },
    });
  } catch (error) {
    return fail(error, "payment/verify");
  }
}
