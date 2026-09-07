import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { optionalString, requireString } from "@/lib/travel/validate";
import { cancelHotelBooking } from "@/lib/travel/hotels/cancellation";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await readJson(request);
    const result = await cancelHotelBooking({
      bookingRef: requireString(body, "bookingRef", { max: 32 }),
      reason: optionalString(body, "reason", { max: 300 }),
    });
    return ok(result);
  } catch (error) {
    return fail(error, "hotels/cancel");
  }
}
