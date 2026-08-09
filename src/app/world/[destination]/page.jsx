import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { getDestination, getDestinationParams } from "@/data/destinations";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return getDestinationParams("world");
}

export async function generateMetadata({ params }) {
  const { destination } = await params;
  const result = getDestination("world", destination);

  if (!result) {
    return buildMetadata({
      title: "World Destination Not Found",
      description: "The destination you are looking for is not available.",
      path: `/world/${destination}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: result.raw.metaTitle,
    description: result.raw.metaDescription,
    path: `/world/${destination}`,
  });
}

export default async function WorldDestinationPage({ params }) {
  const { destination } = await params;
  const result = getDestination("world", destination);

  if (!result) {
    notFound();
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "World", href: "/world" },
          { name: result.raw.name, href: `/world/${destination}` },
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
