import { notFound, permanentRedirect } from "next/navigation";
import { resolveSlug } from "@/lib/slugHistory";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { getDestination, getDestinationParams } from "@/data/destinations";
import { getDestinationParamsFromDb, getDestinationRecords } from "@/lib/destinations";
import { getAllPackages } from "@/lib/packages";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  const fromDb = await getDestinationParamsFromDb("world");
  return fromDb.length ? fromDb : getDestinationParams("world");
}

export async function generateMetadata({ params }) {
  const { destination } = await params;
  const result = getDestination("world", destination, await getDestinationRecords(), await getAllPackages());

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
  const result = getDestination("world", destination, await getDestinationRecords(), await getAllPackages());

  if (!result) {
    // A renamed destination keeps its old link working.
    const renamed = await resolveSlug("destination", destination);
    if (renamed) permanentRedirect(`/world/${renamed}`);

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
      <Navbar />

      <main>
        <TourCategoryPage config={result.config} />
      </main>

      <Footer />
    </>
  );
}
