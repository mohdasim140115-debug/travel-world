import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FCF8F0] text-slate-900">
      <Header />
      <Navbar />
      <main className="mx-auto flex w-full max-w-[1280px] flex-col px-4 pb-16 sm:px-6 lg:px-0">
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
