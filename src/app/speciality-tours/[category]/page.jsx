import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { getSpecialityConfig, getSpecialitySlugs } from "@/data/specialityTours";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return getSpecialitySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const config = getSpecialityConfig(category);
  if (!config) {
    return buildMetadata({
      title: "Speciality Tour Not Found",
      description: "The speciality tour category you are looking for is not available.",
      path: `/speciality-tours/${category}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${config.heading} | Speciality Tours`,
    description: config.intro,
    path: `/speciality-tours/${category}`,
  });
}

export default async function SpecialityCategoryPage({ params }) {
  const { category } = await params;
  const config = getSpecialityConfig(category);

  if (!config) {
    notFound();
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Speciality Tours", href: "/speciality-tours" },
          { name: config.heading, href: `/speciality-tours/${category}` },
        ])}
      />
      <Header />
      <Navbar />

      <main>
        <TourCategoryPage config={config} />
      </main>

      <Footer />
    </>
  );
}
