

import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Hotel,
  MapPin,
  Phone,
  Star,
  Users,
  Utensils,
  Bus,
  ShieldCheck,
  CircleCheck,
  Plane,
  Car,
} from "lucide-react";

import { getPackageBySlug, packages } from "@/data/packages";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageItinerary from "@/components/package/PackageItinerary";
import TourDetailsTabs from "@/components/package/TourDetailsTabs";
import PackageBooking from "@/components/package/PackageBooking";
import TourPackageCard from "@/components/tours/TourPackageCard";
import { toCardItem } from "@/components/tours/tourUtils";

const DEFAULT_EXCLUSIONS = [
  "Personal expenses and shopping",
  "Optional sightseeing and activities",
  "Meals not specifically mentioned",
  "Travel insurance unless mentioned",
  "Additional services requested during the tour",
];

const DEFAULT_CANCELLATION_POLICY = [
  { period: "45 days or more before departure", charge: "Registration amount" },
  { period: "30 - 44 days before departure", charge: "25% of tour cost" },
  { period: "15 - 29 days before departure", charge: "50% of tour cost" },
  { period: "8 - 14 days before departure", charge: "75% of tour cost" },
  { period: "0 - 7 days before departure", charge: "100% of tour cost" },
];

const DEFAULT_PAYMENT_TERMS = [
  "A registration amount is payable at the time of booking to confirm your seat on the tour.",
  "The balance payment is due before the departure date as communicated by your tour manager.",
  "Bookings made close to the departure date require full payment at the time of booking.",
  "Cancellation charges apply as per the cancellation policy from the date of written cancellation.",
];

const DEFAULT_UPGRADES = [
  { title: "Flight Upgrade", description: "Enhance your travel experience with optional upgrades." },
  { title: "Premium Hotel", description: "Enhance your travel experience with optional upgrades." },
  { title: "Private Experience", description: "Enhance your travel experience with optional upgrades." },
];

function defaultTourDetails(tour) {
  const firstCity = tour.location.split("•")[0].trim();
  const isInternational = Boolean(tour.country);

  return {
    flight: isInternational
      ? `Return international airfare can be arranged by our team, or you may join the group on arrival at ${firstCity} if travelling on your own flights.`
      : `Domestic flights or train connections to ${firstCity} can be arranged separately, or join the group directly at the first destination of the tour.`,
    accommodation: `Comfortable, well-located hotels are used throughout the tour on a twin-sharing basis, as detailed in the itinerary.`,
    reporting: `Please report at the designated meeting point in ${firstCity} at the time communicated by your tour manager, usually a few hours before the first scheduled activity.`,
  };
}

function upgradeIcon(title) {
  const lower = title.toLowerCase();
  if (lower.includes("flight")) return Plane;
  if (lower.includes("room") || lower.includes("hotel")) return Hotel;
  if (lower.includes("transfer") || lower.includes("transport")) return Car;
  return Users;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN").format(price);
}

/* =========================================================
   STATIC PARAMS
========================================================= */

export function generateStaticParams() {
  return packages.map((item) => ({
    slug: item.slug,
  }));
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = getPackageBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Package",
    };
  }

  return {
    title: `${tour.title} Tour Package`,
    description: tour.description,
  };
}

/* =========================================================
   PACKAGE DETAIL PAGE
========================================================= */

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;

  const tour = getPackageBySlug(slug);

  if (!tour) {
    notFound();
  }

  const parentCrumb = tour.country
    ? { label: "World", href: "/world" }
    : { label: "India", href: "/india" };

  const stateSlugOverrides = {
    "Jammu and Kashmir": "jammu-kashmir-tour-packages",
    "Andaman and Nicobar": "andaman-tour-packages",
    Ladakh: "leh-ladakh-tour-packages",
  };

  function slugifyName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "");
  }

  const categoryCrumb = tour.country
    ? { label: tour.country, href: `/world/${slugifyName(tour.country)}-tour-packages` }
    : tour.state
    ? {
        label: tour.state,
        href: `/india/${stateSlugOverrides[tour.state] || `${slugifyName(tour.state)}-tour-packages`}`,
      }
    : null;

  const relatedTours = (
    tour.relatedGroup
      ? packages.filter((item) => item.relatedGroup === tour.relatedGroup && item.slug !== tour.slug)
      : tour.country
      ? packages.filter((item) => item.country === tour.country && item.slug !== tour.slug)
      : packages.filter((item) => item.category === tour.category && item.slug !== tour.slug)
  ).slice(0, 4);

  return (
    <>
      {/* =====================================================
          WEBSITE HEADER
      ===================================================== */}

      <Header />
      <Navbar />

      <main className="bg-[#f5f5f5] text-[#202020]">

        {/* ===================================================
            BREADCRUMB
        =================================================== */}

        <section className="border-b bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-3">
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-[#777]">
              <Link href="/" className="hover:text-[#2563EB]">
                Home
              </Link>

              <ChevronRight size={11} />

              <Link href={parentCrumb.href} className="hover:text-[#2563EB]">
                {parentCrumb.label}
              </Link>

              {categoryCrumb && (
                <>
                  <ChevronRight size={11} />

                  <Link href={categoryCrumb.href} className="hover:text-[#2563EB]">
                    {categoryCrumb.label}
                  </Link>
                </>
              )}

              <ChevronRight size={11} />

              <span>{tour.title}</span>
            </div>
          </div>
        </section>

        {/* ===================================================
            PACKAGE HERO
        =================================================== */}

        <section className="bg-white">
          <div className="mx-auto max-w-[1280px] px-4 pb-7 pt-3">

            <div className="grid gap-4 lg:grid-cols-[1fr_290px]">

              {/* LEFT */}

              <div>

                {/* IMAGE GALLERY */}

                <div className="grid h-[290px] gap-2 overflow-hidden rounded-[8px] md:grid-cols-[1.8fr_1fr]">

                  {/* MAIN IMAGE */}

                  <div className="relative flex items-end overflow-hidden bg-gradient-to-br from-[#d2aa52] via-[#b8cbd0] to-[#647d90] p-6">

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="relative z-10 text-white">
                      <p className="text-[12px] font-medium">
                        {tour.location}
                      </p>

                      <p className="mt-1 text-[28px] font-bold" aria-hidden="true">
                        {tour.title}
                      </p>
                    </div>
                  </div>

                  {/* SMALL IMAGES */}

                  <div className="hidden grid-rows-2 gap-2 md:grid">

                    <div className="flex items-center justify-center rounded-[6px] bg-gradient-to-br from-[#e9d7aa] to-[#9fb3be]">
                      <MapPin
                        size={34}
                        className="text-[#2563EB]"
                      />
                    </div>

                    <div className="relative flex items-center justify-center rounded-[6px] bg-gradient-to-br from-[#bfd7e6] to-[#dcc590]">
                      <span className="rounded bg-white/90 px-4 py-2 text-[12px] font-semibold shadow">
                        View all photos
                      </span>
                    </div>

                  </div>
                </div>

                {/* PACKAGE INFO */}

                <div className="pt-4">

                  <div className="flex flex-wrap gap-2">

                    <span className="border border-[#BFDBFE] bg-[#EFF6FF] px-2 py-1 text-[10px] font-semibold uppercase text-[#2563EB]">
                      {tour.tourType}
                    </span>

                    <span className="border border-pink-400 bg-pink-50 px-2 py-1 text-[10px] font-semibold text-pink-600">
                      {tour.category}
                    </span>

                  </div>

                  <h1 className="mt-3 text-[27px] font-bold sm:text-[34px]">
                    {tour.title}
                  </h1>

                  <p className="mt-1 text-[13px] text-[#666]">
                    {tour.location}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px]">

                    <span className="font-semibold underline">
                      ∞ All Inclusive
                    </span>

                    <span className="text-[#bbb]">|</span>

                    <span>
                      {tour.days} Days
                    </span>

                    <span className="text-[#bbb]">•</span>

                    <span>
                      {tour.nights} Nights
                    </span>

                    <span className="text-[#bbb]">•</span>

                    <span>
                      {tour.cities} Cities
                    </span>

                  </div>

                  {/* RATING */}

                  <div className="mt-3 flex items-center gap-2">

                    <div className="flex text-[#ff9800]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={13}
                          fill="currentColor"
                        />
                      ))}
                    </div>

                    <strong className="text-[11px]">
                      {tour.rating}
                    </strong>

                    <span className="text-[10px] text-[#777]">
                      ({tour.reviews} Reviews)
                    </span>

                  </div>

                  <p className="mt-4 max-w-[750px] text-[12px] leading-6 text-[#555]">
                    {tour.description}
                  </p>

                </div>
              </div>

              {/* =============================================
                  PRICE CARD
              ============================================= */}

              <aside className="self-start rounded-[8px] border border-[#aac3ff] bg-[#f7f9ff] p-5 shadow-sm">

                <p className="text-center text-[10px] text-[#777]">
                  Starting price per person
                </p>

                <div className="mt-1 text-center text-[30px] font-bold">
                  ₹{formatPrice(tour.price)}
                </div>

                <p className="mt-2 text-center text-[10px]">
                  EMI from{" "}
                  <span className="font-semibold underline">
                    ₹{formatPrice(tour.emi)}/month
                  </span>
                </p>

                <button className="mt-5 h-[42px] w-full rounded-[3px] bg-[#2563EB] text-[12px] font-semibold text-white transition hover:bg-[#1D4ED8]">
                  Dates & Availability
                </button>

                <div className="mt-5 grid grid-cols-3 border-t pt-4 text-center">

                  <div>
                    <Clock3
                      size={17}
                      className="mx-auto text-[#2563EB]"
                    />

                    <p className="mt-1 text-[9px]">
                      {tour.days} Days
                    </p>
                  </div>

                  <div>
                    <MapPin
                      size={17}
                      className="mx-auto text-[#2563EB]"
                    />

                    <p className="mt-1 text-[9px]">
                      {tour.cities} Cities
                    </p>
                  </div>

                  <div>
                    <CalendarDays
                      size={17}
                      className="mx-auto text-[#2563EB]"
                    />

                    <p className="mt-1 text-[9px]">
                      {tour.departures.length} Dates
                    </p>
                  </div>

                </div>

                <button className="mt-5 flex h-[38px] w-full items-center justify-center gap-2 border border-[#2563EB] bg-white text-[11px] font-semibold text-[#2563EB]">
                  <Phone size={14} />
                  Enquire Now
                </button>

              </aside>
            </div>
          </div>
        </section>

        {/* ===================================================
            TOUR INCLUDES / HIGHLIGHTS
        =================================================== */}

        <section className="border-y bg-[#f5f5f5]">
          <div className="mx-auto grid max-w-[1280px] gap-4 px-4 py-6 lg:grid-cols-2">

            {/* INCLUDES */}

            <div className="rounded-[7px] border bg-white p-5">

              <h2 className="text-[16px] font-semibold">
                Tour Includes
              </h2>

              <div className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-6">

                {[
                  [Hotel, "Hotel"],
                  [Utensils, "Meals"],
                  [Bus, "Transport"],
                  [Users, "Tour Manager"],
                  [MapPin, "Sightseeing"],
                  [ShieldCheck, "Assistance"],
                ].map(([Icon, label]) => (
                  <div
                    key={label}
                    className="text-center"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#fff5cc]">
                      <Icon
                        size={18}
                        className="text-[#2563EB]"
                      />
                    </div>

                    <p className="mt-2 text-[9px]">
                      {label}
                    </p>
                  </div>
                ))}

              </div>
            </div>

            {/* HIGHLIGHTS */}

            <div className="rounded-[7px] border bg-white p-5">

              <h2 className="text-[16px] font-semibold">
                Tour Highlights
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                {tour.highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-[11px]"
                  >
                    <CircleCheck
                      size={15}
                      className="mt-[1px] shrink-0 text-[#45a049]"
                    />

                    <span>{item}</span>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            DEPARTURE SELECTION + BOOKING SUMMARY
        =================================================== */}

        <PackageBooking tour={tour} />

        {/* ===================================================
            STICKY NAVIGATION
        =================================================== */}

        <div className="sticky top-0 z-30 border-y bg-white shadow-sm">
          <div className="mx-auto flex max-w-[1280px] gap-7 overflow-x-auto px-4">
            {[
              "Itinerary",
              "Tour Information",
              "Need to Know",
              "Cancellation Policy",
              "Payment Terms",
              "Upgrades",
            ].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className={`whitespace-nowrap border-b-2 px-1 py-4 text-[11px] font-semibold ${
                  index === 0
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-[#555]"
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* ===================================================
            ITINERARY
        =================================================== */}

        <section
          id="itinerary"
          className="bg-white"
        >
          <div className="mx-auto max-w-[1280px] px-4 py-9">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[22px] font-semibold">
                  Itinerary
                </h2>

                <p className="mt-1 text-[11px] text-[#777]">
                  {tour.days} Days • {tour.nights} Nights
                </p>
              </div>
            </div>

            <PackageItinerary itinerary={tour.itinerary} />
          </div>
        </section>

        {/* ===================================================
            TOUR DETAILS
        =================================================== */}

        <section className="border-t bg-[#fafafa]">
          <div className="mx-auto max-w-[1280px] px-4 py-9">
            <h2 className="text-[22px] font-semibold">Tour Details</h2>

            <TourDetailsTabs details={tour.tourDetails || defaultTourDetails(tour)} />
          </div>
        </section>

        {/* ===================================================
            TOUR INFORMATION
        =================================================== */}

        <section
          id="tour-information"
          className="border-t bg-[#f7f7f7]"
        >
          <div className="mx-auto max-w-[1280px] px-4 py-9">

            <h2 className="text-[22px] font-semibold">
              Tour Information
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div className="rounded-[7px] border bg-white p-5">
                <h3 className="text-[14px] font-semibold text-green-700">
                  What&apos;s Included
                </h3>

                <div className="mt-4 space-y-3">

                  {tour.inclusions.map((item) => (
                    <div
                      key={item}
                      className="flex gap-2 text-[11px]"
                    >
                      <Check
                        size={14}
                        className="shrink-0 text-green-600"
                      />

                      {item}
                    </div>
                  ))}

                </div>
              </div>

              <div className="rounded-[7px] border bg-white p-5">
                <h3 className="text-[14px] font-semibold text-red-600">
                  What&apos;s Not Included
                </h3>

                <div className="mt-4 space-y-3 text-[11px] text-[#555]">
                  {(tour.exclusions || DEFAULT_EXCLUSIONS).map((item) => (
                    <p key={item}>• {item}</p>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===================================================
            ACCOMMODATION
        =================================================== */}

        <section className="bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-9">

            <h2 className="text-[22px] font-semibold">
              Accommodation
            </h2>

            <div className="mt-5 overflow-hidden rounded-[7px] border">

              <div className="grid grid-cols-3 bg-[#2563EB] px-4 py-3 text-[10px] font-semibold text-white">
                <span>City</span>
                <span>Hotel</span>
                <span>Check-in / Check-out</span>
              </div>

              <div className="grid grid-cols-3 px-4 py-4 text-[10px]">
                <span>{tour.location.split("•")[0]}</span>
                <span>Comfortable selected hotel</span>
                <span>As per itinerary</span>
              </div>

              <div className="grid grid-cols-3 border-t px-4 py-4 text-[10px]">
                <span>
                  {tour.location.split("•")[1] || tour.location}
                </span>

                <span>Comfortable selected hotel</span>

                <span>As per itinerary</span>
              </div>

            </div>
          </div>
        </section>

        {/* ===================================================
            NEED TO KNOW
        =================================================== */}

        <section
          id="need-to-know"
          className="border-t bg-[#fafafa]"
        >
          <div className="mx-auto max-w-[1280px] px-4 py-9">

            <h2 className="text-[22px] font-semibold">
              Need to Know
            </h2>

            <p className="mt-1 text-[11px] text-[#777]">
              Important information before you travel
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div className="rounded-[7px] border bg-white p-5">
                <h3 className="text-[13px] font-semibold">Weather</h3>
                <p className="mt-2 text-[10px] leading-5 text-[#666]">
                  {tour.needToKnow?.weather ||
                    "Weather conditions may vary depending on destination and travel dates."}
                </p>
              </div>

              <div className="rounded-[7px] border bg-white p-5">
                <h3 className="text-[13px] font-semibold">Transport</h3>
                <p className="mt-2 text-[10px] leading-5 text-[#666]">
                  {tour.needToKnow?.transport ||
                    "Comfortable transportation will be provided as mentioned in the itinerary."}
                </p>
              </div>

              <div className="rounded-[7px] border bg-white p-5">
                <h3 className="text-[13px] font-semibold">Documents Required for Travel</h3>
                {tour.needToKnow?.documents ? (
                  <ul className="mt-2 space-y-1 text-[10px] leading-5 text-[#666]">
                    {tour.needToKnow.documents.map((doc) => (
                      <li key={doc}>• {doc}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-[10px] leading-5 text-[#666]">
                    Carry valid government-issued identification and all necessary travel documents.
                  </p>
                )}
              </div>

              <div className="rounded-[7px] border bg-white p-5">
                <h3 className="text-[13px] font-semibold">Tour Manager</h3>
                <p className="mt-2 text-[10px] leading-5 text-[#666]">
                  Tour manager services are provided according to the selected package.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ===================================================
            CANCELLATION
        =================================================== */}

        <section
          id="cancellation-policy"
          className="bg-white"
        >
          <div className="mx-auto max-w-[1280px] px-4 py-9">

            <h2 className="text-[22px] font-semibold">
              Cancellation Policy
            </h2>

            <p className="mt-1 text-[10px] text-[#999]">
              Sample cancellation policy shown for illustration — final terms are confirmed at
              the time of booking.
            </p>

            <div className="mt-5 overflow-hidden rounded-[7px] border">

              {(tour.cancellationPolicy || DEFAULT_CANCELLATION_POLICY).map((row, index, arr) => (
                <div
                  key={row.period}
                  className={`grid grid-cols-2 px-5 py-4 text-[10px] ${
                    index !== arr.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span>{row.period}</span>

                  <strong>{row.charge}</strong>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ===================================================
            PAYMENT TERMS
        =================================================== */}

        <section
          id="payment-terms"
          className="border-t bg-[#fafafa]"
        >
          <div className="mx-auto max-w-[1280px] px-4 py-9">

            <h2 className="text-[22px] font-semibold">
              Payment Terms
            </h2>

            <div className="mt-5 space-y-3 rounded-[7px] border bg-white p-5 text-[11px] leading-6 text-[#555]">
              {(tour.paymentTerms || DEFAULT_PAYMENT_TERMS).map((term) => (
                <p key={term}>• {term}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            UPGRADES
        =================================================== */}

        <section
          id="upgrades"
          className="border-t bg-[#f7f7f7]"
        >
          <div className="mx-auto max-w-[1280px] px-4 py-9">

            <h2 className="text-[22px] font-semibold">
              Upgrade Available
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">

              {(tour.upgrades || DEFAULT_UPGRADES).map((upgrade) => {
                const Icon = upgradeIcon(upgrade.title);

                return (
                  <div
                    key={upgrade.title}
                    className="rounded-[7px] border bg-white p-5"
                  >
                    <Icon
                      size={23}
                      className="text-[#2563EB]"
                    />

                    <h3 className="mt-3 text-[13px] font-semibold">
                      {upgrade.title}
                    </h3>

                    <p className="mt-2 text-[10px] leading-5 text-[#777]">
                      {upgrade.description}
                    </p>

                    <button className="mt-4 text-[10px] font-semibold text-[#2563EB] underline">
                      Know More
                    </button>
                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* ===================================================
            RELATED TOURS
        =================================================== */}

        {relatedTours.length > 0 && (
          <section className="border-t bg-white">
            <div className="mx-auto max-w-[1280px] px-4 py-9">
              <h2 className="text-[22px] font-semibold">
                You may also like
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {relatedTours.map((item) => (
                  <TourPackageCard
                    key={item.slug}
                    item={toCardItem(item)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===================================================
            REVIEWS
        =================================================== */}

        <section className="bg-[#0c2235]">
          <div className="mx-auto max-w-[1280px] px-4 py-9 text-white">

            <div className="text-center">
              <h2 className="text-[22px] font-semibold">
                Travel World tour reviews
              </h2>

              <p className="mt-1 text-[10px] text-white/70">
                What our guests say about their travel experience
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">

              {[
                "A wonderful and well-managed tour. Everything was planned perfectly.",
                "The itinerary was comfortable and our tour manager was extremely helpful.",
                "Excellent experience with great hotels, sightseeing and transportation.",
              ].map((review, index) => (
                <div
                  key={review}
                  className="rounded-[7px] bg-white p-5 text-[#222]"
                >

                  <div className="flex text-[#ff9800]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <p className="mt-3 text-[10px] leading-5 text-[#555]">
                    &quot;{review}&quot;
                  </p>

                  <p className="mt-4 text-[11px] font-semibold">
                    Guest {index + 1}
                  </p>

                </div>
              ))}

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}