"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* =========================================================
   SHARED FAQ ACCORDION
   Used by the home page FAQ section and the flight-route FAQ
   section so both stay visually identical and only need one
   place to fix spacing/radius/animation.
========================================================= */

export default function FAQAccordion({ items, defaultOpenIndex = 0 }) {
  const [openIdx, setOpenIdx] = useState(defaultOpenIndex);

  return (
    <div className="mx-auto w-full max-w-[900px] space-y-3">
      {items.map((item, idx) => (
        <div key={item.question} className="overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white">
          <button
            type="button"
            aria-expanded={openIdx === idx}
            onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
            className="flex w-full items-center justify-between bg-white p-4 text-left transition-colors hover:bg-[#FAFAFA] sm:p-5"
          >
            <span className="text-left text-[15px] font-semibold text-[#0F172A] sm:text-[16px]">
              {item.question}
            </span>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-[#60646C] transition-transform duration-300 ${
                openIdx === idx ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              openIdx === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5">
                <p className="text-[14px] leading-[1.6] text-[#4B5563] sm:text-[15px]">{item.answer}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
