import { ok, fail, readJson, idempotencyKey } from "@/lib/travel/apiResponse";
import { requireContact, requireDate, requirePassengers, requireString } from "@/lib/travel/validate";
import { prepareHotelBooking, confirmHotelBooking } from "@/lib/travel/hotels/booking";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * stage="prepare" revalidates the rate and writes a DRAFT booking.
 * stage="confirm" sends an already-paid booking to the supplier; it checks the
 * stored payment status itself, so payment cannot be skipped by posting here.
 */
export async function POST(request) {
  try {
    const body = await readJson(request);
    const stage = body.stage === "confirm" ? "confirm" : "prepare";

    if (stage === "confirm") {
      const bookingRef = requireString(body, "bookingRef", { max: 32 });
      const { booking, alreadyConfirmed, pending } = await confirmHotelBooking({ bookingRef });
      return ok({ booking, alreadyConfirmed, pending: Boolean(pending) });
    }

    const { booking, rate, reused } = await prepareHotelBooking({
      idempotencyKey: idempotencyKey(request, body),
      rateKey: requireString(body, "rateKey", { max: 4000 }),
      hotelId: requireString(body, "hotelId", { max: 200 }),
      checkIn: requireDate(body, "checkIn"),
      checkOut: requireDate(body, "checkOut"),
      expectedAmount: body.expectedAmount,
      guests: requirePassengers(body, { max: 12 }),
      contact: requireContact(body),
    });

    return ok({ booking, rate, reused });
  } catch (error) {
    return fail(error, "hotels/book");
  }
}
