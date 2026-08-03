"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, CalendarDays, MapPin, Search, Users } from "lucide-react";

import { airports, buildRouteSlug, searchAirports } from "@/data/airports";

/* =========================================================
   SHARED FLIGHT SEARCH FORM
   Used on /flights (hero) and /flights/[route] (route hero).
   Client-side only: navigates to /flights/from-to-to.
========================================================= */

function CityField({ label, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);

  const suggestions = searchAirports(query).slice(0, 6);

  return (
    <div className="relative min-w-0 flex-1">
      <label className="block text-[9px] font-semibold uppercase tracking-wide text-[#6B7280]">
        {label}
      </label>

      <div className="mt-1 flex items-center gap-2 rounded-[4px] border border-[#D1D5DB] bg-white px-2 py-2">
        <MapPin size={14} className="shrink-0 text-[#0B1F3A]" />

        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          className="w-full min-w-0 border-0 bg-transparent text-[12px] font-semibold text-[#0B1F3A] outline-none"
        />
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-[56px] z-30 max-h-[220px] overflow-y-auto rounded-[4px] border border-[#D1D5DB] bg-white shadow-lg">
          {suggestions.map((airport) => (
            <button
              key={airport.code}
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                setQuery(airport.city);
                onChange(airport.city);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-[12px] hover:bg-[#F5F7FA]"
            >
              <span className="font-medium text-[#0B1F3A]">{airport.city}</span>
              <span className="text-[10px] text-[#6B7280]">{airport.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FlightSearchForm({ initialFrom = "Mumbai", initialTo = "Delhi", compact = false }) {
  const router = useRouter();
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  function handleSearch(event) {
    event.preventDefault();

    const fromAirport = airports.find((a) => a.city.toLowerCase() === from.trim().toLowerCase());
    const toAirport = airports.find((a) => a.city.toLowerCase() === to.trim().toLowerCase());

    if (!fromAirport || !toAirport || fromAirport.code === toAirport.code) {
      return;
    }

    router.push(`/flights/${buildRouteSlug(fromAirport.city, toAirport.city)}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full rounded-[8px] border border-[#E5E7EB] bg-white p-4 shadow-sm ${compact ? "" : "sm:p-5"}`}
    >
      <div className="flex items-center gap-4 text-[12px] font-semibold text-[#0B1F3A]">
        <label className="flex items-center gap-1.5">
          <input
            type="radio"
            name="tripType"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
            className="accent-[#0B2033]"
          />
          One Way
        </label>

        <label className="flex items-center gap-1.5">
          <input
            type="radio"
            name="tripType"
            checked={tripType === "roundtrip"}
            onChange={() => setTripType("roundtrip")}
            className="accent-[#0B2033]"
          />
          Round Trip
        </label>
      </div>

      <div className="mt-3 grid grid-cols-1 items-end gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_0.8fr_0.8fr_1fr_auto]">
        <CityField label="From" value={from} onChange={setFrom} placeholder="Mumbai" />

        <button
          type="button"
          onClick={handleSwap}
          aria-label="Swap origin and destination"
          className="mx-auto hidden h-8 w-8 items-center justify-center rounded-full border border-[#D1D5DB] bg-white text-[#0B1F3A] lg:flex"
        >
          <ArrowLeftRight size={14} />
        </button>

        <CityField label="To" value={to} onChange={setTo} placeholder="Delhi" />

        <div>
          <label className="block text-[9px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Departure
          </label>
          <div className="mt-1 flex items-center gap-2 rounded-[4px] border border-[#D1D5DB] bg-white px-2 py-2">
            <CalendarDays size={14} className="shrink-0 text-[#0B1F3A]" />
            <input type="date" className="w-full min-w-0 border-0 bg-transparent text-[11px] font-semibold text-[#0B1F3A] outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-[9px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Return
          </label>
          <div
            className={`mt-1 flex items-center gap-2 rounded-[4px] border border-[#D1D5DB] px-2 py-2 ${
              tripType === "roundtrip" ? "bg-white" : "bg-[#F3F4F6]"
            }`}
          >
            <CalendarDays size={14} className="shrink-0 text-[#0B1F3A]" />
            <input
              type="date"
              disabled={tripType !== "roundtrip"}
              className="w-full min-w-0 border-0 bg-transparent text-[11px] font-semibold text-[#0B1F3A] outline-none disabled:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[9px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Passengers &amp; Class
          </label>
          <div className="mt-1 flex items-center gap-2 rounded-[4px] border border-[#D1D5DB] bg-white px-2 py-2">
            <Users size={14} className="shrink-0 text-[#0B1F3A]" />
            <span className="truncate text-[11px] font-semibold text-[#0B1F3A]">
              1 Adult, 0 Child, 0 Infant &middot; Economy
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="flex h-[38px] items-center justify-center gap-2 rounded-[4px] bg-[#2563EB] px-5 text-[12px] font-bold text-white transition hover:bg-[#1D4ED8]"
        >
          <Search size={14} />
          Search
        </button>
      </div>
    </form>
  );
}
