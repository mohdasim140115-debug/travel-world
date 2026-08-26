"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";

/* =========================================================
   HERO SEARCH PANEL
   Floats over the bottom edge of the hero image.

   The destination list is the same one the strip below
   renders, and Search sends the visitor to that
   destination's existing page — the date and guest count
   ride along as query params so the landing page can use
   them later without this form inventing a search backend.
========================================================= */

export default function HeroSearchPanel({ destinations = [] }) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");

  function handleSubmit(event) {
    event.preventDefault();

    const target = destination || destinations[0]?.href;
    if (!target) return;

    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (guests) params.set("guests", guests);

    const query = params.toString();
    router.push(query ? `${target}?${query}` : target);
  }

  const fieldLabel = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]";
  const fieldInput =
    "w-full bg-transparent text-[14px] font-medium text-[#0F172A] outline-none placeholder:text-[#94A3B8]";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.16)] sm:p-2.5"
    >
      <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-stretch sm:gap-0">
        {/* LOCATION */}
        <label className="col-span-2 flex items-center gap-3 rounded-[14px] px-4 py-2.5 transition hover:bg-[#F7FAFC] sm:flex-1 sm:rounded-[16px] sm:py-3">
          <MapPin className="h-4 w-4 shrink-0 text-[#17BEBB]" />
          <span className="min-w-0 flex-1">
            <span className={fieldLabel}>Where to</span>
            <select
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className={`${fieldInput} -ml-0.5 cursor-pointer`}
            >
              <option value="">Anywhere</option>
              {destinations.map((item) => (
                <option key={item.name} value={item.href}>
                  {item.name}
                </option>
              ))}
            </select>
          </span>
        </label>

        <span className="hidden w-px shrink-0 self-center bg-[#E5E7EB] sm:block sm:h-9" />

        {/* DATE */}
        <label className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 transition hover:bg-[#F7FAFC] sm:flex-1 sm:px-4 sm:rounded-[16px] sm:py-3">
          <CalendarDays className="h-4 w-4 shrink-0 text-[#17BEBB]" />
          <span className="min-w-0 flex-1">
            <span className={fieldLabel}>When</span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={`${fieldInput} cursor-pointer`}
            />
          </span>
        </label>

        <span className="hidden w-px shrink-0 self-center bg-[#E5E7EB] sm:block sm:h-9" />

        {/* GUESTS */}
        <label className="flex items-center gap-3 rounded-[14px] px-3 py-2.5 transition hover:bg-[#F7FAFC] sm:w-[150px] sm:px-4 sm:rounded-[16px] sm:py-3">
          <Users className="h-4 w-4 shrink-0 text-[#17BEBB]" />
          <span className="min-w-0 flex-1">
            <span className={fieldLabel}>Guests</span>
            <select
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              className={`${fieldInput} -ml-0.5 cursor-pointer`}
            >
              {["1", "2", "3", "4", "5", "6+"].map((count) => (
                <option key={count} value={count}>
                  {count} {count === "1" ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </span>
        </label>

        <button
          type="submit"
          className="col-span-2 flex h-[48px] shrink-0 items-center justify-center gap-2 rounded-[14px] bg-[#FF7A1A] px-6 text-[14px] font-bold text-white shadow-[0_6px_16px_rgba(255,122,26,0.32)] transition hover:bg-[#E56A0F] sm:my-1 sm:mr-1 sm:h-auto sm:rounded-[16px]"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </div>
    </form>
  );
}
