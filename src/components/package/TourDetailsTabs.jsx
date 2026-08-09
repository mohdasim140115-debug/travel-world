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
    <div className="mt-6 overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex flex-wrap gap-1 border-b border-[#E5E7EB] p-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`rounded-[10px] px-4 py-2.5 text-[13px] font-semibold transition-colors ${
              active === tab.key
                ? "bg-[#0F4C81] text-white"
                : "text-[#64748B] hover:bg-[#F7FAFC] hover:text-[#0F4C81]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-[14px] leading-[1.65] text-[#475569]">{activeTab.text}</p>
      </div>
    </div>
  );
}
