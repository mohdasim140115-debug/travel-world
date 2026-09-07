import { ok, fail, readJson, idempotencyKey } from "@/lib/travel/apiResponse";
import { requireContact, requirePassengers, requireString } from "@/lib/travel/validate";
import { prepareFlightBooking, confirmFlightBooking } from "@/lib/travel/flights/booking";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Two modes, because a booking may only be confirmed after payment:
 *
 *   { stage: "prepare" }  revalidates the fare and writes a DRAFT booking.
 *   { stage: "confirm" }  sends an already-paid booking to the supplier.
 *
 * "confirm" checks the stored payment status itself, so a caller cannot skip
 * payment by posting straight to it.
 */
export async function POST(request) {
  try {
    const body = await readJson(request);
    const stage = body.stage === "confirm" ? "confirm" : "prepare";

    if (stage === "confirm") {
      const bookingRef = requireString(body, "bookingRef", { max: 32 });
      const { booking, alreadyConfirmed, pending } = await confirmFlightBooking({ bookingRef });
      return ok({ booking, alreadyConfirmed, pending: Boolean(pending) });
    }

    const { booking, fare, reused } = await prepareFlightBooking({
      idempotencyKey: idempotencyKey(request, body),
      searchId: body.searchId ?? null,
      offerId: body.offerId ?? null,
      fareKey: requireString(body, "fareKey", { max: 4000 }),
      expectedAmount: body.expectedAmount,
      passengers: requirePassengers(body),
      contact: requireContact(body),
    });

    return ok({ booking, fare, reused });
  } catch (error) {
    return fail(error, "flights/book");
  }
}
