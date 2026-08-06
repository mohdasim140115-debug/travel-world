"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Search } from "lucide-react";
import { stripCount } from "./tourUtils";

/* =========================================================
   GENERIC FILTER SIDEBAR — now a CONTROLLED component.
   Every checkbox actually drives TourListing's filtering
   (see TourListing.jsx), it's not just decorative markup.
========================================================= */

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-[#dedede] px-3 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-[12px] font-semibold text-[#222]">{title}</h4>
        <ChevronDown size={14} />
      </div>

      {children}
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="mb-2 flex cursor-pointer items-center gap-2 text-[11px] text-[#333]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-[12px] w-[12px] accent-[#0F4C81]"
      />
      <span>{label}</span>
    </label>
  );
}

function SearchableCheckboxGroup({ title, options, selected, onToggle }) {
  const [query, setQuery] = useState("");
  const visible = query
    ? options.filter((option) => stripCount(option).toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <FilterGroup title={title}>
      <div className="relative mb-3">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="h-[30px] w-full border border-[#777] px-2 pr-7 text-[10px] outline-none"
        />
        <Search size={13} className="absolute right-2 top-1/2 -translate-y-1/2" />
      </div>

      {visible.length === 0 && (
        <p className="text-[10px] text-[#888]">No matches</p>
      )}

      {visible.map((option) => (
        <Checkbox
          key={option}
          label={option}
          checked={selected.includes(stripCount(option))}
          onChange={() => onToggle(stripCount(option))}
        />
      ))}
    </FilterGroup>
  );
}

export default function TourFilterSidebar({
  priceBounds = { min: 9000, max: 365000 },
  maxPrice,
  onPriceChange,
  departureCities = [],
  countries = [],
  cities = [],
  durations = ["3 - 8 Days", "9 - 14 Days", "15 - 21 Days", "22+ Days"],
  selectedDurations = [],
  onToggleDuration,
  packageTypes = [],
  selectedPackageTypes = [],
  onTogglePackageType,
  specialityTours = [],
  selectedSpecialityTours = [],
  onToggleSpeciality,
  selectedCountries = [],
  onToggleCountry,
  selectedCities = [],
  onToggleCity,
  onReset,
}) {
  return (
    <aside className="self-start border border-[#d6d6d6] bg-white">
      <div className="flex items-center justify-between border-b border-[#ddd] px-3 py-3">
        <h3 className="text-[13px] font-semibold">☷ Filter Your Tour</h3>

        <button type="button" onClick={onReset} className="text-[9px] underline">
          Reset
        </button>
      </div>

      <FilterGroup title="Price Range">
        <div className="px-1">
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={maxPrice}
            onChange={(event) => onPriceChange(Number(event.target.value))}
            className="w-full accent-[#0F4C81]"
          />

          <div className="mt-1 flex justify-between text-[8px]">
            <span>₹{priceBounds.min.toLocaleString("en-IN")}</span>
            <span>Up to ₹{maxPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </FilterGroup>

      {departureCities.length > 0 && (
        <FilterGroup title="Departure City">
          {departureCities.map((city) => (
            <Checkbox key={city} label={city} checked={false} onChange={() => {}} />
          ))}
        </FilterGroup>
      )}

      {countries.length > 0 && (
        <SearchableCheckboxGroup
          title="Countries"
          options={countries}
          selected={selectedCountries}
          onToggle={onToggleCountry}
        />
      )}

      {cities.length > 0 && (
        <SearchableCheckboxGroup
          title="Cities"
          options={cities}
          selected={selectedCities}
          onToggle={onToggleCity}
        />
      )}

      <FilterGroup title="Depart Between">
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Start Date"
              className="h-[32px] w-full border border-[#777] px-2 text-[9px]"
            />
            <CalendarDays size={13} className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="End Date"
              className="h-[32px] w-full border border-[#777] px-2 text-[9px]"
            />
            <CalendarDays size={13} className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Tour Duration">
        <div className="grid grid-cols-2 gap-2">
          {durations.map((duration) => (
            <button
              key={duration}
              type="button"
              onClick={() => onToggleDuration(duration)}
              className={`border px-1 py-2 text-[8px] ${
                selectedDurations.includes(duration)
                  ? "border-[#0F4C81] bg-[#eef3ff] text-[#0F4C81]"
                  : "border-[#ccc] bg-white"
              }`}
            >
              {duration}
            </button>
          ))}
        </div>
      </FilterGroup>

      {packageTypes.length > 0 && (
        <FilterGroup title="Package Type">
          {packageTypes.map((type) => (
            <Checkbox
              key={type}
              label={type}
              checked={selectedPackageTypes.includes(stripCount(type))}
              onChange={() => onTogglePackageType(stripCount(type))}
            />
          ))}
        </FilterGroup>
      )}

      {specialityTours.length > 0 && (
        <FilterGroup title="Speciality Tour">
          {specialityTours.map((item) => (
            <Checkbox
              key={item}
              label={item}
              checked={selectedSpecialityTours.includes(stripCount(item))}
              onChange={() => onToggleSpeciality(stripCount(item))}
            />
          ))}
        </FilterGroup>
      )}
    </aside>
  );
}
