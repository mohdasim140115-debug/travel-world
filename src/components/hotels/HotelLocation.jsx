import { MapPinned } from "lucide-react";

export default function HotelLocation({ address, nearbyAttractions }) {
  if (!nearbyAttractions || nearbyAttractions.length === 0) return null;

  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
      <h2 className="text-[19px] font-bold text-[#0F172A] sm:text-[22px]">Location &amp; Nearby</h2>
      <p className="mt-1 text-[14px] text-[#64748B]">{address}</p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {nearbyAttractions.map((place) => (
          <div
            key={place}
            className="flex items-center gap-2.5 rounded-[10px] border border-[#E5E7EB] bg-[#F7FAFC] px-3.5 py-3 transition hover:border-[#17BEBB]"
          >
            <MapPinned className="h-4 w-4 shrink-0 text-[#0F4C81]" />
            <span className="text-[13px] font-medium text-[#374151]">{place}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
