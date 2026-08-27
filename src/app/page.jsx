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
import TourInclusions from "@/components/home/TourInclusions";
import SeoContent from "@/components/home/SeoContent";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, organizationSchema, websiteSchema } from "@/lib/seo";
import { getHomeContent } from "@/lib/homeContent";

export const metadata = buildMetadata({
  title: "Honor Tour & Travels | India & International Tour Packages, Flights, Hotels",
  description:
    "Book handpicked India and world tour packages, flights, hotels and transport with Honor Tour & Travels — transparent pricing, curated itineraries and 24x7 support.",
  path: "/",
});

export default async function Home() {
  const content = await getHomeContent();

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0F172A]">
      <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      <Header />
      <Navbar />
      <QuickLinksBar />
      <HeroSection cards={content.heroCards} destinations={content.destinations} />

      <main className="mx-auto flex w-full max-w-[1280px] flex-col pb-16">
        <DestinationStrip destinations={content.destinations} />
        <LiveTours cards={content.liveTourCards} trustReviews={content.trustReviews} />
        <ChinaPromo promoPackages={content.chinaPromoPackages} />
        <MostLovedTours
          promoDestinations={content.mostLovedPromoDestinations}
          destinations={content.mostLovedDestinations}
        />
        <TrustReviews stats={content.trustStats} reviews={content.trustReviews} />
        <FeaturedTour slides={content.featuredTours} />
        <ContinueTravel tours={content.continueTravelTours} />
        <DepartureCities cities={content.departureCities} />
        <TourInclusions features={content.tourInclusionFeatures} />
        <SeoContent />
        <FAQ content={content.faq} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
