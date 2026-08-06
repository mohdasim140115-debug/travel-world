"use client";

import { useState } from "react";
import { CalendarDays, Info, Minus, Phone, Plus } from "lucide-react";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN").format(price);
}

/* =========================================================
   DEPARTURE SELECTION + LIVE BOOKING SUMMARY
   Departure city / date / guest count are controlled here so
   the sticky summary on the right reflects the traveller's
   actual selection instead of showing a static price.
========================================================= */

export default function PackageBooking({ tour }) {
  const departureCities = tour.departureCities?.length ? tour.departureCities : ["Mumbai"];
  const [selectedCity, setSelectedCity] = useState(departureCities[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [guests, setGuests] = useState(1);

  const selectedDeparture = tour.departures[selectedIndex] || tour.departures[0];
  const basicPrice = selectedDeparture.price * guests;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div>
            <h2 className="text-[20px] font-semibold">
              Select departure city, dates &amp; add guest to book your tour
            </h2>

            <p className="mt-1 text-[11px] text-[#777]">
              Choose from available departures and continue your booking.
            </p>

            {/* CITY SELECTOR */}
            <div className="mt-4 flex flex-wrap gap-2">
              {departureCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-semibold ${
                    selectedCity === city
                      ? "border-[#0F4C81] bg-[#eef3ff] text-[#0F4C81]"
                      : "border-[#ccc] bg-white text-[#333]"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* GUESTS */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-[10px] font-semibold text-[#333]">Guests</span>
              <div className="flex items-center gap-2 rounded-xl border border-[#ccc] px-2 py-1">
                <button
                  type="button"
                  onClick={() => setGuests((value) => Math.max(1, value - 1))}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-[#ccc] text-[#0F4C81]"
                  aria-label="Decrease guests"
                >
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center text-[11px] font-semibold">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((value) => value + 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-[#ccc] text-[#0F4C81]"
                  aria-label="Increase guests"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* DEPARTURE DATES */}
            <div className="mt-5 overflow-hidden rounded-xl border">
              {tour.departures.map((departure, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={`${departure.date}-${index}`}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`grid w-full gap-3 border-[#0F172A] p-4 text-left last:border-[#0F172A]-0 sm:grid-cols-[1fr_120px_120px] ${
                      isSelected ? "bg-[#F7FAFC]" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          isSelected ? "bg-[#0F4C81] text-white" : "bg-[#edf3ff] text-[#0F4C81]"
                        }`}
                      >
                        <CalendarDays size={17} />
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold">{departure.date}</p>
                        <p className="mt-1 text-[9px] text-[#777]">
                          {tour.days} Days • {tour.nights} Nights • {selectedCity}
                        </p>
                      </div>
                    </div>

                    <div className="self-center">
                      <span
                        className={`rounded-full px-3 py-1 text-[9px] font-semibold ${
                          departure.status === "Available"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {departure.status}
                      </span>
                    </div>

                    <div className="text-right">
                      <strong className="text-[15px]">₹{formatPrice(departure.price)}</strong>

                      {isSelected && (
                        <p className="mt-1 text-[9px] font-semibold text-[#0F4C81]">Selected</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">
            {/* BOOKING SUMMARY */}
            <aside className="self-start rounded-xl border bg-white p-5 shadow-md lg:sticky lg:top-[65px]">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#777]">
                Booking Summary
              </p>

              <div className="mt-4 space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#777]">Departure city</span>
                  <strong>{selectedCity}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Departure date</span>
                  <strong>{selectedDeparture.date}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Duration</span>
                  <strong>
                    {tour.days} Days / {tour.nights} Nights
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Guests</span>
                  <strong>{guests}</strong>
                </div>
              </div>

              <div className="my-4 border-t" />

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#777]">Basic Price</span>
                  <strong>₹{formatPrice(basicPrice)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Taxes &amp; Fees</span>
                  <strong>Included</strong>
                </div>
              </div>

              <div className="my-4 border-t" />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#333]">Total Price</span>
                <strong className="text-[19px] text-[#111]">₹{formatPrice(basicPrice)}</strong>
              </div>

              <button className="mt-5 h-[40px] w-full bg-[#FF7A1A] text-[11px] font-semibold text-white transition hover:bg-[#E56A0F]">
                Book Online
              </button>

              <button className="mt-2 h-[38px] w-full border border-[#0F4C81] text-[11px] font-semibold text-[#0F4C81]">
                Enquire Now
              </button>
            </aside>

            {/* CALLBACK */}
            <aside className="self-start rounded-xl border bg-[#f7f9ff] p-5">
              <h3 className="text-[15px] font-semibold">Want us to call you?</h3>

              <p className="mt-1 text-[10px] text-[#777]">
                Our travel expert will help you plan your trip.
              </p>

              <input
                type="text"
                placeholder="Full Name"
                className="mt-4 h-[44px] w-full rounded-[6px] border bg-white px-3 text-[13px] outline-none sm:h-[38px] sm:rounded-none sm:text-[11px]"
              />

              <div className="mt-2 flex h-[44px] rounded-[6px] border bg-white sm:h-[38px] sm:rounded-none">
                <span className="flex items-center border-r px-3 text-[11px] sm:text-[10px]">🇮🇳 +91</span>

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="min-w-0 flex-1 px-3 text-[13px] outline-none sm:text-[11px]"
                />
              </div>

              <button className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#FF7A1A] text-[13px] font-semibold text-white transition hover:bg-[#E56A0F] sm:h-[40px] sm:rounded-none sm:text-[11px]">
                <Phone size={14} />
                Request Call Back
              </button>
            </aside>
          </div>
        </div>
      </div>

      {/* MOBILE: sticky bottom price bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-[#E5E7EB] bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <div>
          <p className="text-[10px] text-[#777]">
            Starting price per person{" "}
            <Info size={11} className="inline align-text-top text-[#999]" />
          </p>
          <p className="text-[16px] font-bold text-[#0F172A]">₹{formatPrice(basicPrice)}</p>
        </div>

        <button className="flex h-[44px] items-center rounded-[8px] bg-[#FF7A1A] px-6 text-[13px] font-semibold text-white transition hover:bg-[#E56A0F]">
          Book Online
        </button>
      </div>
    </section>
  );
}
