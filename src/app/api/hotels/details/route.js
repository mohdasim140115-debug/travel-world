import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { requireString } from "@/lib/travel/validate";
import { getHotelDetails } from "@/lib/travel/hotels/details";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await readJson(request);
    const hotel = await getHotelDetails({
      hotelId: requireString(body, "hotelId", { max: 200 }),
      searchId: body.searchId ?? null,
    });
    return ok({ hotel });
  } catch (error) {
    return fail(error, "hotels/details");
  }
}
