import Image from "next/image";


import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  CloudSun,
  FileCheck2,
  Hotel,
  MapPin,
  Phone,
  Star,
  UserCheck,
  Users,
  Utensils,
  Bus,
  ShieldCheck,
  CircleCheck,
  Plane,
  Car,
  X,
} from "lucide-react";

import { getPackageBySlug, packages } from "@/data/packages";
import { getDestinationImage } from "@/data/destinationImages";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PackageItinerary from "@/components/package/PackageItinerary";
import TourDetailsTabs from "@/components/package/TourDetailsTabs";
import PackageBooking from "@/components/package/PackageBooking";
import SectionHeading from "@/components/package/SectionHeading";
import InfoCard from "@/components/package/InfoCard";
import FeatureItem from "@/components/package/FeatureItem";
import TourPackageCard from "@/components/tours/TourPackageCard";
import { toCardItem } from "@/components/tours/tourUtils";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema, tourSchema } from "@/lib/seo";

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
    return buildMetadata({
      title: "Tour Package Not Found",
      description: "The tour package you are looking for is not available.",
      path: `/package/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${tour.title} Tour Package — ${tour.days}D/${tour.nights}N from ₹${tour.price}`,
    description: tour.description,
    path: `/package/${tour.slug}`,
    image: tour.image,
  });
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

  const heroImage = tour.image || getDestinationImage(`${tour.title} ${tour.location}`);

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

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: parentCrumb.label, href: parentCrumb.href },
    ...(categoryCrumb ? [{ name: categoryCrumb.label, href: categoryCrumb.href }] : []),
    { name: tour.title, href: `/package/${tour.slug}` },
  ];

  const firstCity = tour.location.split("•")[0]?.trim() || tour.location;
  const secondCity = tour.location.split("•")[1]?.trim() || firstCity;

  return (
    <>
      <JsonLd
        schema={[
          tourSchema({
            title: tour.title,
            description: tour.description,
            image: heroImage,
            price: tour.price,
            path: `/package/${tour.slug}`,
            days: tour.days,
          }),
          breadcrumbSchema(breadcrumbItems),
        ]}
      />

      {/* =====================================================
          WEBSITE HEADER
      ===================================================== */}

      <Header />
      <Navbar />

      <main className="bg-white text-[#0F172A]">

        {/* ===================================================
            BREADCRUMB
        =================================================== */}

        <section className="border-b border-[#E5E7EB] bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-[#777]">
              <Link href="/" className="hover:text-[#0F4C81]">
                Home
              </Link>

              <ChevronRight size={11} />

              <Link href={parentCrumb.href} className="hover:text-[#0F4C81]">
                {parentCrumb.label}
              </Link>

              {categoryCrumb && (
                <>
                  <ChevronRight size={11} />

                  <Link href={categoryCrumb.href} className="hover:text-[#0F4C81]">
                    {categoryCrumb.label}
                  </Link>
                </>
              )}

              <ChevronRight size={11} />

              <span className="text-[#334155]">{tour.title}</span>
            </div>
          </div>
        </section>

        {/* ===================================================
            PACKAGE HERO
        =================================================== */}

        <section className="bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 sm:py-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">

              {/* LEFT: GALLERY + INFO */}
              <div>

                {/* IMAGE GALLERY */}
                <div className="grid h-[230px] gap-2 overflow-hidden rounded-[14px] sm:h-[340px] sm:gap-3 md:grid-cols-[1.8fr_1fr]">

                  {/* MAIN IMAGE */}
                  <div className="relative overflow-hidden rounded-[14px]">
                    <Image
                      src={heroImage}
                      alt={tour.title}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white sm:p-5">
                      <p className="flex items-center gap-1 text-[11px] font-medium sm:text-[12px]">
                        <MapPin size={12} />
                        {tour.location}
                      </p>
                    </div>
                  </div>

                  {/* SMALL IMAGES */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-1 md:grid-rows-2">
                    <div className="relative overflow-hidden rounded-[12px]">
                      <Image
                        src={heroImage}
                        alt=""
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <MapPin size={26} className="text-white" />
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[12px]">
                      <Image
                        src={heroImage}
                        alt=""
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-center text-[10px] font-semibold shadow-md sm:px-4 sm:text-[12px]">
                          +45 guest photos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PACKAGE INFO */}
                <div className="pt-5 sm:pt-6">

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#17BEBB] bg-[#F7FAFC] px-2.5 py-1 text-[10px] font-semibold uppercase text-[#0F4C81]">
                      {tour.tourType}
                    </span>

                    <span className="rounded-full border border-pink-400 bg-pink-50 px-2.5 py-1 text-[10px] font-semibold text-pink-600">
                      {tour.category}
                    </span>
                  </div>

                  <h1 className="mt-3 text-[24px] font-bold leading-tight sm:text-[32px]">
                    {tour.title}
                  </h1>

                  <p className="mt-1.5 flex items-center gap-1 text-[13px] text-[#64748B]">
                    <MapPin size={13} />
                    {tour.location}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#334155]">
                    <span className="font-semibold text-[#0F4C81]">All Inclusive</span>
                    <span className="text-[#CBD5E1]">|</span>
                    <span>{tour.days} Days</span>
                    <span className="text-[#CBD5E1]">•</span>
                    <span>{tour.nights} Nights</span>
                    <span className="text-[#CBD5E1]">•</span>
                    <span>{tour.cities} Cities</span>
                  </div>

                  {/* RATING */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex text-[#ff9800]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={13} fill="currentColor" />
                      ))}
                    </div>

                    <strong className="text-[12px]">{tour.rating}</strong>

                    <span className="text-[12px] text-[#64748B]">({tour.reviews} Reviews)</span>
                  </div>

                  <p className="mt-4 max-w-[750px] text-[14px] leading-[1.65] text-[#475569]">
                    {tour.description}
                  </p>
                </div>
              </div>

              {/* =============================================
                  PRICE CARD (sticky on desktop)
              ============================================= */}

              <aside className="self-start rounded-[16px] border border-[#E5E7EB] bg-[#F7FAFC] p-5 shadow-[0_4px_20px_rgba(15,23,42,0.06)] lg:sticky lg:top-[90px]">

                <p className="text-center text-[12px] text-[#64748B]">Starting price per person</p>

                <div className="mt-1 text-center text-[30px] font-bold text-[#0F172A] sm:text-[32px]">
                  ₹{formatPrice(tour.price)}
                </div>

                <p className="mt-2 text-center text-[12px] text-[#475569]">
                  EMI from <span className="font-semibold text-[#0F4C81]">₹{formatPrice(tour.emi)}/month</span>
                </p>

                <a
                  href="#departures"
                  className="mt-5 flex h-[46px] w-full items-center justify-center rounded-[10px] bg-[#FF7A1A] text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#E56A0F]"
                >
                  Dates &amp; Availability
                </a>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#E5E7EB] pt-4 text-center">
                  <div>
                    <Clock3 size={17} className="mx-auto text-[#0F4C81]" />
                    <p className="mt-1.5 text-[11px] text-[#475569]">{tour.days} Days</p>
                  </div>

                  <div>
                    <MapPin size={17} className="mx-auto text-[#0F4C81]" />
                    <p className="mt-1.5 text-[11px] text-[#475569]">{tour.cities} Cities</p>
                  </div>

                  <div>
                    <CalendarDays size={17} className="mx-auto text-[#0F4C81]" />
                    <p className="mt-1.5 text-[11px] text-[#475569]">{tour.departures.length} Dates</p>
                  </div>
                </div>

                <button className="mt-4 flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#0F4C81] bg-white text-[13px] font-semibold text-[#0F4C81] transition hover:bg-[#EEF3FF]">
                  <Phone size={14} />
                  Enquire Now
                </button>
              </aside>
            </div>
          </div>
        </section>

        {/* ===================================================
            PACKAGE SUMMARY
        =================================================== */}

        <section className="bg-[#F8FAFC]">
          <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8">
            <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-6">
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
                <FeatureItem icon={Clock3} label="Duration" value={`${tour.days}D / ${tour.nights}N`} />
                <FeatureItem icon={MapPin} label="Cities" value={`${tour.cities} Cities`} />
                <FeatureItem icon={Utensils} label="Meals" value="Included" />
                <FeatureItem icon={Hotel} label="Stay" value="Handpicked Hotels" />
                <FeatureItem icon={Bus} label="Transport" value="All Transfers" />
                <FeatureItem icon={ShieldCheck} label="Tour Type" value={tour.tourType} />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            TOUR HIGHLIGHTS
        =================================================== */}

        <section className="bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
            <SectionHeading title="Tour Highlights" />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {tour.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-[14px] text-[#334155]"
                >
                  <CircleCheck size={16} className="mt-[1px] shrink-0 text-[#17A34A]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            DEPARTURE SELECTION + BOOKING SUMMARY
        =================================================== */}

        <div id="departures" className="scroll-mt-[110px]">
          <PackageBooking tour={tour} />
        </div>

        {/* ===================================================
            STICKY NAVIGATION
        =================================================== */}

        <div className="sticky top-[65px] z-30 border-b border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="mx-auto flex max-w-[1280px] gap-7 overflow-x-auto px-4 no-scrollbar sm:px-6">
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
                className={`whitespace-nowrap border-b-2 px-1 py-4 text-[13px] font-semibold transition-colors ${
                  index === 0
                    ? "border-[#0F4C81] text-[#0F4C81]"
                    : "border-transparent text-[#64748B] hover:text-[#0F4C81]"
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

        <section id="itinerary" className="scroll-mt-[110px] bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
            <SectionHeading title="Itinerary" subtitle={`${tour.days} Days • ${tour.nights} Nights`} />

            <PackageItinerary itinerary={tour.itinerary} />
          </div>
        </section>

        {/* ===================================================
            TOUR DETAILS
        =================================================== */}

        <section className="bg-[#F8FAFC]">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
            <SectionHeading title="Tour Details" />

            <TourDetailsTabs details={tour.tourDetails || defaultTourDetails(tour)} />
          </div>
        </section>

        {/* ===================================================
            TOUR INFORMATION
        =================================================== */}

        <section id="tour-information" className="scroll-mt-[110px] bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
            <SectionHeading title="Tour Information" />

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-6">
                <h3 className="text-[15px] font-semibold text-[#15803D]">What&apos;s Included</h3>

                <div className="mt-4 space-y-3">
                  {tour.inclusions.map((item) => (
                    <div key={item} className="flex gap-2.5 text-[14px] text-[#334155]">
                      <Check size={16} className="mt-[1px] shrink-0 text-[#16A34A]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-6">
                <h3 className="text-[15px] font-semibold text-[#0F172A]">What&apos;s Not Included</h3>

                <div className="mt-4 space-y-3">
                  {(tour.exclusions || DEFAULT_EXCLUSIONS).map((item) => (
                    <div key={item} className="flex gap-2.5 text-[14px] text-[#64748B]">
                      <X size={16} className="mt-[1px] shrink-0 text-[#DC2626]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            ACCOMMODATION
        =================================================== */}

        <section className="bg-[#F8FAFC]">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
            <SectionHeading title="Accommodation" />

            {/* MOBILE: stacked cards */}
            <div className="mt-6 space-y-3 sm:hidden">
              {[firstCity, secondCity].map((city) => (
                <div key={city} className="rounded-[14px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#0F4C81]">City</p>
                  <p className="text-[14px] font-semibold text-[#0F172A]">{city}</p>

                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-[#0F4C81]">Hotel</p>
                  <p className="text-[13px] text-[#475569]">Comfortable selected hotel</p>

                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-[#0F4C81]">Check-in / Check-out</p>
                  <p className="text-[13px] text-[#475569]">As per itinerary</p>
                </div>
              ))}
            </div>

            {/* sm+: table */}
            <div className="mt-6 hidden overflow-hidden rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:block">
              <div className="grid grid-cols-3 bg-[#0F4C81] px-5 py-3 text-[12px] font-semibold text-white">
                <span>City</span>
                <span>Hotel</span>
                <span>Check-in / Check-out</span>
              </div>

              <div className="grid grid-cols-3 px-5 py-4 text-[13px] text-[#334155]">
                <span>{firstCity}</span>
                <span>Comfortable selected hotel</span>
                <span>As per itinerary</span>
              </div>

              <div className="grid grid-cols-3 bg-[#F8FAFC] px-5 py-4 text-[13px] text-[#334155]">
                <span>{secondCity}</span>
                <span>Comfortable selected hotel</span>
                <span>As per itinerary</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            NEED TO KNOW
        =================================================== */}

        <section id="need-to-know" className="scroll-mt-[110px] bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
            <SectionHeading title="Need to Know" subtitle="Important information before you travel" />

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoCard icon={CloudSun} title="Weather">
                {tour.needToKnow?.weather ||
                  "Weather conditions may vary depending on destination and travel dates."}
              </InfoCard>

              <InfoCard icon={Bus} title="Transport">
                {tour.needToKnow?.transport ||
                  "Comfortable transportation will be provided as mentioned in the itinerary."}
              </InfoCard>

              <InfoCard icon={FileCheck2} title="Documents Required for Travel">
                {tour.needToKnow?.documents ? (
                  <ul className="space-y-1">
                    {tour.needToKnow.documents.map((doc) => (
                      <li key={doc}>• {doc}</li>
                    ))}
                  </ul>
                ) : (
                  "Carry valid government-issued identification and all necessary travel documents."
                )}
              </InfoCard>

              <InfoCard icon={UserCheck} title="Tour Manager">
                Tour manager services are provided according to the selected package.
              </InfoCard>
            </div>
          </div>
        </section>

        {/* ===================================================
            CANCELLATION
        =================================================== */}

        <section id="cancellation-policy" className="scroll-mt-[110px] bg-[#F8FAFC]">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
            <SectionHeading
              title="Cancellation Policy"
              subtitle="Sample cancellation policy shown for illustration — final terms are confirmed at the time of booking."
            />

            {(() => {
              const tiers = ["#17A34A", "#F5A623", "#FF7A1A", "#DC2626", "#DC2626"];
              const policyRows = tour.cancellationPolicy || DEFAULT_CANCELLATION_POLICY;

              return (
                <>
                  {/* MOBILE: color-coded stacked cards */}
                  <div className="mt-6 space-y-2.5 sm:hidden">
                    {policyRows.map((row, index) => (
                      <div
                        key={row.period}
                        className="rounded-[10px] border border-[#E5E7EB] bg-white py-3 pl-3 pr-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                        style={{ borderLeft: `4px solid ${tiers[index % tiers.length]}` }}
                      >
                        <p className="text-[13px] font-semibold text-[#0F172A]">{row.charge}</p>
                        <p className="mt-0.5 text-[12px] text-[#64748B]">{row.period}</p>
                      </div>
                    ))}
                  </div>

                  {/* sm+: table with alternating rows */}
                  <div className="mt-6 hidden overflow-hidden rounded-[14px] border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:block">
                    {policyRows.map((row, index) => (
                      <div
                        key={row.period}
                        className={`grid grid-cols-2 px-5 py-4 text-[13px] text-[#334155] ${
                          index % 2 === 1 ? "bg-[#F8FAFC]" : "bg-white"
                        }`}
                      >
                        <span>{row.period}</span>
                        <strong className="text-[#0F172A]">{row.charge}</strong>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </section>

        {/* ===================================================
            PAYMENT TERMS
        =================================================== */}

        <section id="payment-terms" className="scroll-mt-[110px] bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
            <SectionHeading title="Payment Terms" />

            <div className="mt-6 space-y-3 rounded-[14px] border border-[#E5E7EB] bg-[#F8FAFC] p-5 sm:p-6">
              {(tour.paymentTerms || DEFAULT_PAYMENT_TERMS).map((term, index) => (
                <div key={term} className="flex gap-2.5 text-[14px] leading-[1.6] text-[#334155]">
                  <span className={`mt-[2px] shrink-0 font-bold ${index === 0 ? "text-[#FF7A1A]" : "text-[#0F4C81]"}`}>
                    •
                  </span>
                  <span className={index === 0 ? "font-semibold text-[#0F172A]" : ""}>{term}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            UPGRADES
        =================================================== */}

        <section id="upgrades" className="scroll-mt-[110px] bg-[#F8FAFC]">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
            <SectionHeading title="Upgrade Available" />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {(tour.upgrades || DEFAULT_UPGRADES).map((upgrade) => {
                const Icon = upgradeIcon(upgrade.title);

                return (
                  <div
                    key={upgrade.title}
                    className="flex h-full flex-col rounded-[14px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F7F5]">
                      <Icon size={19} className="text-[#0F4C81]" />
                    </div>

                    <h3 className="mt-3 text-[15px] font-semibold text-[#0F172A]">{upgrade.title}</h3>

                    <p className="mt-2 flex-1 text-[13px] leading-[1.6] text-[#64748B]">
                      {upgrade.description}
                    </p>

                    <button className="mt-4 self-start text-[13px] font-semibold text-[#0F4C81] underline underline-offset-2">
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
          <section className="bg-white">
            <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
              <SectionHeading title="You may also like" subtitle="Handpicked tours similar to this package" />

              <div className="mt-6 flex gap-5 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory sm:grid sm:overflow-visible sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {relatedTours.map((item) => (
                  <div key={item.slug} className="min-w-[85vw] max-w-[85vw] shrink-0 snap-start sm:min-w-0 sm:max-w-none">
                    <TourPackageCard item={toCardItem(item)} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===================================================
            REVIEWS
        =================================================== */}

        <section className="bg-[#0c2235]">
          <div className="mx-auto max-w-[1280px] px-4 py-8 text-white sm:px-6 sm:py-12">
            <div className="text-center">
              <h2 className="text-[20px] font-bold sm:text-[26px]">Honor Tour & Travels tour reviews</h2>

              <p className="mt-1.5 text-[13px] text-white/70">
                What our guests say about their travel experience
              </p>
            </div>

            <div className="mt-8 flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:grid md:overflow-visible md:grid-cols-3">
              {[
                "A wonderful and well-managed tour. Everything was planned perfectly.",
                "The itinerary was comfortable and our tour manager was extremely helpful.",
                "Excellent experience with great hotels, sightseeing and transportation.",
              ].map((review, index) => (
                <div
                  key={review}
                  className="min-w-[260px] max-w-[260px] shrink-0 snap-start rounded-[14px] bg-white p-5 text-[#0F172A] shadow-[0_4px_16px_rgba(0,0,0,0.15)] md:min-w-0 md:max-w-none"
                >
                  <div className="flex text-[#ff9800]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={13} fill="currentColor" />
                    ))}
                  </div>

                  <p className="mt-3 text-[13px] leading-[1.6] text-[#475569]">&quot;{review}&quot;</p>

                  <p className="mt-4 text-[13px] font-semibold text-[#0F172A]">Guest {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* spacer so the mobile sticky price bar doesn't cover the footer */}
      <div className="h-[76px] lg:hidden" />

      <Footer />
    </>
  );
}
