
"use client";

import Link from "next/link";

import {
  CalendarDays,
  ChevronDown,
  Heart,
  Search,
} from "lucide-react";

/* =========================================================
   PACKAGE DATA
========================================================= */

const packages = [
  {
    slug: "delhi-agra-tour-package",
    title: "Delhi Agra",
    image: "/window.svg",
    tags: ["GROUP TOUR", "SALE", "Short Trips"],
    days: "5 Days",
    cities: "5 Cities",
    dates: "9 Dates",
    price: "₹28,000",
    emi: "₹2,776/month",
    highlights: "Fatehpur Sikri, Taj Mahal, Mathura, Agra Fort",
  },

  {
    slug: "jaipur-mandawa-tour-package",
    title: "Jaipur Mandawa",
    image: "/globe.svg",
    tags: ["GROUP TOUR", "SALE", "Family"],
    days: "4 Days",
    cities: "3 Cities",
    dates: "2 Dates",
    price: "₹30,000",
    emi: "₹2,921/month",
    highlights:
      "Mandawa Fort, Mandawa Haveli, Podar Haveli Museum",
  },

  {
    slug: "delhi-agra-short-tour",
    title: "Delhi Agra",
    image: "/window.svg",
    tags: ["GROUP TOUR", "SALE", "Short Trips"],
    days: "4 Days",
    cities: "3 Cities",
    dates: "5 Dates",
    price: "₹31,000",
    emi: "₹3,018/month",
    highlights:
      "Raj Ghat, Lotus Temple, Qutub Minar, Red Fort",
  },

  {
    slug: "womens-special-mathura-vrindavan-gokul-govardhan",
    title: "Women's Special Mathura Vrindavan Gokul Govardhan",
    image: "/globe.svg",
    tags: ["GROUP TOUR", "SALE", "Women's Special"],
    days: "4 Days",
    cities: "4 Cities",
    dates: "2 Dates",
    price: "₹31,000",
    emi: "₹3,018/month",
    highlights:
      "Govardhan Hill, Barsana cable car, Radha Rani Temple",
  },

  {
    slug: "mathura-vrindavan-gokul-govardhan",
    title: "Mathura Vrindavan Gokul Govardhan",
    image: "/window.svg",
    tags: ["GROUP TOUR", "SALE", "Family"],
    days: "4 Days",
    cities: "4 Cities",
    dates: "13 Dates",
    price: "₹31,000",
    emi: "₹3,018/month",
    highlights:
      "Govardhan Hill, Barsana cable car, Radha Rani Temple",
  },

  {
    slug: "ayodhya-lucknow-tour-package",
    title: "Ayodhya Lucknow",
    image: "/window.svg",
    tags: ["GROUP TOUR", "SALE", "Short Trips"],
    days: "5 Days",
    cities: "2 Cities",
    dates: "7 Dates",
    price: "₹34,000",
    emi: "₹3,311/month",
    highlights:
      "Ambedkar Park, Rumi Darwaza, Bada Imambara, British Residency",
  },

  {
    slug: "best-of-shimla",
    title: "Best of Shimla",
    image: "/globe.svg",
    tags: ["GROUP TOUR", "SALE", "Short Trips"],
    days: "5 Days",
    cities: "4 Cities",
    dates: "1 Date",
    price: "₹35,000",
    emi: "₹3,408/month",
    highlights:
      "Shimla Mall Road, Chail Palace, Kali Ka Tibba, Kufri Hills",
  },

  {
    slug: "jaipur-udaipur-tour-package",
    title: "Jaipur Udaipur",
    image: "/window.svg",
    tags: ["GROUP TOUR", "SALE", "Family"],
    days: "5 Days",
    cities: "2 Cities",
    dates: "5 Dates",
    price: "₹35,000",
    emi: "₹3,408/month",
    highlights:
      "Hawa Mahal, Jantar Mantar, City Palace, Panna Meena Ka Kund",
  },
];

/* =========================================================
   FILTER DATA
========================================================= */

const departureCities = [
  "Joining / Leaving (138)",
  "Pune (7)",
  "Mumbai (136)",
  "Agartala (2)",
  "Port Blair (3)",
  "Srinagar (4)",
  "Jodhpur (4)",
  "Cochin (4)",
  "Amritsar (4)",
  "Thiruvananthapuram (5)",
  "Indore (3)",
  "Bhubaneswar (5)",
  "Bagdogra (5)",
  "Chandigarh (5)",
  "Leh (7)",
  "Jaipur (1)",
];

const cities = [
  "Delhi (25)",
  "Jaipur (31)",
  "Udaipur (22)",
  "Ahmedabad (20)",
  "Guwahati (17)",
  "Ayodhya (16)",
  "Agra (15)",
  "Munnar (15)",
  "Shillong (15)",
  "Varanasi (16)",
];

/* =========================================================
   FILTER GROUP
========================================================= */

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-[#dedede] px-3 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-[12px] font-semibold text-[#222]">
          {title}
        </h4>

        <ChevronDown size={14} />
      </div>

      {children}
    </div>
  );
}

/* =========================================================
   CHECKBOX
========================================================= */

function Checkbox({ label }) {
  return (
    <label className="mb-2 flex cursor-pointer items-center gap-2 text-[11px] text-[#333]">
      <input
        type="checkbox"
        className="h-[12px] w-[12px] accent-[#008C95]"
      />

      <span>{label}</span>
    </label>
  );
}

/* =========================================================
   PACKAGE CARD
========================================================= */

function PackageCard({ item }) {
  return (
    <div className="relative">
      {/* =================================================
          MAIN CLICKABLE CARD
      ================================================= */}

      <Link
        href={`/package/${item.slug}`}
        className="group block no-underline"
      >
        <article className="grid min-h-[190px] cursor-pointer grid-cols-[220px_minmax(0,1fr)_220px] gap-3 rounded-[8px] border border-[#cfd4dc] bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#20B8B5] hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)]">

          {/* =============================================
              IMAGE
          ============================================= */}

          <div className="relative overflow-hidden rounded-[6px] bg-gradient-to-br from-[#b7d7eb] via-[#e8d9b5] to-[#98b1c7]">
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[13px] font-semibold text-[#31465a]">
              {item.title}
            </div>
          </div>

          {/* =============================================
              CONTENT
          ============================================= */}

          <div className="min-w-0 py-1">

            {/* TAGS */}

            <div className="mb-2 flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={`border px-1.5 py-[2px] text-[8px] font-semibold ${
                    tag.includes("GROUP")
                      ? "border-[#20B8B5] bg-[#EFF9F8] text-[#008C95]"
                      : tag.includes("SALE")
                      ? "border-red-400 bg-red-50 text-red-600"
                      : "border-pink-400 bg-pink-50 text-pink-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* TITLE */}

            <h3 className="text-[17px] font-semibold text-[#1e1e1e] transition-colors group-hover:text-[#008C95]">
              {item.title}
            </h3>

            {/* ALL INCLUSIVE */}

            <span className="mt-2 inline-block text-[13px] font-semibold underline">
              ∞ All Inclusive
            </span>

            {/* DAYS / CITIES / DATES */}

            <div className="mt-8 flex items-center gap-2 text-[13px] font-medium text-[#222]">
              <span>{item.days}</span>

              <span className="text-[#aaa]">
                •
              </span>

              <span className="underline">
                {item.cities}
              </span>

              <span className="text-[#aaa]">
                •
              </span>

              <span className="underline">
                {item.dates} ›
              </span>
            </div>

            {/* HIGHLIGHTS */}

            <div className="mt-3 border-t border-[#ddd] pt-2">
              <p className="text-[12px] font-semibold text-[#56a33b]">
                Tour Highlights
              </p>

              <div className="mt-1 flex min-w-0 items-center">
                <p className="truncate text-[13px] text-[#444]">
                  {item.highlights}
                </p>

                <span className="ml-1 shrink-0 text-[12px] font-semibold underline">
                  More
                </span>
              </div>
            </div>
          </div>

          {/* =============================================
              PRICE
          ============================================= */}

          <div className="flex flex-col rounded-[7px] border border-[#20B8B5] bg-[#EFF9F8] p-3 text-center">

            <p className="mt-3 text-[12px] text-[#777]">
              Starting price per person
            </p>

            <strong className="mt-1 text-[24px] leading-none text-[#183B3D]">
              {item.price}
            </strong>

            <p className="mt-2 text-[12px]">
              EMI from{" "}
              <span className="font-semibold underline">
                {item.emi}
              </span>
            </p>

            {/* VIEW DETAILS */}

            <div className="mt-auto flex h-[40px] w-full items-center justify-center rounded-[3px] bg-[#FF7A3D] text-[14px] font-semibold text-white transition-colors group-hover:bg-[#EA642C]">
              View Details
            </div>

            {/* space for bottom actions */}

            <div className="mt-3 h-[18px]" />
          </div>
        </article>
      </Link>

      {/* =================================================
          HEART BUTTON
          Link ke bahar hai so card open nahi karega
      ================================================= */}

      <button
        type="button"
        aria-label={`Save ${item.title}`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        className="absolute left-[196px] top-[20px] z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#26394b]/70 text-white transition hover:bg-[#26394b]"
      >
        <Heart size={14} />
      </button>

      {/* =================================================
          COMPARE / ENQUIRE
      ================================================= */}

      <div className="absolute bottom-[22px] right-[25px] z-20 flex w-[190px] justify-between text-[9px]">
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          className="underline hover:text-[#008C95]"
        >
          Compare
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          className="underline hover:text-[#008C95]"
        >
          Enquire Now
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   JOINING / LEAVING BOX
========================================================= */

function JoiningLeavingBox() {
  const options = [
    "7 tours from Pune",
    "136 tours from Mumbai",
    "2 tours joining & leaving from Agartala",
    "3 tours joining & leaving from Port Blair",
    "4 tours joining & leaving from Srinagar",
    "4 tours joining & leaving from Jodhpur",
    "4 tours joining & leaving from Cochin",
    "4 tours joining & leaving from Amritsar",
    "5 tours joining & leaving from Thiruvananthapuram",
    "5 tours joining & leaving from Indore",
    "5 tours joining & leaving from Bhubaneswar",
    "5 tours joining & leaving from Bagdogra",
    "6 tours joining & leaving from Chandigarh",
    "7 tours joining & leaving from Leh",
    "1 tour joining & leaving from Jaipur",
  ];

  return (
    <div className="rounded-[8px] border-2 border-[#008C95] bg-[#EFF9F8] p-3">
      <h3 className="mb-2 text-[12px] font-semibold text-[#222]">
        View India Tour Packages
      </h3>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className="rounded-full border border-[#b9c0ca] bg-white px-3 py-1 text-[9px] text-[#555] hover:border-[#20B8B5]"
          >
            {option}
          </button>
        ))}
      </div>

      <p className="mt-3 text-[9px] font-semibold text-[#d21c1c]">
        Can&apos;t find tours from your city? Check our joining & leaving
        option. Book your own flights and join directly at the first
        destination of the tour.
      </p>
    </div>
  );
}

/* =========================================================
   MAIN LISTING
========================================================= */

export default function IndiaTourListing() {
  return (
    <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-7">

      {/* =================================================
          LEFT FILTERS
      ================================================= */}

      <aside className="self-start border border-[#d6d6d6] bg-white">

        {/* FILTER HEADER */}

        <div className="flex items-center justify-between border-b border-[#ddd] px-3 py-3">
          <h3 className="text-[13px] font-semibold">
            ☷ Filter Your Tour
          </h3>

          <button
            type="button"
            className="text-[9px] underline"
          >
            Reset
          </button>
        </div>

        {/* PRICE */}

        <FilterGroup title="Price Range">
          <div className="px-1">

            <input
              type="range"
              min="9000"
              max="365000"
              defaultValue="365000"
              className="w-full accent-[#008C95]"
            />

            <div className="mt-1 flex justify-between text-[8px]">
              <span>₹9,000</span>
              <span>₹3,65,000</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                "₹9,000 - ₹80,000",
                "₹80,000 - ₹1.6L",
                "₹1.6L - ₹2.4L",
                "₹2.4L above",
              ].map((price) => (
                <button
                  key={price}
                  type="button"
                  className="border border-[#ccc] bg-white px-1 py-2 text-[8px]"
                >
                  {price}
                </button>
              ))}
            </div>
          </div>
        </FilterGroup>

        {/* DEPARTURE CITY */}

        <FilterGroup title="Departure City">
          {departureCities.map((city) => (
            <Checkbox
              key={city}
              label={city}
            />
          ))}
        </FilterGroup>

        {/* COUNTRIES */}

        <FilterGroup title="Countries">
          <div className="relative mb-3">

            <input
              type="text"
              placeholder="Search"
              className="h-[30px] w-full border border-[#777] px-2 pr-7 text-[10px] outline-none"
            />

            <Search
              size={13}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            />
          </div>

          <Checkbox label="India (264)" />
          <Checkbox label="Nepal (1)" />
        </FilterGroup>

        {/* CITIES */}

        <FilterGroup title="Cities">
          <div className="relative mb-3">

            <input
              type="text"
              placeholder="Search"
              className="h-[30px] w-full border border-[#777] px-2 pr-7 text-[10px] outline-none"
            />

            <Search
              size={13}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            />
          </div>

          {cities.map((city) => (
            <Checkbox
              key={city}
              label={city}
            />
          ))}

          <button
            type="button"
            className="mt-1 text-[9px] underline"
          >
            View 287 More ›
          </button>
        </FilterGroup>

        {/* DEPART BETWEEN */}

        <FilterGroup title="Depart Between">
          <div className="space-y-2">

            <div className="relative">
              <input
                type="text"
                placeholder="Start Date"
                className="h-[32px] w-full border border-[#777] px-2 text-[9px]"
              />

              <CalendarDays
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="End Date"
                className="h-[32px] w-full border border-[#777] px-2 text-[9px]"
              />

              <CalendarDays
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              />
            </div>

          </div>
        </FilterGroup>

        {/* DURATION */}

        <FilterGroup title="Tour Duration">
          <div className="grid grid-cols-2 gap-2">

            {[
              "3 - 15 Days",
              "15 - 27 Days",
              "27 - 39 Days",
              "39 - 50 Days",
            ].map((duration) => (
              <button
                key={duration}
                type="button"
                className="border border-[#ccc] px-1 py-2 text-[8px]"
              >
                {duration}
              </button>
            ))}

          </div>
        </FilterGroup>

        {/* PACKAGE TYPE */}

        <FilterGroup title="Package Type">
          <Checkbox label="All (264)" />
          <Checkbox label="Group Tour (142)" />
          <Checkbox label="Customized Holidays (97)" />
          <Checkbox label="Inbound (25)" />
        </FilterGroup>

        {/* SPECIALITY */}

        <FilterGroup title="Speciality Tour">
          <Checkbox label="Family (78)" />
          <Checkbox label="Customized Holidays (71)" />
          <Checkbox label="Women's Special (27)" />
          <Checkbox label="Inbound (25)" />
          <Checkbox label="Fixed Date Holiday (17)" />
          <Checkbox label="Seniors' Special (17)" />
          <Checkbox label="Short Trips (10)" />
          <Checkbox label="Road Trips (7)" />
          <Checkbox label="Honeymoon Special (2)" />
        </FilterGroup>

      </aside>

      {/* =================================================
          RIGHT PACKAGE LIST
      ================================================= */}

      <div className="space-y-3">

        {/* FIRST 4 */}

        {packages.slice(0, 4).map((item) => (
          <PackageCard
            key={item.slug}
            item={item}
          />
        ))}

        {/* JOINING / LEAVING */}

        <JoiningLeavingBox />

        {/* REMAINING PACKAGES */}

        {packages.slice(4).map((item) => (
          <PackageCard
            key={item.slug}
            item={item}
          />
        ))}

      </div>
    </div>
  );
}