"use client";

import { useState } from "react";
import { CalendarDays, Info, Minus, Phone, Plus } from "lucide-react";
import BookingModal from "./BookingModal";

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
  const [bookingOpen, setBookingOpen] = useState(false);

  const selectedDeparture = tour.departures[selectedIndex] || tour.departures[0];
  const basicPrice = selectedDeparture.price * guests;

  const bookingSummary = {
    slug: tour.slug,
    title: tour.title,
    departureCity: selectedCity,
    departureDate: selectedDeparture.date,
    days: tour.days,
    nights: tour.nights,
    guests,
    totalPrice: basicPrice,
  };

  return (
    <section className="bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
        <h2 className="text-[20px] font-bold text-[#0F172A] sm:text-[26px]">
          Select departure city, date &amp; seats
        </h2>

        <p className="mt-1.5 text-[13px] text-[#64748B] sm:text-[14px]">
          Choose from available departures and continue your booking.
        </p>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
          <div>
            {/* CITY SELECTOR */}
            <div className="flex flex-wrap gap-2">
              {departureCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                    selectedCity === city
                      ? "border-[#0F4C81] bg-[#EEF3FF] text-[#0F4C81]"
                      : "border-[#E5E7EB] bg-white text-[#334155] hover:border-[#0F4C81]"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* GUESTS */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-[13px] font-semibold text-[#334155]">Guests</span>
              <div className="flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-2 py-1">
                <button
                  type="button"
                  onClick={() => setGuests((value) => Math.max(1, value - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#0F4C81]"
                  aria-label="Decrease guests"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-[14px] font-semibold">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((value) => value + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#0F4C81]"
                  aria-label="Increase guests"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* DEPARTURE DATES */}
            <div className="mt-5 space-y-3">
              {tour.departures.map((departure, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={`${departure.date}-${index}`}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    aria-pressed={isSelected}
                    className={`grid w-full gap-3 rounded-[14px] border p-4 text-left transition-colors sm:grid-cols-[1fr_130px_130px] sm:items-center sm:p-5 ${
                      isSelected
                        ? "border-[#0F4C81] bg-[#EEF3FF] shadow-[0_4px_16px_rgba(15,76,129,0.12)]"
                        : "border-[#E5E7EB] bg-white hover:border-[#0F4C81]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                          isSelected ? "bg-[#0F4C81] text-white" : "bg-[#EEF3FF] text-[#0F4C81]"
                        }`}
                      >
                        <CalendarDays size={18} />
                      </div>

                      <div>
                        <p className="text-[14px] font-semibold text-[#0F172A]">{departure.date}</p>
                        <p className="mt-0.5 text-[12px] text-[#64748B]">
                          {tour.days} Days • {tour.nights} Nights • {selectedCity}
                        </p>
                      </div>
                    </div>

                    <div className="self-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[12px] font-semibold ${
                          departure.status === "Available"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {departure.status}
                      </span>
                    </div>

                    <div className="text-right">
                      <strong className="text-[16px] text-[#0F172A]">₹{formatPrice(departure.price)}</strong>

                      {isSelected && (
                        <p className="mt-1 text-[12px] font-semibold text-[#0F4C81]">Selected</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN — only the summary card is sticky, so it never
              inflates the row height beyond the departure list's own size */}
          <aside className="rounded-[16px] border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.06)] sm:p-6 lg:sticky lg:top-[90px] lg:self-start">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#94A3B8]">
              Booking Summary
            </p>

            <div className="mt-4 space-y-2.5 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Departure city</span>
                <strong className="text-[#0F172A]">{selectedCity}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Departure date</span>
                <strong className="text-[#0F172A]">{selectedDeparture.date}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Duration</span>
                <strong className="text-[#0F172A]">
                  {tour.days} Days / {tour.nights} Nights
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Guests</span>
                <strong className="text-[#0F172A]">{guests}</strong>
              </div>
            </div>

            <div className="my-4 border-t border-[#E5E7EB]" />

            <div className="space-y-2.5 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Basic Price</span>
                <strong className="text-[#0F172A]">₹{formatPrice(basicPrice)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Taxes &amp; Fees</span>
                <strong className="text-[#0F172A]">Included</strong>
              </div>
            </div>

            <div className="my-4 border-t border-[#E5E7EB]" />

            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#334155]">Total Price</span>
              <strong className="text-[22px] text-[#0F172A]">₹{formatPrice(basicPrice)}</strong>
            </div>

            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="mt-5 h-[46px] w-full rounded-[10px] bg-[#FF7A1A] text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:-translate-y-0.5 hover:bg-[#E56A0F]"
            >
              Book Online
            </button>

            <button className="mt-2.5 h-[44px] w-full rounded-[10px] border border-[#0F4C81] text-[14px] font-semibold text-[#0F4C81] transition hover:bg-[#F7FAFC]">
              Enquire Now
            </button>
          </aside>
        </div>

        {/* CALLBACK — its own block below the grid, so it never competes
            with the sticky summary for row height */}
        <aside className="mt-6 rounded-[16px] border border-[#E5E7EB] bg-white p-5 sm:p-6 lg:ml-auto lg:w-[360px]">
          <h3 className="text-[15px] font-semibold text-[#0F172A]">Want us to call you?</h3>

          <p className="mt-1 text-[13px] text-[#64748B]">
            Our travel expert will help you plan your trip.
          </p>

          <input
            type="text"
            placeholder="Full Name"
            aria-label="Full Name"
            className="mt-4 h-[46px] w-full rounded-[10px] border border-[#E5E7EB] bg-white px-3 text-[14px] outline-none transition-colors focus:border-[#17BEBB]"
          />

          <div className="mt-2.5 flex h-[46px] rounded-[10px] border border-[#E5E7EB] bg-white focus-within:border-[#17BEBB]">
            <span className="flex items-center border-r border-[#E5E7EB] px-3 text-[13px] text-[#475569]">🇮🇳 +91</span>

            <input
              type="tel"
              placeholder="Mobile Number"
              aria-label="Mobile Number"
              className="min-w-0 flex-1 px-3 text-[14px] outline-none"
            />
          </div>

          <button className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#FF7A1A] text-[14px] font-semibold text-white transition hover:bg-[#E56A0F]">
            <Phone size={14} />
            Request Call Back
          </button>
        </aside>
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

        <button
          type="button"
          onClick={() => setBookingOpen(true)}
          className="flex h-[44px] items-center rounded-[10px] bg-[#FF7A1A] px-6 text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:bg-[#E56A0F]"
        >
          Book Online
        </button>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} summary={bookingSummary} />
    </section>
  );
}
