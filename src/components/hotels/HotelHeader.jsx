import { CalendarClock, MapPin, Star } from "lucide-react";

export default function HotelHeader({ hotel }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 rounded-full border border-[#17BEBB] bg-[#F7FAFC] px-2.5 py-1 text-[12px] font-semibold text-[#0F4C81]">
          <Star className="h-3 w-3 fill-[#0F4C81] text-[#0F4C81]" />
          {hotel.starRating} Star Hotel
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-[#475569]">
          <span className="flex items-center gap-1 rounded-[6px] bg-[#0F4C81] px-1.5 py-0.5 text-[12px] font-bold text-white">
            {hotel.rating.toFixed(1)}
          </span>
          <span className="font-medium">{hotel.reviewCount.toLocaleString("en-IN")} reviews</span>
        </span>
      </div>

      <h1 className="mt-2.5 text-[26px] font-bold leading-tight text-[#0F172A] sm:text-[34px]">
        {hotel.name}
      </h1>
      <p className="mt-1.5 flex items-center gap-1.5 text-[14px] text-[#64748B]">
        <MapPin className="h-4 w-4 shrink-0 text-[#0F4C81]" />
        {hotel.address}
      </p>

      <div className="mt-4 flex flex-wrap gap-4 rounded-[12px] border border-[#E5E7EB] bg-[#F7FAFC] px-4 py-3 text-[13px] text-[#374151]">
        <span className="flex items-center gap-1.5">
          <CalendarClock className="h-4 w-4 text-[#0F4C81]" />
          Check-in: <strong>{hotel.checkInTime}</strong>
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarClock className="h-4 w-4 text-[#0F4C81]" />
          Check-out: <strong>{hotel.checkOutTime}</strong>
        </span>
      </div>
    </div>
  );
}
