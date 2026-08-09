import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { getDepartureCity, getDepartureCityParams } from "@/data/departureCities";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return getDepartureCityParams();
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const result = getDepartureCity(city);

  if (!result) {
    return buildMetadata({
      title: "Tour Packages Not Found",
      description: "The departure city you are looking for is not available.",
      path: `/tour-packages-from/${city}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `Tour Packages From ${result.raw.name} | Honor Tour & Travels`,
    description: `Explore all-inclusive tour packages from ${result.raw.name} with domestic and international holidays, guided tours, sightseeing, stays and convenient departures with Honor Tour & Travels.`,
    path: `/tour-packages-from/${city}`,
  });
}

export default async function DepartureCityPage({ params }) {
  const { city } = await params;
  const result = getDepartureCity(city);

  if (!result) {
    notFound();
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: `Tour Packages From ${result.raw.name}`, href: `/tour-packages-from/${city}` },
        ])}
      />
      <Header />
      <Navbar />

      <main>
        <TourCategoryPage config={result.config} />
      </main>

      <Footer />
    </>
  );
}
