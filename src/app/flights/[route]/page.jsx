import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Plane } from "lucide-react";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FlightSearchForm from "@/components/flights/FlightSearchForm";
import FlightResults from "@/components/flights/FlightResults";
import FlightRouteContent from "@/components/flights/FlightRouteContent";
import FlightFAQ from "@/components/flights/FlightFAQ";
import { getAllRouteSlugs, getRoute, getRouteFaqs } from "@/data/flightRoutes";

export function generateStaticParams() {
  return getAllRouteSlugs();
}

export async function generateMetadata({ params }) {
  const { route: slug } = await params;
  const route = getRoute(slug);

  if (!route) {
    return { title: "Flight Route" };
  }

  return {
    title: `${route.from} to ${route.to} Flights | Flight Tickets & Booking`,
    description: route.description,
  };
}

export default async function FlightRoutePage({ params }) {
  const { route: slug } = await params;
  const route = getRoute(slug);

  if (!route) {
    notFound();
  }

  const otherRouteObjects = (route.otherRoutes || [])
    .map((otherSlug) => getRoute(otherSlug))
    .filter((item) => item && item.slug !== route.slug);

  const faqs = getRouteFaqs(route);

  return (
    <>
      <Header />
      <Navbar />

      <main className="bg-white">
        {/* =====================================================
            ROUTE HERO
        ===================================================== */}
        <section className="relative overflow-hidden bg-[#071426] px-4 pb-8 pt-6 sm:px-6 lg:px-0">
          <Plane className="pointer-events-none absolute right-6 top-6 h-20 w-20 rotate-45 text-white/10" />

          <div className="relative mx-auto w-full max-w-[1280px]">
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-300">
              <Link href="/" className="hover:text-[#60A5FA]">Home</Link>
              <ChevronRight size={11} />
              <Link href="/flights" className="hover:text-[#60A5FA]">Flights</Link>
              <ChevronRight size={11} />
              <span className="text-white">{route.from} to {route.to}</span>
            </div>

            <h1 className="mt-3 text-[24px] font-bold text-white sm:text-[28px]">
              {route.from} to {route.to} Flights
            </h1>

            <div className="mt-2 flex items-center gap-3 text-[13px] font-semibold text-white">
              <span>{route.fromCode} → {route.toCode}</span>
              <span className="text-slate-400">|</span>
              <span>{route.from} to {route.to}</span>
            </div>

            <p className="mt-2 max-w-[760px] text-[12px] leading-[1.7] text-slate-300">
              {route.description}
            </p>

            <div className="mt-5">
              <FlightSearchForm initialFrom={route.from} initialTo={route.to} compact />
            </div>
          </div>
        </section>

        <FlightResults route={route} />

        <FlightRouteContent route={{ ...route, otherRouteObjects }} />

        <FlightFAQ
          faqs={faqs}
          subheading={`We help you prepare for your ${route.from} to ${route.to} flight and answer commonly asked questions.`}
        />
      </main>

      <Footer />
    </>
  );
}
