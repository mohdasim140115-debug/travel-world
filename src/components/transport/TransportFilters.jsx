"use client";

const TYPE_OPTIONS = ["Car", "Bus"];

function TogglePill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[10px] border px-3 py-2 text-left text-[13px] font-medium transition ${
        active
          ? "border-[#0F4C81] bg-[#eef3ff] text-[#0F4C81]"
          : "border-[#D1D5DB] bg-white text-[#374151] hover:border-[#17BEBB]"
      }`}
    >
      {label}
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

export default function TransportFilters({
  types,
  onToggleType,
  vehicleNames = [],
  selectedVehicles = [],
  onToggleVehicle,
  maxPrice,
  priceBounds,
  onPriceChange,
  onReset,
}) {
  return (
    <aside className="self-start overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#F7FAFC] px-4 py-3.5">
        <h3 className="text-[14px] font-semibold text-[#0F172A]">Filter Transport</h3>
        <button type="button" onClick={onReset} className="text-[12px] font-semibold text-[#0F4C81] underline">
          Reset
        </button>
      </div>

      <div className="border-b border-[#E5E7EB] px-4 py-4">
        <h4 className="mb-3 text-[13px] font-semibold text-[#0F172A]">Vehicle Type</h4>
        <div className="space-y-2">
          {TYPE_OPTIONS.map((type) => (
            <TogglePill key={type} label={type} active={types.includes(type)} onClick={() => onToggleType(type)} />
          ))}
        </div>
      </div>

      {vehicleNames.length > 0 && (
        <div className="border-b border-[#E5E7EB] px-4 py-4">
          <h4 className="mb-3 text-[13px] font-semibold text-[#0F172A]">Vehicle</h4>
          {vehicleNames.map((name) => (
            <Checkbox
              key={name}
              label={name}
              checked={selectedVehicles.includes(name)}
              onChange={() => onToggleVehicle(name)}
            />
          ))}
        </div>
      )}

      <div className="px-4 py-4">
        <h4 className="mb-3 text-[13px] font-semibold text-[#0F172A]">Price Range</h4>
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
      </div>
    </aside>
  );
}
