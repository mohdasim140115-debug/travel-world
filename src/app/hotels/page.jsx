import { Hotel as HotelIcon, ShieldCheck, Wallet, Clock3 } from "lucide-react";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQAccordion from "@/components/common/FAQAccordion";
import HotelCityCard from "@/components/hotels/HotelCityCard";
import { prisma } from "@/lib/prisma";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hotel Booking | Heritage, Beach & Mountain Resorts",
  description:
    "Book hotels across popular Honor Tour & Travels destinations — from heritage properties to beach resorts and mountain retreats.",
  path: "/hotels",
});

const benefits = [
  {
    icon: HotelIcon,
    title: "Handpicked Properties",
    description: "Every hotel is selected to match Honor Tour & Travels's tour destinations.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description: "Accurate photos, amenities and pricing for every property.",
  },
  {
    icon: Clock3,
    title: "Flexible Stays",
    description: "Choose from a range of room types to suit your travel plan.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "Per-night pricing shown upfront, no hidden charges.",
  },
];

const faqs = [
  {
    question: "How do I book a hotel with Honor Tour & Travels?",
    answer:
      "Pick a destination, browse the available hotels, choose a room type on the hotel's page and submit your booking request — our team will confirm the details with you.",
  },
  {
    question: "Can I combine a hotel stay with a tour package?",
    answer:
      "Yes, many of our tour packages already include accommodation, and standalone hotel stays can also be added to any customized holiday.",
  },
  {
    question: "Are the room prices per night or per stay?",
    answer:
      "All room prices shown are per night. The total for your stay will depend on your check-in and check-out dates.",
  },
];

export default async function HotelsPage() {
  const hotels = await prisma.hotel.findMany({ orderBy: { order: "asc" } });

  const cityMap = new Map();
  for (const hotel of hotels) {
    if (!cityMap.has(hotel.citySlug)) {
      cityMap.set(hotel.citySlug, { citySlug: hotel.citySlug, name: hotel.city, image: hotel.image, count: 0 });
    }
    cityMap.get(hotel.citySlug).count += 1;
  }
  const cities = Array.from(cityMap.values());

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Hotels", href: "/hotels" },
        ])}
      />
      <Header />
      <Navbar />

      <main className="bg-white">
        {/* =====================================================
            HERO
        ===================================================== */}
        <section
          className="relative overflow-hidden px-3 py-14 sm:px-6 lg:px-0"
          style={{ background: "linear-gradient(135deg, #0B3B63, #4DA8DA)" }}
        >
          <HotelIcon className="pointer-events-none absolute right-6 top-8 h-24 w-24 text-white/10 sm:h-32 sm:w-32" />

          <div className="relative mx-auto w-full max-w-[1280px] text-center text-white">
            <h1 className="text-[30px] font-bold sm:text-[38px]">Hotel Booking</h1>
            <p className="mx-auto mt-2 max-w-[560px] text-[15px] text-white/80">
              Handpicked hotels across every Honor Tour & Travels destination — from heritage stays to beach
              resorts and mountain retreats.
            </p>
          </div>
        </section>

        {/* =====================================================
            DESTINATIONS
        ===================================================== */}
        <section className="px-3 py-12 sm:px-6 lg:px-0">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="text-center">
              <h2 className="text-[24px] font-bold text-[#0F172A] sm:text-[28px]">
                Choose Your Destination
              </h2>
              <p className="mt-2 text-[14px] text-[#60646C]">
                Pick a city to see the hotels available there.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {cities.map((city) => (
                <HotelCityCard key={city.citySlug} city={city} />
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            BENEFITS
        ===================================================== */}
        <section className="bg-[#F7F9FC] px-3 py-12 sm:px-6 lg:px-0">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-center text-[24px] font-bold text-[#0F172A] sm:text-[28px]">
              Why book hotels with Honor Tour & Travels?
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-[14px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F7F5] text-[#17BEBB]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-3 text-[14px] font-semibold text-[#0F172A]">{title}</h3>
                  <p className="mt-1 text-[13px] leading-[1.6] text-[#6B7280]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FAQ
        ===================================================== */}
        <section className="px-3 py-12 sm:px-6 lg:px-0">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="text-center">
              <h2 className="text-[24px] font-bold text-[#0F172A] sm:text-[28px]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-8">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
