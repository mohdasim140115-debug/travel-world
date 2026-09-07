import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { requireString } from "@/lib/travel/validate";
import { getBusSeats } from "@/lib/travel/buses/seats";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await readJson(request);
    const seats = await getBusSeats({
      busId: requireString(body, "busId", { max: 200 }),
      fareKey: body.fareKey ?? null,
      searchId: body.searchId ?? null,
    });
    return ok(seats);
  } catch (error) {
    return fail(error, "buses/seats");
  }
}
