"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function HotelAbout({ description }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 220;
  const preview = isLong && !expanded ? `${description.slice(0, 220).trim()}…` : description;

  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
      <h2 className="text-[19px] font-bold text-[#0F172A] sm:text-[22px]">About this hotel</h2>
      <p className="mt-3 text-[15px] leading-[1.7] text-[#475569]">{preview}</p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 flex items-center gap-1 text-[13px] font-semibold text-[#0F4C81] transition hover:text-[#0B3B63]"
        >
          {expanded ? "Show less" : "Read more"}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}
    </div>
  );
}
