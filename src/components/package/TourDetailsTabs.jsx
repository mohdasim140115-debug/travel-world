"use client";

import { useState } from "react";

/* =========================================================
   TOUR DETAILS — Flight / Accommodation / Reporting tabs
   Generic, data-driven so every package (existing + new)
   renders it automatically via tour.tourDetails.
========================================================= */

export default function TourDetailsTabs({ details }) {
  const tabs = [
    { key: "flight", label: "Flight Details", text: details.flight },
    { key: "accommodation", label: "Accommodation Details", text: details.accommodation },
    { key: "reporting", label: "Reporting & Dropping", text: details.reporting },
  ];

  const [active, setActive] = useState(tabs[0].key);
  const activeTab = tabs.find((tab) => tab.key === active);

  return (
    <div className="mt-5 rounded-[7px] border bg-white">
      <div className="flex flex-wrap gap-2 border-[#183B3D] p-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`rounded-full border px-4 py-2 text-[10px] font-semibold ${
              active === tab.key
                ? "border-[#008C95] bg-[#eef3ff] text-[#008C95]"
                : "border-[#ccc] bg-white text-[#333]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        <p className="text-[11px] leading-6 text-[#555]">{activeTab.text}</p>
      </div>
    </div>
  );
}
