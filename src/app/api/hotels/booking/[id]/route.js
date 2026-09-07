import { ok, fail } from "@/lib/travel/apiResponse";
import { getHotelBooking } from "@/lib/travel/hotels/booking";

/* Server-side only. Supplier credentials never leave this process. */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    return ok({ booking: await getHotelBooking(id) });
  } catch (error) {
    return fail(error, "hotels/booking");
  }
}
