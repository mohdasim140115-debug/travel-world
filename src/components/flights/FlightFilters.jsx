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
    <div className="border-b border-[#E5E7EB] px-4 py-4">
      <h4 className="mb-3 text-[13px] font-semibold text-[#0F172A]">{title}</h4>
      {children}
    </div>
  );
}

function TogglePill({ label, hint, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-[10px] border px-3 py-2 text-left text-[13px] font-medium transition ${
        active
          ? "border-[#0F4C81] bg-[#eef3ff] text-[#0F4C81]"
          : "border-[#D1D5DB] bg-white text-[#374151] hover:border-[#17BEBB]"
      }`}
    >
      {label}
      {hint && <span className="text-[12px] font-normal text-[#9CA3AF]">{hint}</span>}
    </button>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="mb-2 flex cursor-pointer items-center gap-2 text-[13px] text-[#374151]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-[14px] w-[14px] accent-[#0F4C81]"
      />
      {label}
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
  showHeader = true,
}) {
  return (
    <aside
      className={
        showHeader
          ? "self-start overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          : "self-start bg-white"
      }
    >
      {showHeader && (
        <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#F7FAFC] px-4 py-3.5">
          <h3 className="text-[14px] font-semibold text-[#0F172A]">Filter your Flight</h3>
          <button type="button" onClick={onReset} className="text-[12px] font-semibold text-[#0F4C81] underline">
            Reset
          </button>
        </div>
      )}

      <FilterGroup title="Stops">
        <div className="space-y-2">
          {STOP_OPTIONS.map((option) => (
            <TogglePill
              key={option.value}
              label={option.label}
              active={stops.includes(option.value)}
              onClick={() => onToggleStop(option.value)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price Range">
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          value={maxPrice}
          onChange={(event) => onPriceChange(Number(event.target.value))}
          className="w-full accent-[#0F4C81]"
        />
        <div className="mt-1 flex justify-between text-[12px] text-[#6B7280]">
          <span>₹{priceBounds.min.toLocaleString("en-IN")}</span>
          <span>Up to ₹{maxPrice.toLocaleString("en-IN")}</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Departure Time">
        <div className="space-y-2">
          {TIME_SLOTS.map((slot) => (
            <TogglePill
              key={slot.value}
              label={slot.label}
              hint={slot.hint}
              active={timeSlots.includes(slot.value)}
              onClick={() => onToggleTimeSlot(slot.value)}
            />
          ))}
        </div>
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
