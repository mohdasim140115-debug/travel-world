import { Plane } from "lucide-react";

export default function FlightResultCard({ flight, from, to, onBookNow }) {
  return (
    <article className="grid grid-cols-1 gap-3 rounded-[8px] border border-[#E5E7EB] bg-white p-4 sm:grid-cols-[1.1fr_2fr_0.9fr] sm:items-center sm:gap-4">
      {/* AIRLINE */}
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0F4FA] text-[#183B3D]">
          <Plane size={16} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-[#183B3D]">{flight.airline}</p>
          <p className="text-[10px] text-[#6B7280]">{flight.flightNumber}</p>
        </div>
      </div>

      {/* TIMES */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="text-center">
          <p className="text-[15px] font-bold text-[#183B3D]">{flight.departureTime}</p>
          <p className="text-[10px] text-[#6B7280]">
            {flight.fromCode} {from}
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center px-1">
          <p className="text-[10px] text-[#6B7280]">{flight.duration}</p>
          <div className="my-1 h-px w-full bg-[#D1D5DB]" />
          <p className="text-[10px] font-medium text-[#6B7280]">{flight.stopsLabel}</p>
        </div>

        <div className="text-center">
          <p className="text-[15px] font-bold text-[#183B3D]">{flight.arrivalTime}</p>
          <p className="text-[10px] text-[#6B7280]">
            {flight.toCode} {to}
          </p>
        </div>
      </div>

      {/* PRICE / CTA */}
      <div className="flex items-center justify-between gap-3 border-t border-[#F0F0F0] pt-3 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:border-[#F0F0F0] sm:pt-0 sm:pl-4">
        <div className="sm:text-right">
          <p className="text-[16px] font-bold text-[#183B3D]">
            ₹{flight.price.toLocaleString("en-IN")}
            <span className="ml-1 text-[10px] font-normal text-[#6B7280]">/ person</span>
          </p>
          <p
            className={`text-[10px] font-medium ${
              flight.status === "Few Seats Left" ? "text-orange-600" : "text-green-700"
            }`}
          >
            {flight.status}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onBookNow(flight)}
          className="h-[34px] rounded-[4px] bg-[#FF7A3D] px-4 text-[12px] font-bold text-white transition hover:bg-[#EA642C]"
        >
          Book Now
        </button>
      </div>
    </article>
  );
}
