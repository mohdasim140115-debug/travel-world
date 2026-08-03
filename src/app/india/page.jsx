

import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IndiaToursPage from "@/components/india/IndiaToursPage";

export const metadata = {
  title: "India Tour Packages | Travel World",
  description:
    "Explore India tour packages, family holidays, group tours and customized India travel packages.",
};

export default function IndiaPage() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <IndiaToursPage />
      </main>

      <Footer />
    </>
  );
}