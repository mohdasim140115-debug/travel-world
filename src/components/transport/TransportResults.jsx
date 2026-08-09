"use client";

import { useMemo, useState } from "react";
import TransportFilters from "./TransportFilters";
import TransportOptionCard from "./TransportOptionCard";
import TransportBookingModal from "./TransportBookingModal";

function perDayPrice(option, route) {
  return route ? option.basePrice + option.pricePerKm * route.distanceKm : option.basePrice;
}

export default function TransportResults({ options, route }) {
  const [selected, setSelected] = useState(null);
  const [types, setTypes] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const vehicleNames = useMemo(() => options.map((option) => option.name), [options]);

  const priceBounds = useMemo(() => {
    const prices = options.map((option) => perDayPrice(option, route));
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [options, route]);

  const [maxPrice, setMaxPrice] = useState(priceBounds.max);

  function toggleType(value) {
    setTypes((list) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]));
  }

  function toggleVehicle(value) {
    setSelectedVehicles((list) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]));
  }

  function handleReset() {
    setTypes([]);
    setSelectedVehicles([]);
    setMaxPrice(priceBounds.max);
  }

  const filteredOptions = options.filter((option) => {
    const price = perDayPrice(option, route);
    if (types.length > 0 && !types.includes(option.type)) return false;
    if (selectedVehicles.length > 0 && !selectedVehicles.includes(option.name)) return false;
    if (price > (maxPrice || priceBounds.max)) return false;
    return true;
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <TransportFilters
          types={types}
          onToggleType={toggleType}
          vehicleNames={vehicleNames}
          selectedVehicles={selectedVehicles}
          onToggleVehicle={toggleVehicle}
          maxPrice={maxPrice || priceBounds.max}
          priceBounds={priceBounds}
          onPriceChange={setMaxPrice}
          onReset={handleReset}
        />

        <div className="space-y-3">
          {filteredOptions.length === 0 && (
            <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-8 text-center text-[13px] text-[#6B7280]">
              No vehicles match the selected filters. Try resetting your filters.
            </div>
          )}

          {filteredOptions.map((option) => (
            <TransportOptionCard key={option.id} option={option} route={route} onBookNow={setSelected} />
          ))}
        </div>
      </div>

      <TransportBookingModal option={selected} onClose={() => setSelected(null)} />
    </>
  );
}
