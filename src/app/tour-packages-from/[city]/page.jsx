import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { getDepartureCity, getDepartureCityParams } from "@/data/departureCities";

export function generateStaticParams() {
  return getDepartureCityParams();
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const result = getDepartureCity(city);

  if (!result) {
    return { title: "Tour Packages" };
  }

  return {
    title: `Tour Packages From ${result.raw.name} | Travel World`,
    description: `Explore all-inclusive tour packages from ${result.raw.name} with domestic and international holidays, guided tours, sightseeing, stays and convenient departures with Travel World.`,
  };
}

export default async function DepartureCityPage({ params }) {
  const { city } = await params;
  const result = getDepartureCity(city);

  if (!result) {
    notFound();
  }

  return (
    <>
      <Header />
      <Navbar />

      <main>
        <TourCategoryPage config={result.config} />
      </main>

      <Footer />
    </>
  );
}
