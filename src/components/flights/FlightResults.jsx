"use client";

import { useMemo, useState } from "react";

import FlightFilters from "./FlightFilters";
import FlightResultCard from "./FlightResultCard";
import FlightBookingModal from "./FlightBookingModal";

function getTimeSlot(departureTime) {
  const hour = Number(departureTime.split(":")[0]);
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 24) return "evening";
  return "night";
}

export default function FlightResults({ route, airlines: airlineLogos = [] }) {
  const { flights, from, to, fromCode, toCode } = route;

  const airlineOptions = useMemo(
    () => Array.from(new Set(flights.map((flight) => flight.airline))),
    [flights]
  );
  const priceBounds = useMemo(() => {
    const prices = flights.map((flight) => flight.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [flights]);

  const [stops, setStops] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedFlight, setSelectedFlight] = useState(null);

  function toggleValue(list, setList, value) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  function handleReset() {
    setStops([]);
    setTimeSlots([]);
    setAirlines([]);
    setMaxPrice(priceBounds.max);
  }

  const filteredFlights = useMemo(() => {
    let result = flights.filter((flight) => {
      if (stops.length > 0 && !stops.includes(flight.stops)) return false;
      if (timeSlots.length > 0 && !timeSlots.includes(getTimeSlot(flight.departureTime))) return false;
      if (airlines.length > 0 && !airlines.includes(flight.airline)) return false;
      if (flight.price > maxPrice) return false;
      return true;
    });

    if (sortBy === "cheapest") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "fastest") {
      result = [...result].sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortBy === "departure") {
      result = [...result].sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }

    return result;
  }, [flights, stops, timeSlots, airlines, maxPrice, sortBy]);

  return (
    <section className="px-3 py-8 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[16px] font-bold text-[#0F172A]">
              {filteredFlights.length} Flight Options
            </h2>
            <p className="text-[13px] text-[#6B7280]">
              {from} ({fromCode}) to {to} ({toCode})
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="h-[40px] rounded-[10px] border border-[#D1D5DB] bg-white px-3 text-[13px] font-medium text-[#0F172A] outline-none transition-colors focus:border-[#17BEBB]"
          >
            <option value="recommended">Sort by: Recommended</option>
            <option value="cheapest">Sort by: Cheapest</option>
            <option value="fastest">Sort by: Fastest</option>
            <option value="departure">Sort by: Departure Time</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <FlightFilters
            airlineOptions={airlineOptions}
            stops={stops}
            onToggleStop={(value) => toggleValue(stops, setStops, value)}
            timeSlots={timeSlots}
            onToggleTimeSlot={(value) => toggleValue(timeSlots, setTimeSlots, value)}
            airlines={airlines}
            onToggleAirline={(value) => toggleValue(airlines, setAirlines, value)}
            maxPrice={maxPrice}
            priceBounds={priceBounds}
            onPriceChange={setMaxPrice}
            onReset={handleReset}
          />

          <div className="space-y-3">
            {filteredFlights.length === 0 && (
              <div className="rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-8 text-center text-[13px] text-[#6B7280]">
                No flights match the selected filters. Try resetting your filters.
              </div>
            )}

            {filteredFlights.map((flight) => (
              <FlightResultCard
                key={flight.id}
                flight={flight}
                from={from}
                to={to}
                airlines={airlineLogos}
                onBookNow={setSelectedFlight}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedFlight && (
        <FlightBookingModal
          flight={selectedFlight}
          from={from}
          to={to}
          onClose={() => setSelectedFlight(null)}
        />
      )}
    </section>
  );
}
