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
              <div className="absolute left-[19px] top-10 h-full w-px bg-[#d8d8d8]" />
            )}

            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#20B8B5] text-[11px] font-bold text-white">
              {day.day}
            </div>

            <div className="flex-1 overflow-hidden rounded-[7px] border bg-[#fafafa]">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenDay(isOpen ? null : day.day)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-[#f0f2f5]"
              >
                <div>
                  <p className="text-[9px] font-semibold uppercase text-[#777]">Day {day.day}</p>
                  <h3 className="mt-1 text-[14px] font-semibold text-[#1e1e1e]">{day.title}</h3>
                </div>

                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#c9d3e2] text-[#008C95]">
                  {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-[#e5e5e5] px-4 pb-4 pt-3">
                  <p className="text-[11px] leading-5 text-[#555]">{day.description}</p>

                  <div className="mt-4 flex flex-wrap gap-4 text-[9px] text-[#666]">
                    <span className="flex items-center gap-1">
                      <Hotel size={12} />
                      Hotel
                    </span>
                    <span className="flex items-center gap-1">
                      <Utensils size={12} />
                      Meals
                    </span>
                    <span className="flex items-center gap-1">
                      <Bus size={12} />
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
