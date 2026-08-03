import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { getDestination, getDestinationParams } from "@/data/destinations";

export function generateStaticParams() {
  return getDestinationParams("india");
}

export async function generateMetadata({ params }) {
  const { destination } = await params;
  const result = getDestination("india", destination);

  if (!result) {
    return { title: "India Destination" };
  }

  return {
    title: result.raw.metaTitle,
    description: result.raw.metaDescription,
  };
}

export default async function IndiaDestinationPage({ params }) {
  const { destination } = await params;
  const result = getDestination("india", destination);

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
