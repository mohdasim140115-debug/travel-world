import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import FAQAccordion from "@/components/common/FAQAccordion";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { CONTACT } from "@/lib/contact";

export const metadata = buildMetadata({
  title: "Contact Us | Honor Tour & Travels",
  description:
    "Talk to Honor Tour & Travels about tour packages, hotels, flights and transport. Call, WhatsApp or email us — we reply within one working day.",
  path: "/contact",
});

const faqs = [
  {
    question: "How quickly will I get a reply?",
    answer:
      "Calls are answered during working hours, and enquiries sent through the form are replied to within one working day.",
  },
  {
    question: "Can you plan a custom itinerary for my group?",
    answer:
      "Yes. Share your dates, group size and the places you want to cover, and we will build an itinerary and quote around them.",
  },
  {
    question: "Do you handle hotel and flight bookings separately?",
    answer:
      "We do. You can book a hotel, a flight or transport on its own — a full tour package is not required.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact Us", href: "/contact" },
        ])}
      />

      <main className="flex-1 bg-[#F7FAFC]">

        {/* HERO */}
        <section className="bg-[#0B3B63] text-white">
          <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5EEAD4]">
              <MessageCircle className="h-3.5 w-3.5" />
              Contact Us
            </span>

            <h1 className="mt-3 text-[26px] font-bold leading-tight sm:text-[34px]">
              Talk to a real travel planner
            </h1>

            <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
              Tell us where you want to go and when. We will put together the itinerary, the
              stay, the flights and the transport — and give you one clear price.
            </p>
          </div>
        </section>

        {/* CONTACT + FORM */}
        <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-0">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">

            {/* DETAILS */}
            <div className="space-y-4">
              <a
                href={CONTACT.phoneHref}
                className="flex items-start gap-3 rounded-[14px] border border-[#E2E8F0] bg-white p-5 no-underline transition hover:border-[#0F4C81]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#17BEBB] text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                    Call us
                  </span>
                  <span className="mt-0.5 block text-[16px] font-bold text-[#0F172A]">{CONTACT.phone}</span>
                  <span className="mt-0.5 block text-[13px] text-[#475569]">
                    Also on WhatsApp for quick questions.
                  </span>
                </span>
              </a>

              <a
                href={CONTACT.emailHref}
                className="flex items-start gap-3 rounded-[14px] border border-[#E2E8F0] bg-white p-5 no-underline transition hover:border-[#0F4C81]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0F4C81] text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                    Email us
                  </span>
                  <span className="mt-0.5 block break-words text-[15px] font-bold text-[#0F172A]">
                    {CONTACT.email}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-[#475569]">
                    Best for detailed itineraries and quotes.
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3 rounded-[14px] border border-[#E2E8F0] bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF7A1A] text-white">
                  <Clock3 className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                    Working hours
                  </p>
                  <p className="mt-0.5 text-[15px] font-bold text-[#0F172A]">Mon – Sat, 10:00 AM – 7:00 PM</p>
                  <p className="mt-0.5 text-[13px] text-[#475569]">
                    Sunday enquiries are answered the next working day.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-[14px] border border-[#E2E8F0] bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B3B63] text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
                    Honor Tour &amp; Travels
                  </p>
                  <p className="mt-0.5 text-[13.5px] leading-relaxed text-[#475569]">
                    Tour packages, hotels, flights and transport across India and abroad.
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div>
              <h2 className="text-[20px] font-bold text-[#0F172A] sm:text-[22px]">Send us a message</h2>
              <p className="mt-1.5 text-[13.5px] text-[#475569]">
                Fill this in and we will get back to you with a plan and a price.
              </p>
              <div className="mt-4">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 sm:py-12">
            <h2 className="text-[20px] font-bold text-[#0F172A] sm:text-[24px]">Before you write</h2>
            <div className="mt-5">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
