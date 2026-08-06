"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/* =========================================================
   GENERIC DESKTOP MEGA MENU
   Renders the India or World navigation data (top recommended
   row + left region switcher + right multi-column content).
   Region switching only changes local state, it never
   navigates. Every leaf destination link is a real Next.js
   Link resolved via src/data/navigationData.js.
========================================================= */

export default function MegaMenu({ data, open, onNavigate, onMouseEnter, onMouseLeave }) {
  const [activeRegion, setActiveRegion] = useState(0);
  const region = data.regions[activeRegion];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!open}
      className={`absolute left-1/2 top-full z-40 max-lg:hidden w-[calc(100%-2rem)] max-w-[1280px] -translate-x-1/2 rounded-b-[10px] border border-t-0 border-[#E5E7EB] bg-white text-left shadow-2xl transition-all duration-200 ease-out ${
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-1 opacity-0 pointer-events-none"
      }`}
    >
      {/* TOP RECOMMENDED */}
      <div className="border-b border-[#E5E7EB] px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">
          Top Recommended Destinations
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.recommended.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="rounded-full border border-[#D1D5DB] px-3 py-1 text-[12px] font-medium text-[#0F172A] no-underline transition hover:border-[#0F172A] hover:bg-[#0B3B63] hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* REGIONS + CONTENT */}
      <div className="grid grid-cols-[210px_minmax(0,1fr)]">
        <div className="border-r border-[#E5E7EB] py-2">
          {data.regions.map((r, idx) => (
            <button
              key={r.name}
              type="button"
              onMouseEnter={() => setActiveRegion(idx)}
              onClick={() => setActiveRegion(idx)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[12px] font-medium transition ${
                idx === activeRegion
                  ? "bg-[#F7FAFC] text-[#0F172A] font-semibold"
                  : "text-[#374151] hover:bg-[#F9FAFB]"
              }`}
            >
              {r.name}
              <ChevronRight size={13} className={idx === activeRegion ? "text-[#0F172A]" : "text-[#9CA3AF]"} />
            </button>
          ))}
        </div>

        <div className="max-h-[440px] overflow-y-auto p-5">
          <Link
            href={region.all.href}
            onClick={onNavigate}
            className="inline-block text-[13px] font-semibold text-[#0B3B63] underline-offset-2 no-underline hover:underline"
          >
            All of {region.name}
          </Link>

          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
            {region.columns.map((col) => (
              <div key={col.heading.href}>
                <Link
                  href={col.heading.href}
                  onClick={onNavigate}
                  className="text-[12px] font-semibold text-[#0B3B63] no-underline hover:text-[#0F4C81] hover:underline"
                >
                  {col.heading.name}
                </Link>

                {col.items.length > 0 && (
                  <ul className="mt-1.5 space-y-1.5">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className="text-[11px] text-[#4B5563] no-underline hover:text-[#0F4C81] hover:underline"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
