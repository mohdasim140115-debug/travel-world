"use client";

import { useMemo, useState } from "react";
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
    <div className="rounded-[8px] border-2 border-[#008C95] bg-[#EFF9F8] p-3">
      <h3 className="mb-2 text-[12px] font-semibold text-[#222]">{heading}</h3>

      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <button
            key={city}
            type="button"
            className="rounded-full border border-[#b9c0ca] bg-white px-3 py-1 text-[9px] text-[#555] hover:border-[#20B8B5]"
          >
            {city}
          </button>
        ))}
      </div>

      <p className="mt-3 text-[9px] font-semibold text-[#d21c1c]">
        Can&apos;t find tours from your city? Check our joining &amp; leaving
        option. Book your own flights and join directly at the first
        destination of the tour.
      </p>
    </div>
  );
}

export default function TourListing({ packages, badgeTag, filters = {}, joiningLeaving }) {
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
        maxPrice: effectiveMaxPrice || priceBounds.max,
      }),
    [packages, selectedCountries, selectedCities, selectedPackageTypes, selectedSpecialityTours, selectedDurations, effectiveMaxPrice, priceBounds.max]
  );

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
    onReset: handleReset,
  };

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">
      {/* MOBILE FILTER TOGGLE */}
      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="flex h-[42px] w-full items-center justify-center gap-2 rounded-[6px] border border-[#d6d6d6] bg-white text-[12px] font-semibold text-[#222] transition hover:border-[#20B8B5] hover:text-[#008C95] lg:hidden"
      >
        <SlidersHorizontal size={14} />
        Filter Your Tour
      </button>

      {/* DESKTOP SIDEBAR (sticky) */}
      <div className="hidden lg:block">
        <div className="lg:sticky lg:top-[80px]">
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
            <div className="flex items-center justify-between border-[#183B3D] bg-white px-3 py-3">
              <h3 className="text-[13px] font-semibold">Filter Your Tour</h3>
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
              className="sticky bottom-0 mt-auto h-[44px] w-full bg-[#FF7A3D] text-[12px] font-semibold text-white"
            >
              Show {filteredPackages.length} Packages
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredPackages.length === 0 && (
          <div className="col-span-full rounded-[8px] border border-dashed border-[#cbd1da] bg-white p-8 text-center text-[12px] text-[#667085]">
            <p>No packages match the selected filters.</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 rounded-full border border-[#008C95] px-4 py-2 text-[11px] font-semibold text-[#008C95] transition hover:bg-[#008C95] hover:text-white"
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
