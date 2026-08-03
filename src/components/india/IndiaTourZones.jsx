

"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function slugifyZoneName(name) {
  return name
    .replace(/\s*Tour Packages\s*$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

const zoneData = {
  North: [
    {
      name: "Himachal Pradesh Tour Packages",
      tours: "21 tours",
      visual: "from-sky-300 via-slate-100 to-emerald-500",
    },
    {
      name: "Jammu And Kashmir Tour Packages",
      tours: "16 tours",
      visual: "from-blue-300 via-cyan-100 to-emerald-600",
    },
    {
      name: "Leh Ladakh Tour Packages",
      tours: "14 tours",
      visual: "from-cyan-300 via-blue-100 to-cyan-300",
    },
    {
      name: "Amritsar Tour Packages",
      tours: "13 tours",
      visual: "from-teal-300 via-orange-300 to-rose-700",
    },
    {
      name: "Agra Tour Packages",
      tours: "15 tours",
      visual: "from-orange-100 via-stone-200 to-sky-300",
    },
    {
      name: "Delhi Tour Packages",
      tours: "35 tours",
      visual: "from-orange-300 via-indigo-200 to-slate-700",
    },
    {
      name: "Nainital Mussoorie Corbett Tour Packages",
      tours: "16 tours",
      visual: "from-emerald-700 via-lime-500 to-indigo-200",
    },
  ],

  South: [
    {
      name: "Kerala Tour Packages",
      tours: "20 tours",
      visual: "from-emerald-400 via-green-200 to-cyan-500",
    },
    {
      name: "Tamil Nadu Tour Packages",
      tours: "15 tours",
      visual: "from-orange-300 via-indigo-100 to-stone-500",
    },
    {
      name: "Karnataka Tour Packages",
      tours: "18 tours",
      visual: "from-green-400 via-emerald-200 to-blue-400",
    },
    {
      name: "Hyderabad Tour Packages",
      tours: "12 tours",
      visual: "from-sky-300 via-stone-200 to-indigo-400",
    },
    {
      name: "Andaman Tour Packages",
      tours: "9 tours",
      visual: "from-cyan-300 via-blue-400 to-emerald-300",
    },
  ],

  "West & Central": [
    {
      name: "Rajasthan Tour Packages",
      tours: "36 tours",
      visual: "from-orange-300 via-teal-200 to-red-500",
    },
    {
      name: "Gujarat Tour Packages",
      tours: "17 tours",
      visual: "from-indigo-200 via-orange-100 to-blue-400",
    },
    {
      name: "Maharashtra Tour Packages",
      tours: "28 tours",
      visual: "from-green-400 via-slate-300 to-blue-500",
    },
    {
      name: "Madhya Pradesh Tour Packages",
      tours: "16 tours",
      visual: "from-emerald-400 via-teal-100 to-orange-400",
    },
  ],

  "East & North East": [
    {
      name: "Sikkim Tour Packages",
      tours: "14 tours",
      visual: "from-blue-300 via-slate-100 to-green-500",
    },
    {
      name: "Assam Tour Packages",
      tours: "13 tours",
      visual: "from-green-500 via-lime-300 to-sky-400",
    },
    {
      name: "Meghalaya Tour Packages",
      tours: "12 tours",
      visual: "from-cyan-400 via-green-300 to-slate-600",
    },
    {
      name: "Darjeeling Tour Packages",
      tours: "11 tours",
      visual: "from-green-500 via-emerald-200 to-blue-300",
    },
  ],
};

const extraStates = ["Uttar Pradesh", "Uttarakhand"];

function ZoneCard({ item }) {
  return (
    <Link
      href={`/india/${slugifyZoneName(item.name)}-tour-packages`}
      className="group block no-underline"
    >
      <div
        className={`relative h-[230px] overflow-hidden rounded-[5px] border border-[#d6d6d6] bg-gradient-to-br shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-200 group-hover:-translate-y-[2px] group-hover:border-[#2563EB] group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] ${item.visual}`}
      >
        {/* Decorative mountain shapes */}
        <div className="absolute -bottom-10 -left-8 h-28 w-40 rotate-12 rounded-[50%] bg-black/10" />
        <div className="absolute -bottom-8 right-0 h-24 w-44 -rotate-6 rounded-[50%] bg-white/15" />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3 pt-12">
          <p className="text-[14px] font-semibold leading-tight text-white">
            {item.name}
          </p>

          <p className="mt-1 text-[11px] text-white/90">
            {item.tours}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function IndiaTourZones() {
  const [activeZone, setActiveZone] = useState("North");
  const [page, setPage] = useState(1);

  const tours = zoneData[activeZone];

  return (
    <>
      {/* =========================
          PAGINATION
      ========================== */}
      <section className="bg-[#f7f7f7] pb-10 pt-8">
        <div className="india-container">
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-[#d3d7dd] bg-white text-[#555] disabled:bg-[#eceff3] disabled:text-[#b9bec6]"
            >
              <ChevronLeft size={15} />
            </button>

            {[1, 2, 3, 4, 5].map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                className={`h-8 min-w-8 rounded-[3px] border px-2 text-[11px] font-medium ${
                  page === number
                    ? "border-[#2563EB] bg-white text-[#2563EB]"
                    : "border-[#d3d7dd] bg-white text-[#333]"
                }`}
              >
                {number}
              </button>
            ))}

            <span className="text-[12px] text-[#777]">...</span>

            <button
              type="button"
              onClick={() => setPage(27)}
              className={`h-8 min-w-8 rounded-[3px] border px-2 text-[11px] ${
                page === 27
                  ? "border-[#2563EB] text-[#2563EB]"
                  : "border-[#d3d7dd] text-[#333]"
              } bg-white`}
            >
              27
            </button>

            <button
              type="button"
              aria-label="Next page"
              disabled={page === 27}
              onClick={() => setPage((prev) => Math.min(27, prev + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-[3px] border border-[#d3d7dd] bg-white text-[#555] disabled:bg-[#eceff3]"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          PACKAGES BY ZONE
      ========================== */}
      <section className="bg-white py-12">
        <div className="india-container">
          <div className="text-center">
            <h2 className="text-[22px] font-medium text-[#171717]">
              India Tour Packages By Zone
            </h2>

            <div className="mx-auto mt-2 h-[2px] w-20 bg-[#2563EB]" />
          </div>

          {/* ZONE TABS */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {Object.keys(zoneData).map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setActiveZone(zone)}
                className={`h-[40px] min-w-[115px] rounded-[3px] border px-5 text-[11px] font-medium transition ${
                  activeZone === zone
                    ? "border-[#2563EB] bg-[#2563EB] text-white"
                    : "border-[#333] bg-white text-[#333] hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                {zone}
              </button>
            ))}
          </div>

          {/* TOUR GRID */}
          <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {tours.map((item) => (
              <ZoneCard
                key={`${activeZone}-${item.name}`}
                item={item}
              />
            ))}
          </div>

          {/* EXTRA STATE BUTTONS */}
          {activeZone === "North" && (
            <div className="mt-7 flex justify-center gap-3">
              {extraStates.map((state) => (
                <button
                  key={state}
                  type="button"
                  className="rounded-[3px] border border-[#d9dde3] bg-white px-5 py-2 text-[10px] text-[#333] hover:border-[#2563EB]"
                >
                  {state}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}