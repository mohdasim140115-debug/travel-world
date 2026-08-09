import { Plane } from "lucide-react";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FlightSearchForm from "@/components/flights/FlightSearchForm";
import PopularFlightRoutes from "@/components/flights/PopularFlightRoutes";
import FlightBenefits from "@/components/flights/FlightBenefits";
import FlightBookingSteps from "@/components/flights/FlightBookingSteps";
import FlightFAQ from "@/components/flights/FlightFAQ";
import { getPopularRoutes } from "@/data/flightRoutes";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flight Booking Online | Domestic & International Flights",
  description:
    "Search and book domestic and international flights with Honor Tour & Travels. Compare airlines, timings and fares across popular routes and combine flights with holiday packages.",
  path: "/flights",
});

const faqs = [
  {
    question: "How can I find the cheapest flight tickets online?",
    answer:
      "Comparing multiple airlines, being flexible with travel dates and booking in advance are the best ways to find lower fares on our flight search.",
  },
  {
    question: "What documents are required for online flight booking?",
    answer:
      "A valid government-issued photo ID is required for domestic travel, while a valid passport and visa (where applicable) are required for international flights.",
  },
  {
    question: "Are there any flight ticket booking offers available?",
    answer:
      "Offers vary by airline and season. Our travel experts can share current deals available on your selected route at the time of booking.",
  },
  {
    question: "Does Honor Tour & Travels offer domestic and international flight booking?",
    answer:
      "Yes, Honor Tour & Travels assists with both domestic and international flight bookings, either standalone or bundled with our holiday packages.",
  },
  {
    question: "How early should I book my flight?",
    answer:
      "Booking 4 to 8 weeks in advance for domestic routes and 2 to 4 months in advance for international routes generally offers the best fare availability.",
  },
  {
    question: "Can I change or cancel my flight booking?",
    answer:
      "Change and cancellation policies depend on the airline and fare type selected. Our team will share the applicable terms before you confirm your booking.",
  },
];

export default function FlightsPage() {
  const routes = getPopularRoutes();

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Flights", href: "/flights" },
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
          <Plane className="pointer-events-none absolute right-6 top-8 h-24 w-24 rotate-45 text-white/10 sm:h-32 sm:w-32" />

          <div className="relative mx-auto w-full max-w-[1280px]">
            <div className="text-center text-white">
              <h1 className="text-[30px] font-bold sm:text-[38px]">
                Book Domestic &amp; International Flights
              </h1>
              <p className="mt-2 text-[15px] text-white/80">
                Search flights across popular Indian and international routes.
              </p>
            </div>

            <div className="mt-6">
              <FlightSearchForm initialFrom="Mumbai" initialTo="Delhi" />
            </div>
          </div>
        </section>

        {/* =====================================================
            INTRO BOX
        ===================================================== */}
        <section className="px-3 py-10 sm:px-6 lg:px-0">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="rounded-[14px] border border-[#E5E7EB] bg-[#F7FAFC] p-5">
              <h2 className="text-[16px] font-bold text-[#0F172A]">
                Book Flight Tickets Online with Honor Tour & Travels
              </h2>
              <p className="mt-2 text-[12px] leading-[1.7] text-[#4B5563]">
                Whether you are planning a quick domestic getaway or a long-haul international
                holiday, Honor Tour & Travels makes it simple to compare flight timings, airlines and
                fares across popular routes. Search by city, filter by stops or preferred
                airline, and get in touch with our travel experts to confirm your booking —
                or combine your flights with one of our curated group tours for a
                completely planned holiday experience.
              </p>
            </div>
          </div>
        </section>

        <PopularFlightRoutes routes={routes} />
        <FlightBenefits />
        <FlightBookingSteps />
        <FlightFAQ faqs={faqs} subheading="We help you prepare for your trip and answer commonly asked flight booking questions." />
      </main>

      <Footer />
    </>
  );
}
