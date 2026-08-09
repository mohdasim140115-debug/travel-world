

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IndiaToursPage from "@/components/india/IndiaToursPage";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "India Tour Packages | Family, Group & Customized India Holidays",
  description:
    "Explore India tour packages, family holidays, group tours and customized India travel packages across Rajasthan, Kerala, Kashmir, Goa and more.",
  path: "/india",
});

export default function IndiaPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "India", href: "/india" },
        ])}
      />
      <Header />
      <Navbar />

      <main>
        <IndiaToursPage />
      </main>

      <Footer />
    </>
  );
}