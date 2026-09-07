import { ok, fail, readJson } from "@/lib/travel/apiResponse";
import { revalidateFlight } from "@/lib/travel/flights/revalidate";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await readJson(request);
    return ok({ fare: await revalidateFlight(body) });
  } catch (error) {
    return fail(error, "flights/revalidate");
  }
}
