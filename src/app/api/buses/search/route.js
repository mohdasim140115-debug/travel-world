import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { searchBuses } from "@/lib/travel/buses/search";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await readJson(request);
    const result = await searchBuses(body);
    return ok({ ...result, resultCount: result.buses.length });
  } catch (error) {
    return fail(error, "buses/search");
  }
}
