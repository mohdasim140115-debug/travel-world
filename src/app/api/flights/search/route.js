import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { searchFlights } from "@/lib/travel/flights/search";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await readJson(request);
    const result = await searchFlights(body);

    // An empty list is a valid answer, not an error — the UI shows "no results".
    return ok({ ...result, resultCount: result.offers.length });
  } catch (error) {
    return fail(error, "flights/search");
  }
}
