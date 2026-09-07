import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { revalidateHotel } from "@/lib/travel/hotels/revalidate";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await readJson(request);
    return ok({ rate: await revalidateHotel(body) });
  } catch (error) {
    return fail(error, "hotels/revalidate");
  }
}
