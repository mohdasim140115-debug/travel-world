import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { searchHotels } from "@/lib/travel/hotels/search";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await readJson(request);
    const result = await searchHotels(body);
    // An empty list is a valid answer, not an error — the UI shows "no results".
    return ok({ ...result, resultCount: result.hotels.length });
  } catch (error) {
    return fail(error, "hotels/search");
  }
}
