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

  const fieldLabel = "mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8]";
  const fieldInput =
    "w-full bg-transparent text-[15px] font-semibold text-[#0F172A] outline-none placeholder:text-[#94A3B8]";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-3 shadow-[0_20px_50px_rgba(10,32,80,0.18)] sm:rounded-[26px] sm:p-2.5"
    >
      <div className="grid grid-cols-2 gap-1.5 sm:flex sm:items-stretch sm:gap-0">
        {/* LOCATION */}
        <label className="col-span-2 flex items-center gap-3 rounded-xl px-4 py-2.5 transition hover:bg-[#F7FAFC] sm:flex-1 sm:rounded-2xl sm:py-3.5">
          <MapPin className="h-[18px] w-[18px] shrink-0 text-[#F0762B]" />
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

        <span className="hidden w-px shrink-0 self-center bg-[#E5E7EB] sm:block sm:h-10" />

        {/* DATE */}
        <label className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[#F7FAFC] sm:flex-1 sm:rounded-2xl sm:px-5 sm:py-3.5">
          <CalendarDays className="h-[18px] w-[18px] shrink-0 text-[#F0762B]" />
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

        <span className="hidden w-px shrink-0 self-center bg-[#E5E7EB] sm:block sm:h-10" />

        {/* GUESTS */}
        <label className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[#F7FAFC] sm:w-[168px] sm:rounded-2xl sm:px-5 sm:py-3.5">
          <Users className="h-[18px] w-[18px] shrink-0 text-[#F0762B]" />
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
          className="col-span-2 flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF8A2B] to-[#F0621F] px-8 text-[15px] font-bold text-white shadow-lg shadow-[#FF7A1A]/30 transition duration-200 hover:-translate-y-0.5 hover:brightness-105 sm:my-1 sm:mr-1 sm:h-auto sm:rounded-2xl"
        >
          <Search className="h-[18px] w-[18px]" />
          Search
        </button>
      </div>
    </form>
  );
}
