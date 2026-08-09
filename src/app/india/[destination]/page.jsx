import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { getDestination, getDestinationParams } from "@/data/destinations";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return getDestinationParams("india");
}

export async function generateMetadata({ params }) {
  const { destination } = await params;
  const result = getDestination("india", destination);

  if (!result) {
    return buildMetadata({
      title: "India Destination Not Found",
      description: "The destination you are looking for is not available.",
      path: `/india/${destination}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: result.raw.metaTitle,
    description: result.raw.metaDescription,
    path: `/india/${destination}`,
  });
}

export default async function IndiaDestinationPage({ params }) {
  const { destination } = await params;
  const result = getDestination("india", destination);

  if (!result) {
    notFound();
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "India", href: "/india" },
          { name: result.raw.name, href: `/india/${destination}` },
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
