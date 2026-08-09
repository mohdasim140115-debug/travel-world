import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import QuickLinksBar from "@/components/layout/QuickLinksBar";
import HeroSection from "@/components/home/HeroSection";
import DestinationStrip from "@/components/home/DestinationStrip";
import LiveTours from "@/components/home/LiveTours";
import ChinaPromo from "@/components/home/ChinaPromo";
import MostLovedTours from "@/components/home/MostLovedTours";
import TrustReviews from "@/components/home/TrustReviews";
import FeaturedTour from "@/components/home/FeaturedTour";
import ContinueTravel from "@/components/home/ContinueTravel";
import DepartureCities from "@/components/home/DepartureCities";
import PartnerBanner from "@/components/home/PartnerBanner";
import TourInclusions from "@/components/home/TourInclusions";
import SeoContent from "@/components/home/SeoContent";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Honor Tour & Travels | India & International Tour Packages, Flights, Hotels",
  description:
    "Book handpicked India and world tour packages, flights, hotels and transport with Honor Tour & Travels — transparent pricing, curated itineraries and 24x7 support.",
  path: "/",
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0F172A]">
      <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      <Header />
      <Navbar />
      <main className="mx-auto flex w-full max-w-[1280px] flex-col px-3 pb-16 sm:px-6 lg:px-0">
        <QuickLinksBar />
        <HeroSection />
        <DestinationStrip />
        <div className="mt-12" />
        <LiveTours />
        <div className="mt-12" />
        <ChinaPromo />
        <div className="mt-12" />
        <MostLovedTours />
        <div className="mt-12" />
        <TrustReviews />
        <div className="mt-12" />
        <FeaturedTour />
        <div className="mt-12" />
        <ContinueTravel />
        <div className="mt-12" />
        <DepartureCities />
        <div className="mt-12" />
        <PartnerBanner />
        <div className="mt-12" />
        <TourInclusions />
        <div className="mt-12" />
        <SeoContent />
        <div className="mt-12" />
        <FAQ />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
