import { Car, ShieldCheck, Clock3, Wallet } from "lucide-react";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQAccordion from "@/components/common/FAQAccordion";
import PopularTransportRoutes from "@/components/transport/PopularTransportRoutes";
import { db } from "@/lib/db";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Car & Bus Transport Booking | Honor Tour & Travels",
  description:
    "Book comfortable cars, SUVs, tempo travellers and luxury coaches for your local, outstation or group travel needs with Honor Tour & Travels.",
  path: "/transport",
});

const benefits = [
  {
    icon: Car,
    title: "Wide Vehicle Range",
    description: "From compact sedans to full-size coaches for every group size.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Drivers",
    description: "Experienced, background-verified drivers for a safe journey.",
  },
  {
    icon: Clock3,
    title: "On-Time Pickup",
    description: "Punctual pickups and drop-offs, tracked from start to finish.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "No hidden charges — base price and per-km rate shown upfront.",
  },
];

const faqs = [
  {
    question: "How is the total fare for my trip calculated?",
    answer:
      "Each vehicle has a base price covering a minimum distance, plus a per-kilometre rate beyond that. Our team will share the exact fare for your route before confirming the booking.",
  },
  {
    question: "Can I book a car or bus for a one-way trip?",
    answer:
      "Yes, we support one-way, round-trip and multi-day outstation bookings for both cars and buses.",
  },
  {
    question: "Are the drivers verified?",
    answer:
      "Yes, all drivers are experienced and background-verified before being assigned to a Honor Tour & Travels booking.",
  },
  {
    question: "Can I combine transport booking with a tour package?",
    answer:
      "Absolutely — many of our group tours already include on-tour transport, and standalone transport can be added to any customized holiday.",
  },
];

export default async function TransportPage() {
  const routes = await db.transportRoute.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Transport", href: "/transport" },
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
          <Car className="pointer-events-none absolute right-6 top-8 h-24 w-24 text-white/10 sm:h-32 sm:w-32" />

          <div className="relative mx-auto w-full max-w-[1280px] text-center text-white">
            <h1 className="text-[30px] font-bold sm:text-[38px]">
              Car &amp; Bus Transport Booking
            </h1>
            <p className="mx-auto mt-2 max-w-[560px] text-[15px] text-white/80">
              Comfortable cars, SUVs, tempo travellers and luxury coaches for local trips, outstation
              travel and group tours.
            </p>
          </div>
        </section>

        {/* =====================================================
            POPULAR ROUTES
        ===================================================== */}
        <section className="px-3 py-12 sm:px-6 lg:px-0">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="text-center">
              <h2 className="text-[24px] font-bold text-[#0F172A] sm:text-[28px]">
                Popular Transport Routes
              </h2>
              <p className="mt-2 text-[14px] text-[#60646C]">
                Pick your route to see car and bus options with pricing for that journey.
              </p>
            </div>

            <div className="mt-8">
              <PopularTransportRoutes routes={routes} />
            </div>
          </div>
        </section>

        {/* =====================================================
            BENEFITS
        ===================================================== */}
        <section className="bg-[#F7F9FC] px-3 py-12 sm:px-6 lg:px-0">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-center text-[24px] font-bold text-[#0F172A] sm:text-[28px]">
              Why book transport with Honor Tour & Travels?
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
