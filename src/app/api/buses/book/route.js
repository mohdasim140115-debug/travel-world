import { ok, fail, readJson, idempotencyKey } from "@/lib/travel/apiResponse";
import { requireContact, requirePassengers, requireString } from "@/lib/travel/validate";
import { prepareBusBooking, confirmBusBooking } from "@/lib/travel/buses/booking";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** stage="prepare" holds seats where supported and drafts the booking;
    stage="confirm" sends an already-paid booking to the supplier. */
export async function POST(request) {
  try {
    const body = await readJson(request);
    const stage = body.stage === "confirm" ? "confirm" : "prepare";

    if (stage === "confirm") {
      const bookingRef = requireString(body, "bookingRef", { max: 32 });
      const { booking, alreadyConfirmed, pending } = await confirmBusBooking({ bookingRef });
      return ok({ booking, alreadyConfirmed, pending: Boolean(pending) });
    }

    const { booking, lock, reused } = await prepareBusBooking({
      idempotencyKey: idempotencyKey(request, body),
      busId: requireString(body, "busId", { max: 200 }),
      fareKey: requireString(body, "fareKey", { max: 4000 }),
      seatIds: body.seatIds,
      amount: body.amount,
      passengers: requirePassengers(body, { max: 10 }),
      contact: requireContact(body),
      boardingPointId: body.boardingPointId ?? null,
      droppingPointId: body.droppingPointId ?? null,
    });

    return ok({ booking, lock, reused });
  } catch (error) {
    return fail(error, "buses/book");
  }
}
