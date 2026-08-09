import { CalendarClock, ShieldCheck } from "lucide-react";

const POLICIES = [
  "Valid government-issued photo ID required at check-in for all guests.",
  "Early check-in and late check-out are subject to availability and may incur additional charges.",
  "Free cancellation up to 48 hours before check-in; charges apply for later cancellations.",
  "Extra beds and mattresses are available on request, subject to local regulations.",
];

export default function HotelPolicies({ checkInTime, checkOutTime }) {
  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
      <h2 className="text-[19px] font-bold text-[#0F172A] sm:text-[22px]">Hotel Policies</h2>

      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2.5 rounded-[10px] border border-[#E5E7EB] bg-[#F7FAFC] px-4 py-2.5 text-[13px] text-[#374151]">
          <CalendarClock className="h-4 w-4 text-[#0F4C81]" />
          Check-in from <strong>{checkInTime}</strong>
        </div>
        <div className="flex items-center gap-2.5 rounded-[10px] border border-[#E5E7EB] bg-[#F7FAFC] px-4 py-2.5 text-[13px] text-[#374151]">
          <CalendarClock className="h-4 w-4 text-[#0F4C81]" />
          Check-out by <strong>{checkOutTime}</strong>
        </div>
      </div>

      <div className="mt-4 space-y-2.5 rounded-[12px] bg-[#F7FAFC] p-4">
        {POLICIES.map((policy) => (
          <p key={policy} className="flex items-start gap-2 text-[13px] leading-[1.6] text-[#475569]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#17BEBB]" />
            {policy}
          </p>
        ))}
      </div>
    </div>
  );
}
