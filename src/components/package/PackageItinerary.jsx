"use client";

import { useState } from "react";
import { Bus, Hotel, Minus, Plus, Utensils } from "lucide-react";

/* =========================================================
   ITINERARY ACCORDION
   Day-wise expand/collapse control, reused across every
   package detail page (India + World + China, etc.).
========================================================= */

export default function PackageItinerary({ itinerary }) {
  const [openDay, setOpenDay] = useState(itinerary?.[0]?.day ?? 1);

  return (
    <div className="mt-6">
      {itinerary.map((day, index) => {
        const isOpen = openDay === day.day;

        return (
          <div key={day.day} className="relative flex gap-4 pb-4">
            {index !== itinerary.length - 1 && (
              <div className="absolute left-[21px] top-11 h-full w-px bg-[#E5E7EB]" />
            )}

            <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#17BEBB] text-[13px] font-bold text-white">
              {day.day}
            </div>

            <div className="flex-1 overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-[#F8FAFC]">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenDay(isOpen ? null : day.day)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-[#F1F5F9] sm:p-5"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">Day {day.day}</p>
                  <h3 className="mt-1 text-[15px] font-semibold text-[#0F172A] sm:text-[16px]">{day.title}</h3>
                </div>

                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#CBD5E1] text-[#0F4C81]">
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-[#E5E7EB] bg-white px-4 pb-4 pt-3 sm:px-5">
                  <p className="text-[13px] leading-[1.6] text-[#475569] sm:text-[14px]">{day.description}</p>

                  <div className="mt-4 flex flex-wrap gap-4 text-[12px] text-[#64748B]">
                    <span className="flex items-center gap-1.5">
                      <Hotel size={13} />
                      Hotel
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Utensils size={13} />
                      Meals
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bus size={13} />
                      Transport
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
