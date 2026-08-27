"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";

/* =========================================================
   GENERIC DESKTOP MEGA MENU
   Renders the India or World navigation data (top recommended
   row + left region switcher + right multi-column content).
   Hovering a region previews its columns; clicking one opens
   that region's page. Every destination link is a real
   Next.js Link resolved via src/data/navigationData.js.

   A column whose heading has no children is a destination in
   its own right, so it renders as a compact link instead of a
   heading with empty space under it.
========================================================= */

export default function MegaMenu({ data, open, onNavigate, onMouseEnter, onMouseLeave }) {
  const [activeRegion, setActiveRegion] = useState(0);
  const region = data.regions[activeRegion];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!open}
      className={`absolute left-1/2 top-full z-40 w-[calc(100%-2rem)] max-w-[1280px] -translate-x-1/2 overflow-hidden rounded-b-[18px] bg-white text-left shadow-[0_24px_48px_rgba(15,23,42,0.18)] transition-all duration-200 ease-out max-lg:hidden ${
        open
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible -translate-y-1 opacity-0"
      }`}
    >
      {/* TOP RECOMMENDED */}
      <div className="border-b border-[#EEF2F6] bg-[#F7FAFC] px-6 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
          Top recommended destinations
        </p>

        <div className="mt-2.5 flex flex-wrap gap-2">
          {data.recommended.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="group flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#0F172A] no-underline shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition hover:bg-[#0B3B63] hover:text-white"
            >
              <MapPin className="h-3 w-3 text-[#17BEBB] transition-colors group-hover:text-[#5EEAD4]" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* REGIONS + CONTENT */}
      <div className="grid grid-cols-[224px_minmax(0,1fr)]">
        <div className="border-r border-[#EEF2F6] bg-[#FBFDFE] py-3">
          <p className="px-5 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
            Regions
          </p>

          {data.regions.map((r, idx) => {
            const isActive = idx === activeRegion;

            return (
              <Link
                key={r.name}
                href={r.all.href}
                onMouseEnter={() => setActiveRegion(idx)}
                onFocus={() => setActiveRegion(idx)}
                onClick={onNavigate}
                className={`flex w-full items-center justify-between border-l-[3px] py-2.5 pl-[17px] pr-4 text-left text-[13px] no-underline transition ${
                  isActive
                    ? "border-[#17BEBB] bg-white font-semibold text-[#0F172A]"
                    : "border-transparent font-medium text-[#475569] hover:bg-white hover:text-[#0F172A]"
                }`}
              >
                {r.name}
                <ChevronRight size={14} className={isActive ? "text-[#17BEBB]" : "text-[#CBD5E1]"} />
              </Link>
            );
          })}
        </div>

        <div className="max-h-[440px] overflow-y-auto p-6">
          <div className="flex items-center justify-between gap-4 border-b border-[#EEF2F6] pb-3">
            <p className="text-[15px] font-bold text-[#0F172A]">{region.name}</p>

            <Link
              href={region.all.href}
              onClick={onNavigate}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#E6F7F5] px-3.5 py-1.5 text-[12px] font-bold text-[#0F4C81] no-underline transition hover:bg-[#17BEBB] hover:text-white"
            >
              All of {region.name}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
            {region.columns.map((col) => {
              if (col.items.length === 0) {
                return (
                  <Link
                    key={col.heading.href}
                    href={col.heading.href}
                    onClick={onNavigate}
                    className="group flex h-fit items-center justify-between gap-2 rounded-[10px] bg-[#F7FAFC] px-3 py-2.5 text-[13px] font-semibold text-[#0F172A] no-underline transition hover:bg-[#E6F7F5]"
                  >
                    {col.heading.name}
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#94A3B8] transition-all group-hover:translate-x-0.5 group-hover:text-[#17BEBB]" />
                  </Link>
                );
              }

              return (
                <div key={col.heading.href}>
                  <Link
                    href={col.heading.href}
                    onClick={onNavigate}
                    className="text-[13px] font-bold text-[#0F172A] no-underline transition hover:text-[#17BEBB]"
                  >
                    {col.heading.name}
                  </Link>

                  <span className="mt-1.5 block h-px w-7 bg-[#17BEBB]" />

                  <ul className="mt-2.5 space-y-2">
                    {col.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onNavigate}
                          className="text-[13px] font-light text-[#5A6472] no-underline transition hover:text-[#0F4C81]"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
