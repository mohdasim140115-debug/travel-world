"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import TourFilterSidebar from "./TourFilterSidebar";
import TourPackageCard from "./TourPackageCard";
import { toCardItem, filterPackages } from "./tourUtils";

/* =========================================================
   GENERIC TOUR LISTING (filters + package cards)
   Filters are REAL: toggling a city/country/package type/
   speciality/duration checkbox or moving the price slider
   actually narrows down the `packages` array below.
========================================================= */

function JoiningLeavingBox({ heading, cities }) {
  return (
    <div className="rounded-[14px] border border-[#0F4C81] bg-[#F7FAFC] p-4">
      <h3 className="mb-2 text-[13px] font-semibold text-[#222]">{heading}</h3>

      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <button
            key={city}
            type="button"
            className="rounded-full border border-[#D1D5DB] bg-white px-3 py-1.5 text-[12px] text-[#555] transition hover:border-[#17BEBB] hover:text-[#0F4C81]"
          >
            {city}
          </button>
        ))}
      </div>

      <p className="mt-3 text-[12px] font-semibold text-[#d21c1c]">
        Can&apos;t find tours from your city? Check our joining &amp; leaving
        option. Book your own flights and join directly at the first
        destination of the tour.
      </p>
    </div>
  );
}

export default function TourListing({ packages, badgeTag, filters = {}, joiningLeaving }) {
  const listingRef = useRef(null);
  const isFirstRender = useRef(true);

  const priceBounds = useMemo(() => {
    if (packages.length === 0) return { min: 0, max: 0 };
    const prices = packages.map((pkg) => pkg.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [packages]);

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedPackageTypes, setSelectedPackageTypes] = useState([]);
  const [selectedSpecialityTours, setSelectedSpecialityTours] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedDepartureCities, setSelectedDepartureCities] = useState([]);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  function handleReset() {
    setSelectedCountries([]);
    setSelectedCities([]);
    setSelectedPackageTypes([]);
    setSelectedSpecialityTours([]);
    setSelectedDurations([]);
    setSelectedDepartureCities([]);
    setMaxPrice(priceBounds.max);
  }

  const effectiveMaxPrice = maxPrice === 0 ? priceBounds.max : maxPrice;

  const filteredPackages = useMemo(
    () =>
      filterPackages(packages, {
        countries: selectedCountries,
        cities: selectedCities,
        packageTypes: selectedPackageTypes,
        specialityTours: selectedSpecialityTours,
        durations: selectedDurations,
        departureCities: selectedDepartureCities,
        maxPrice: effectiveMaxPrice || priceBounds.max,
      }),
    [
      packages,
      selectedCountries,
      selectedCities,
      selectedPackageTypes,
      selectedSpecialityTours,
      selectedDurations,
      selectedDepartureCities,
      effectiveMaxPrice,
      priceBounds.max,
    ]
  );

  // Filtering can shrink the results list a lot, shrinking page height —
  // if the browser was scrolled deep into a long list, it then clamps the
  // scroll position to the new (shorter) page and the user lands on the
  // footer with no warning. Keep the listing in view when filters change.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    listingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [
    selectedCountries,
    selectedCities,
    selectedPackageTypes,
    selectedSpecialityTours,
    selectedDurations,
    selectedDepartureCities,
    effectiveMaxPrice,
  ]);

  const firstHalf = joiningLeaving ? filteredPackages.slice(0, 4) : filteredPackages;
  const secondHalf = joiningLeaving ? filteredPackages.slice(4) : [];

  const sidebarProps = {
    ...filters,
    priceBounds,
    maxPrice: effectiveMaxPrice || priceBounds.max,
    onPriceChange: setMaxPrice,
    selectedCountries,
    onToggleCountry: (value) => toggle(selectedCountries, setSelectedCountries, value),
    selectedCities,
    onToggleCity: (value) => toggle(selectedCities, setSelectedCities, value),
    selectedPackageTypes,
    onTogglePackageType: (value) => toggle(selectedPackageTypes, setSelectedPackageTypes, value),
    selectedSpecialityTours,
    onToggleSpeciality: (value) => toggle(selectedSpecialityTours, setSelectedSpecialityTours, value),
    selectedDurations,
    onToggleDuration: (value) => toggle(selectedDurations, setSelectedDurations, value),
    selectedDepartureCities,
    onToggleDepartureCity: (value) => toggle(selectedDepartureCities, setSelectedDepartureCities, value),
    onReset: handleReset,
  };

  return (
    <div ref={listingRef} className="grid grid-cols-1 gap-7 scroll-mt-24 lg:grid-cols-[260px_minmax(0,1fr)]">
      {/* MOBILE FILTER TOGGLE */}
      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#D1D5DB] bg-white text-[13px] font-semibold text-[#222] transition hover:border-[#17BEBB] hover:text-[#0F4C81] lg:hidden"
      >
        <SlidersHorizontal size={14} />
        Filter Your Tour
      </button>

      {/* DESKTOP SIDEBAR (sticky, scrolls internally if taller than viewport) */}
      <div className="hidden lg:block">
        <div className="lg:sticky lg:top-[80px] lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto">
          <TourFilterSidebar {...sidebarProps} />
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/40 transition-opacity"
          />

          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-[320px] flex-col overflow-y-auto bg-[#f5f5f5] shadow-xl transition-transform duration-300">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-3.5">
              <h3 className="text-[14px] font-semibold">Filter Your Tour</h3>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#333] hover:bg-[#eee]"
              >
                <X size={16} />
              </button>
            </div>

            <TourFilterSidebar {...sidebarProps} />

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="sticky bottom-0 mt-auto h-[44px] w-full rounded-[10px] bg-[#FF7A1A] text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:bg-[#E56A0F]"
            >
              Show {filteredPackages.length} Packages
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredPackages.length === 0 && (
          <div className="col-span-full rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-8 text-center text-[13px] text-[#667085]">
            <p>No packages match the selected filters.</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 rounded-full border border-[#0F4C81] px-4 py-2 text-[12px] font-semibold text-[#0F4C81] transition hover:bg-[#0F4C81] hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        )}

        {firstHalf.map((pkg) => (
          <TourPackageCard
            key={pkg.slug}
            item={toCardItem(pkg, badgeTag)}
          />
        ))}

        {joiningLeaving && filteredPackages.length > 4 && (
          <div className="col-span-full">
            <JoiningLeavingBox
              heading={joiningLeaving.heading}
              cities={joiningLeaving.cities}
            />
          </div>
        )}

        {secondHalf.map((pkg) => (
          <TourPackageCard
            key={pkg.slug}
            item={toCardItem(pkg, badgeTag)}
          />
        ))}
      </div>
    </div>
  );
}
