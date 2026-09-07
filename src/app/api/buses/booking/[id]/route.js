import { ok, fail } from "@/lib/travel/apiResponse";
import { getBusBooking } from "@/lib/travel/buses/booking";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    return ok({ booking: await getBusBooking(id) });
  } catch (error) {
    return fail(error, "buses/booking");
  }
}
