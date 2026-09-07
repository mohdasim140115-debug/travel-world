import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { requireString } from "@/lib/travel/validate";
import { isSeatLockSupported, lockBusSeats } from "@/lib/travel/buses/lock";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET reports whether the supplier holds seats at all, so the UI can skip
    the step instead of assuming a hold it never got. POST performs the hold. */
export async function GET() {
  return ok({ supported: isSeatLockSupported() });
}

export async function POST(request) {
  try {
    const body = await readJson(request);
    const lock = await lockBusSeats({
      busId: requireString(body, "busId", { max: 200 }),
      fareKey: body.fareKey ?? null,
      seatIds: body.seatIds,
      passengers: Array.isArray(body.passengers) ? body.passengers : [],
      boardingPointId: body.boardingPointId ?? null,
      droppingPointId: body.droppingPointId ?? null,
    });
    return ok({ lock, supported: true });
  } catch (error) {
    return fail(error, "buses/lock");
  }
}
