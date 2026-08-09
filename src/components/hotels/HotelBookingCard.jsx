import { CalendarDays, Users } from "lucide-react";

export default function HotelBookingCard({ hotel }) {
  return (
    <>
      {/* DESKTOP: sticky card */}
      <aside className="hidden self-start rounded-[16px] border border-[#E5E7EB] bg-[#F7FAFC] p-5 shadow-[0_4px_20px_rgba(15,23,42,0.06)] lg:sticky lg:top-[84px] lg:block">
        <p className="text-[12px] text-[#777]">Starting price per night</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-[26px] font-bold text-[#0F172A]">
            ₹{hotel.pricePerNight.toLocaleString("en-IN")}
          </span>
          <span className="text-[12px] text-[#94A3B8]">+ taxes</span>
        </div>

        <div className="mt-4 space-y-2.5 border-t border-[#E5E7EB] pt-4">
          <div className="flex items-center gap-2 text-[13px] text-[#374151]">
            <CalendarDays className="h-4 w-4 shrink-0 text-[#0F4C81]" />
            Flexible check-in &amp; check-out dates
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[#374151]">
            <Users className="h-4 w-4 shrink-0 text-[#0F4C81]" />
            Choose guests &amp; room type below
          </div>
        </div>

        <a
          href="#rooms"
          className="mt-4 flex h-[46px] w-full items-center justify-center rounded-[10px] bg-[#FF7A1A] text-[14px] font-bold text-white no-underline shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:-translate-y-0.5 hover:bg-[#E56A0F]"
        >
          View Rooms &amp; Book
        </a>
        <p className="mt-2 text-center text-[11px] text-[#94A3B8]">No payment now — confirm on request</p>
      </aside>

      {/* MOBILE: compact sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-[#E5E7EB] bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <div>
          <p className="text-[11px] text-[#777]">Starting from</p>
          <p className="text-[17px] font-bold text-[#0F172A]">₹{hotel.pricePerNight.toLocaleString("en-IN")}<span className="text-[11px] font-normal text-[#6B7280]">/night</span></p>
        </div>
        <a
          href="#rooms"
          className="flex h-[44px] items-center rounded-[10px] bg-[#FF7A1A] px-6 text-[13px] font-bold text-white no-underline shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:bg-[#E56A0F]"
        >
          View Rooms
        </a>
      </div>
    </>
  );
}
