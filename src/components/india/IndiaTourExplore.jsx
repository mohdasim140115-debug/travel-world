

    "use client";

    import Link from "next/link";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Globe2,
  ArrowRight,
} from "lucide-react";

/* =====================================================
   DATA
===================================================== */

const cityData = {
  city: [
    { name: "Jaipur", tours: "31 tours", style: "from-orange-300 via-rose-500 to-orange-900" },
    { name: "Munnar", tours: "15 tours", style: "from-green-300 via-green-600 to-emerald-900" },
    { name: "Shimla", tours: "15 tours", style: "from-slate-300 via-slate-500 to-slate-900" },
    { name: "Darjeeling", tours: "11 tours", style: "from-lime-300 via-green-500 to-green-900" },
    { name: "Varanasi", tours: "16 tours", style: "from-orange-300 via-orange-600 to-stone-900" },
    { name: "Mysore", tours: "11 tours", style: "from-teal-200 via-stone-400 to-slate-800" },
  ],

  state: [
    { name: "Rajasthan", tours: "32 tours", style: "from-orange-300 via-rose-500 to-red-900" },
    { name: "Kerala", tours: "17 tours", style: "from-green-300 via-emerald-600 to-green-900" },
    { name: "Himachal Pradesh", tours: "11 tours", style: "from-blue-200 via-slate-500 to-blue-900" },
    { name: "Gujarat", tours: "17 tours", style: "from-teal-300 via-orange-500 to-red-900" },
    { name: "Uttar Pradesh", tours: "24 tours", style: "from-orange-200 via-stone-500 to-slate-900" },
    { name: "Maharashtra", tours: "28 tours", style: "from-green-300 via-slate-600 to-slate-900" },
  ],
};

const seasonData = {
  "March to June": [
    { name: "Srinagar", tours: "4 tours", style: "from-blue-300 via-emerald-500 to-green-900" },
    { name: "Dharamshala", tours: "8 tours", style: "from-slate-300 via-stone-500 to-slate-900" },
    { name: "Sikkim Darjeeling", tours: "14 tours", style: "from-blue-200 via-slate-500 to-blue-900" },
    { name: "Gangtok", tours: "10 tours", style: "from-orange-200 via-green-500 to-slate-900" },
    { name: "Shimla", tours: "15 tours", style: "from-slate-200 via-slate-600 to-slate-900" },
    { name: "Dalhousie", tours: "7 tours", style: "from-blue-200 via-emerald-600 to-slate-900" },
  ],

  "July to October": [
    { name: "Ladakh", tours: "14 tours", style: "from-blue-300 via-indigo-400 to-stone-900" },
    { name: "Kerala", tours: "17 tours", style: "from-green-300 via-emerald-500 to-green-900" },
    { name: "Udaipur", tours: "22 tours", style: "from-blue-200 via-orange-400 to-slate-900" },
    { name: "Coorg", tours: "9 tours", style: "from-green-200 via-green-600 to-slate-900" },
    { name: "Meghalaya", tours: "12 tours", style: "from-cyan-200 via-green-500 to-slate-900" },
    { name: "Goa", tours: "10 tours", style: "from-sky-200 via-cyan-500 to-blue-900" },
  ],

  "November to February": [
    { name: "Jaipur", tours: "31 tours", style: "from-orange-200 via-orange-500 to-red-900" },
    { name: "Jaisalmer", tours: "10 tours", style: "from-teal-200 via-rose-600 to-orange-900" },
    { name: "Rann of Kutch", tours: "8 tours", style: "from-slate-100 via-slate-400 to-slate-800" },
    { name: "Andaman", tours: "9 tours", style: "from-cyan-200 via-blue-500 to-blue-900" },
    { name: "Varanasi", tours: "16 tours", style: "from-orange-200 via-orange-500 to-stone-900" },
    { name: "Rajasthan", tours: "32 tours", style: "from-teal-200 via-red-500 to-red-900" },
  ],
};

const interestTours = [
  {
    title: "Women's Special Delhi Agra",
    slug: "womens-special-delhi-agra",
    tag: "Women's Special",
    days: "5 Days",
    cities: "5 Cities",
    price: "₹34,000",
    emi: "₹3,311",
  },
  {
    title: "Honeymoon Special Kashmir",
    slug: "jammu-kashmir-tour-packages",
    isDestinationLink: true,
    tag: "Honeymoon Special",
    days: "6 Days",
    cities: "5 Cities",
    price: "₹51,000",
    emi: "₹4,963",
  },
];


const durationPackages = [
  {
    title: "Women's Special Delhi Agra",
    slug: "womens-special-delhi-agra",
    category: "Women's Special",
    days: 4,
    cities: 3,
    price: "34,000",
  },
  {
    title: "Best of Shimla",
    slug: "best-of-shimla",
    category: "Short Trips",
    days: 5,
    cities: 4,
    price: "35,000",
  },
  {
    title: "Jaipur Mandawa",
    slug: "jaipur-mandawa-tour-package",
    category: "Family",
    days: 4,
    cities: 3,
    price: "30,000",
  },
  {
    title: "Jaipur Udaipur",
    slug: "jaipur-udaipur-tour-package",
    category: "Family",
    days: 5,
    cities: 2,
    price: "35,000",
  },
];

const blogs = [
  {
    title: "Best places to visit in India",
    style: "from-blue-200 via-green-500 to-slate-800",
  },
  {
    title: "Rajasthan",
    style: "from-orange-200 via-orange-600 to-red-900",
  },
  {
    title: "Varanasi Travel Guide",
    style: "from-orange-200 via-red-500 to-blue-900",
  },
  {
    title: "Travel Stories",
    style: "from-blue-200 via-slate-500 to-slate-900",
  },
  {
    title: "The Greatest Travel Film Ever Made",
    style: "from-cyan-200 via-blue-500 to-blue-900",
  },
];

/* =====================================================
   COMMON TITLE
===================================================== */

function SectionTitle({ children }) {
  return (
    <div className="text-center">
      <h2 className="text-[18px] font-medium text-[#222]">
        {children}
      </h2>

      <div className="mx-auto mt-2 h-[2px] w-[65px] bg-[#008C95]" />
    </div>
  );
}

/* =====================================================
   DESTINATION CARD
===================================================== */

function slugifyDestination(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "");
}

function DestinationCard({ item }) {
  return (
    <Link
      href={`/india/${slugifyDestination(item.name)}-tour-packages`}
      className={`group relative block h-[230px] overflow-hidden rounded-[5px] bg-gradient-to-br no-underline ${item.style}`}
    >
      <div className="absolute -bottom-10 -left-8 h-28 w-40 rotate-12 rounded-full bg-black/10" />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-3 pt-14 text-left">
        <h3 className="text-[14px] font-semibold text-white group-hover:underline">
          {item.name}
        </h3>

        <p className="mt-1 text-[11px] text-white/90">
          {item.tours}
        </p>
      </div>
    </Link>
  );
}

/* =====================================================
   SMALL TOUR CARD
===================================================== */

function SmallTourCard({ item }) {
  const href = item.isDestinationLink ? `/india/${item.slug}` : `/package/${item.slug}`;

  return (
    <Link
      href={href}
      className="group block w-[270px] shrink-0 rounded-[8px] border border-[#bcc8db] bg-white p-2 no-underline transition hover:border-[#20B8B5] hover:shadow-md"
    >

      <div className="h-[150px] rounded-[6px] bg-gradient-to-br from-sky-200 via-orange-200 to-slate-500" />

      <div className="mt-2">
        <span className="inline-block border border-[#20B8B5] bg-[#EFF9F8] px-1 py-[1px] text-[7px] font-semibold text-[#008C95]">
          GROUP TOUR
        </span>

        <span className="ml-1 inline-block border border-pink-400 bg-pink-50 px-1 py-[1px] text-[7px] text-pink-600">
          {item.tag}
        </span>

        <h3 className="mt-2 min-h-[36px] text-[12px] font-semibold leading-[1.3]">
          {item.title}
        </h3>

        <span className="mt-1 block text-[9px] underline">
          ∞ All Inclusive
        </span>

        <div className="mt-3 flex gap-2 text-[8px]">
          <span>{item.days}</span>
          <span>•</span>
          <span className="underline">{item.cities}</span>
        </div>

        <div className="mt-3 grid grid-cols-[1fr_72px] items-end gap-2 border-t pt-2">
          <div>
            <p className="text-[7px] text-[#777]">
              Starting price
            </p>

            <strong className="text-[13px]">
              {item.price}
            </strong>
          </div>

          <span className="flex h-[28px] items-center justify-center rounded-[2px] bg-[#FF7A3D] text-[8px] font-semibold text-white transition-colors group-hover:bg-[#EA642C]">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function IndiaTourExplore() {
  const [cityTab, setCityTab] = useState("city");
  const [season, setSeason] = useState("March to June");
  const [interest, setInterest] = useState("Honeymoon Special");
  const [duration, setDuration] = useState("Less than 5 days");

  return (
    <div>

      {/* =================================================
          CITY & STATES
      ================================================= */}

      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">

          <SectionTitle>
            India Tour Packages By City and States
          </SectionTitle>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setCityTab("city")}
              className={`h-[34px] min-w-[85px] border px-4 text-[10px] ${
                cityTab === "city"
                  ? "border-[#008C95] bg-[#008C95] text-white"
                  : "border-[#444] bg-white"
              }`}
            >
              By City
            </button>

            <button
              type="button"
              onClick={() => setCityTab("state")}
              className={`h-[34px] min-w-[85px] border px-4 text-[10px] ${
                cityTab === "state"
                  ? "border-[#008C95] bg-[#008C95] text-white"
                  : "border-[#444] bg-white"
              }`}
            >
              By State
            </button>
          </div>

          <div className="mx-auto mt-8 flex max-w-[1180px] items-center gap-4">

            <button className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-white md:flex">
              <ChevronLeft size={14} />
            </button>

            <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {cityData[cityTab].map((item) => (
                <DestinationCard
                  key={item.name}
                  item={item}
                />
              ))}
            </div>

            <button className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-white md:flex">
              <ChevronRight size={14} />
            </button>

          </div>
        </div>
      </section>

      {/* =================================================
          INTEREST
      ================================================= */}

      <section className="bg-white py-12">
        <div className="india-container">

          <SectionTitle>
            India Tour Packages By Interest
          </SectionTitle>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {[
              "Honeymoon Special",
              "Women's Special",
              "Seniors' Special",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setInterest(item)}
                className={`h-[30px] border px-4 text-[9px] ${
                  interest === item
                    ? "border-[#008C95] bg-[#008C95] text-white"
                    : "border-[#777] bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-4">

            {interestTours.map((item) => (
              <SmallTourCard
                key={item.title}
                item={item}
              />
            ))}

            {/* SHOW ALL */}
            <div className="flex w-[270px] flex-col items-center justify-center rounded-[8px] border border-[#20B8B5] bg-[#EFF9F8] p-5 text-center">
              
              <p className="text-[11px] font-medium text-[#008C95]">
                Journey doesn't stop at this point
              </p>

              <Globe2
                size={52}
                className="mt-4 text-[#D9AD00]"
              />

              <p className="mt-4 text-[9px] text-[#555]">
                Start exploring a diverse range of additional tours.
              </p>

              <button className="mt-5 flex h-[32px] w-full items-center justify-center gap-2 rounded-[3px] bg-[#FF7A3D] text-[9px] font-semibold text-white transition hover:bg-[#EA642C]">
                Show all tours
                <ArrowRight size={12} />
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          SEASON
      ================================================= */}

      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">

          <SectionTitle>
            India Tour Packages By Season
          </SectionTitle>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {Object.keys(seasonData).map((item) => (
              <button
                key={item}
                onClick={() => setSeason(item)}
                className={`h-[32px] min-w-[125px] border px-4 text-[9px] ${
                  season === item
                    ? "border-[#008C95] bg-[#008C95] text-white"
                    : "border-[#444] bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {seasonData[season].map((item) => (
              <DestinationCard
                key={item.name}
                item={item}
              />
            ))}
          </div>

        </div>
      </section>

      {/* =================================================
          DURATION
      ================================================= */}

      <section className="bg-white py-12">
        <div className="india-container">

          <SectionTitle>
            Explore Best India tour packages By Duration
          </SectionTitle>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              "Less than 5 days",
              "6 to 8 days",
              "9 to 14 days",
              "More than 14 days",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setDuration(item)}
                className={`h-[30px] border px-4 text-[9px] ${
                  duration === item
                    ? "border-[#008C95] bg-[#008C95] text-white"
                    : "border-[#777] bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-7 flex max-w-[1180px] items-center gap-3">

            <button className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-white md:flex">
              <ChevronLeft size={14} />
            </button>

            <div className="flex flex-1 gap-3 overflow-x-auto pb-1">
              {durationPackages.map((item) => (
                <Link
                  key={item.slug}
                  href={`/package/${item.slug}`}
                  className="group block w-[270px] shrink-0 overflow-hidden rounded-[8px] border border-[#cfd4dc] bg-white no-underline shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#20B8B5] hover:shadow-[0_6px_16px_rgba(0,0,0,0.10)]"
                >
                  <div className="relative flex h-[160px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#b7d7eb] via-[#e8d9b5] to-[#98b1c7] px-3 text-center">
                    <span className="text-[12px] font-semibold text-[#31465a]">
                      {item.title}
                    </span>
                  </div>

                  <div className="p-3">
                    <div className="flex flex-wrap gap-1">
                      <span className="border border-[#20B8B5] bg-[#EFF9F8] px-1.5 py-0.5 text-[8px] font-semibold text-[#008C95]">
                        GROUP TOUR
                      </span>

                      <span className="border border-pink-400 bg-pink-50 px-1.5 py-0.5 text-[8px] font-semibold text-pink-600">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="mt-2 text-[14px] font-semibold text-[#1e1e1e] transition-colors group-hover:text-[#008C95]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[10px] font-semibold underline">
                      ∞ All Inclusive
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-[10px] text-[#333]">
                      <span>{item.days} Days</span>
                      <span className="text-[#aaa]">•</span>
                      <span className="underline">{item.cities} Cities</span>
                    </div>

                    <div className="mt-3 flex items-end justify-between border-t border-[#ddd] pt-2">
                      <div>
                        <p className="text-[8px] text-[#777]">Starting price</p>
                        <strong className="text-[16px] leading-none text-[#111]">₹{item.price}</strong>
                      </div>

                      <span className="flex h-[30px] items-center justify-center rounded-[3px] bg-[#FF7A3D] px-3 text-[10px] font-semibold text-white transition-colors group-hover:bg-[#EA642C]">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-white md:flex">
              <ChevronRight size={14} />
            </button>

          </div>
        </div>
      </section>

      {/* =================================================
          BLOGS
      ================================================= */}

      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">

          <SectionTitle>
            Popular Blogs
          </SectionTitle>

          <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">

            {blogs.map((blog) => (
              <article
                key={blog.title}
                className="group cursor-pointer"
              >
                <div
                  className={`h-[190px] rounded-[6px] bg-gradient-to-br ${blog.style}`}
                />

                <h3 className="mt-2 text-[12px] font-medium leading-[1.3] text-[#222] group-hover:text-[#008C95]">
                  {blog.title}
                </h3>
              </article>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}

