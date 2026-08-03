"use client";

const STOP_OPTIONS = [
  { value: 0, label: "Nonstop" },
  { value: 1, label: "1 Stop" },
  { value: 2, label: "2+ Stops" },
];

const TIME_SLOTS = [
  { value: "morning", label: "Morning", hint: "6 AM - 12 PM" },
  { value: "afternoon", label: "Afternoon", hint: "12 PM - 6 PM" },
  { value: "evening", label: "Evening", hint: "6 PM - 12 AM" },
  { value: "night", label: "Night", hint: "12 AM - 6 AM" },
];

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-[#E5E7EB] px-3 py-4">
      <h4 className="mb-3 text-[12px] font-semibold text-[#0B1F3A]">{title}</h4>
      {children}
    </div>
  );
}

function Checkbox({ label, checked, onChange, hint }) {
  return (
    <label className="mb-2 flex cursor-pointer items-center justify-between gap-2 text-[11px] text-[#374151]">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-[12px] w-[12px] accent-[#0B2033]"
        />
        {label}
      </span>
      {hint && <span className="text-[9px] text-[#9CA3AF]">{hint}</span>}
    </label>
  );
}

export default function FlightFilters({
  airlineOptions,
  stops,
  onToggleStop,
  timeSlots,
  onToggleTimeSlot,
  airlines,
  onToggleAirline,
  maxPrice,
  priceBounds,
  onPriceChange,
  onReset,
}) {
  return (
    <aside className="self-start rounded-[8px] border border-[#E5E7EB] bg-white">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-3 py-3">
        <h3 className="text-[13px] font-semibold text-[#0B1F3A]">Filter your Flight</h3>
        <button type="button" onClick={onReset} className="text-[9px] font-semibold text-[#0B1F3A] underline">
          Reset
        </button>
      </div>

      <FilterGroup title="Stops">
        {STOP_OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={stops.includes(option.value)}
            onChange={() => onToggleStop(option.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price Range">
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          value={maxPrice}
          onChange={(event) => onPriceChange(Number(event.target.value))}
          className="w-full accent-[#0B2033]"
        />
        <div className="mt-1 flex justify-between text-[10px] text-[#6B7280]">
          <span>₹{priceBounds.min.toLocaleString("en-IN")}</span>
          <span>Up to ₹{maxPrice.toLocaleString("en-IN")}</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Departure Time">
        {TIME_SLOTS.map((slot) => (
          <Checkbox
            key={slot.value}
            label={slot.label}
            hint={slot.hint}
            checked={timeSlots.includes(slot.value)}
            onChange={() => onToggleTimeSlot(slot.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Airlines">
        {airlineOptions.map((airline) => (
          <Checkbox
            key={airline}
            label={airline}
            checked={airlines.includes(airline)}
            onChange={() => onToggleAirline(airline)}
          />
        ))}
      </FilterGroup>
    </aside>
  );
}

export { STOP_OPTIONS, TIME_SLOTS };
