import Link from "next/link";
import { Plane, Clock3, Info } from "lucide-react";

export default function FlightRouteContent({ route }) {
  const airlineNames = Array.from(new Set(route.flights.map((flight) => flight.airline)));
  const minDuration = Math.min(...route.flights.map((flight) => flight.durationMinutes));
  const maxDuration = Math.max(...route.flights.map((flight) => flight.durationMinutes));

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-[8px] border border-[#E5E7EB] bg-white p-4">
            <div className="flex items-center gap-2">
              <Plane size={16} className="text-[#0B1F3A]" />
              <h3 className="text-[13px] font-semibold text-[#0B1F3A]">
                Airlines flying {route.from} to {route.to}
              </h3>
            </div>
            <p className="mt-2 text-[11px] leading-[1.7] text-[#6B7280]">
              {airlineNames.join(", ")} operate regular flights on the {route.from} to {route.to}{" "}
              sector, offering travellers a good mix of timings, fares and service levels to
              choose from.
            </p>
          </div>

          <div className="rounded-[8px] border border-[#E5E7EB] bg-white p-4">
            <div className="flex items-center gap-2">
              <Clock3 size={16} className="text-[#0B1F3A]" />
              <h3 className="text-[13px] font-semibold text-[#0B1F3A]">
                {route.from} to {route.to} flight duration and best time to fly
              </h3>
            </div>
            <p className="mt-2 text-[11px] leading-[1.7] text-[#6B7280]">
              Flight time on this route typically ranges between {Math.floor(minDuration / 60)}h{" "}
              {minDuration % 60}m and {Math.floor(maxDuration / 60)}h {maxDuration % 60}m depending
              on the number of stops. Early morning and late evening departures tend to see
              slightly lower demand.
            </p>
          </div>

          <div className="rounded-[8px] border border-[#E5E7EB] bg-white p-4">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-[#0B1F3A]" />
              <h3 className="text-[13px] font-semibold text-[#0B1F3A]">
                {route.to} Airport Tips
              </h3>
            </div>
            <p className="mt-2 text-[11px] leading-[1.7] text-[#6B7280]">
              Arrive at least 2 hours before departure for domestic flights and 3 hours for
              international sectors, keep a valid photo ID handy, and check baggage allowances
              with your airline before travelling to {route.to}.
            </p>
          </div>
        </div>

        {route.relatedTours && route.relatedTours.length > 0 && (
          <div className="mt-6 rounded-[8px] border border-[#BFD7F5] bg-[#F0F6FF] p-4">
            <h3 className="text-[13px] font-semibold text-[#0B1F3A]">
              Explore {route.to} group tour packages
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {route.relatedTours.map((tour) => (
                <Link
                  key={tour.href}
                  href={tour.href}
                  className="rounded-full border border-[#0B1F3A] px-4 py-2 text-[11px] font-semibold text-[#0B1F3A] no-underline transition hover:bg-[#071426] hover:text-white"
                >
                  {tour.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {route.otherRouteObjects && route.otherRouteObjects.length > 0 && (
          <div className="mt-8">
            <h3 className="text-[15px] font-semibold text-[#0B1F3A]">Other routes travellers search</h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {route.otherRouteObjects.map((other) => (
                <Link
                  key={other.slug}
                  href={`/flights/${other.slug}`}
                  className="flex items-center justify-between rounded-[8px] border border-[#E5E7EB] bg-white p-4 no-underline transition hover:border-[#0B1F3A]"
                >
                  <span className="text-[12px] font-semibold text-[#0B1F3A]">
                    {other.from} to {other.to} Flights
                  </span>
                  <span className="text-[10px] font-medium text-[#6B7280]">
                    {other.fromCode}-{other.toCode}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
