import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { requireString } from "@/lib/travel/validate";
import { requireGateway } from "@/lib/payments/provider";
import { getBookingByRef, recordPaymentOrder } from "@/lib/booking/store";
import { isPayable } from "@/lib/booking/statuses";
import { TravelError, TravelErrorCode } from "@/lib/travel/errors";

/* Server-side only. Gateway secrets never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Creates a gateway order for a booking that is already drafted.
 *
 * The amount comes from the stored booking, never from the request body — a
 * client cannot ask to pay less than the fare that was revalidated.
 */
export async function POST(request) {
  try {
    const body = await readJson(request);
    const bookingRef = requireString(body, "bookingRef", { max: 32 });

    const booking = await getBookingByRef(bookingRef);

    if (!isPayable(booking)) {
      throw new TravelError(
        TravelErrorCode.DUPLICATE_REQUEST,
        "This booking is not awaiting payment.",
        { expose: true, details: { status: booking.status } }
      );
    }

    const gateway = requireGateway();
    const order = await gateway.createOrder({
      amount: booking.amount,
      currency: booking.currency,
      bookingRef: booking.bookingRef,
      notes: { bookingRef: booking.bookingRef, productType: booking.productType },
    });

    await recordPaymentOrder({
      bookingRef: booking.bookingRef,
      provider: gateway.id,
      orderId: order.orderId,
      amount: booking.amount,
      currency: booking.currency,
    });

    // publicKey is the only credential the browser may see.
    return ok({
      order: {
        orderId: order.orderId,
        amount: order.amount ?? booking.amount,
        currency: order.currency ?? booking.currency,
        publicKey: order.publicKey ?? null,
        provider: gateway.id,
      },
      bookingRef: booking.bookingRef,
    });
  } catch (error) {
    return fail(error, "payment/create-order");
  }
}
