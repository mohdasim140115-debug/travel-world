import { Gift, Mail, Phone, Sparkles, Ticket, Users } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FAQAccordion from "@/components/common/FAQAccordion";
import EnquiryTrigger from "@/components/common/EnquiryTrigger";
import JsonLd from "@/components/common/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { CONTACT } from "@/lib/contact";

export const metadata = buildMetadata({
  title: "Travel Gift Cards | Honor Tour & Travels",
  description:
    "Gift a holiday with Honor Tour & Travels gift cards. Choose a value, personalise the message, and let them pick any tour, hotel or flight booking with us.",
  path: "/gift-cards",
});

const amounts = [
  { value: "₹5,000", note: "A weekend getaway nudge" },
  { value: "₹10,000", note: "Covers a short domestic trip" },
  { value: "₹25,000", note: "A solid start on a family holiday" },
  { value: "Custom", note: "Any amount you choose" },
];

const highlights = [
  {
    icon: Ticket,
    title: "Use on anything",
    description: "Tour packages, hotel stays, flights or transport — the balance works across every booking we handle.",
  },
  {
    icon: Users,
    title: "Perfect for groups",
    description: "Friends and family can pool multiple gift cards towards one big trip.",
  },
  {
    icon: Sparkles,
    title: "Personalised",
    description: "We add the recipient's name and your message before sending it across.",
  },
];

const faqs = [
  {
    question: "How do I buy a gift card?",
    answer:
      "Send us an enquiry with the amount and the recipient's name. Our team confirms the details, shares the payment options, and issues the gift card once payment is received.",
  },
  {
    question: "How is the gift card delivered?",
    answer:
      "By email to the recipient, or to you if you would like to hand it over yourself. Tell us which you prefer when you enquire.",
  },
  {
    question: "How long is a gift card valid?",
    answer:
      "One year from the date of issue. The exact validity is printed on the card itself.",
  },
  {
    question: "Can the balance be used across more than one booking?",
    answer:
      "Yes. If a booking costs less than the card value, the remaining balance stays on the card until it is used or expires.",
  },
  {
    question: "Is a gift card refundable?",
    answer:
      "Gift cards cannot be exchanged for cash, but they can be transferred to another person before they are used. Write to us and we will update the name.",
  },
];

export default function GiftCardsPage() {
  return (
    <>
      <Navbar />

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Gift Cards", href: "/gift-cards" },
        ])}
      />

      <main className="flex-1 bg-[#F7FAFC]">

        {/* HERO */}
        <section className="bg-[#0B3B63] text-white">
          <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5EEAD4]">
                  <Gift className="h-3.5 w-3.5" />
                  Gift Cards
                </span>

                <h1 className="mt-3 text-[26px] font-bold leading-tight sm:text-[34px]">
                  Give a holiday, not another gift box
                </h1>

                <p className="mt-3 max-w-[560px] text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
                  An Honor Tour &amp; Travels gift card lets someone pick the trip they actually
                  want — a hill-station weekend, a family tour, a hotel stay or flights. You
                  choose the value, we handle the rest.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <EnquiryTrigger
                    subject="Gift card purchase"
                    className="flex h-[46px] items-center gap-2 rounded-full bg-[#FF7A1A] px-6 text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:bg-[#E56A0F]"
                  >
                    <Gift className="h-4 w-4" />
                    Buy a Gift Card
                  </EnquiryTrigger>

                  <a
                    href={CONTACT.phoneHref}
                    className="flex h-[46px] items-center gap-2 rounded-full border border-white/25 px-6 text-[14px] font-semibold text-white no-underline transition hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              {/* CARD MOCK */}
              <div className="relative mx-auto w-full max-w-[420px]">
                <div className="rounded-[18px] bg-gradient-to-br from-[#17BEBB] to-[#0F4C81] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Travel Gift Card</p>
                      <p className="mt-1 text-[18px] font-bold">Honor Tour &amp; Travels</p>
                    </div>
                    <Gift className="h-7 w-7 text-white/80" />
                  </div>

                  <p className="mt-8 text-[30px] font-bold tracking-tight">₹ 10,000</p>
                  <p className="mt-1 text-[12px] text-white/75">Redeemable on any booking</p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-3 text-[11px] text-white/70">
                    <span>Valid 12 months</span>
                    <span>honortourandtravels.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AMOUNTS */}
        <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <h2 className="text-[20px] font-bold text-[#0F172A] sm:text-[24px]">Choose an amount</h2>
          <p className="mt-1.5 text-[13.5px] text-[#475569]">
            Pick one of these, or tell us any figure that suits you.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {amounts.map((amount) => (
              <div
                key={amount.value}
                className="rounded-[14px] border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.05)]"
              >
                <p className="text-[22px] font-bold text-[#0F4C81]">{amount.value}</p>
                <p className="mt-1.5 text-[13px] text-[#475569]">{amount.note}</p>
                <EnquiryTrigger
                  subject={`Gift card — ${amount.value}`}
                  className="mt-4 flex h-[40px] w-full items-center justify-center rounded-[10px] border border-[#0F4C81] text-[13px] font-semibold text-[#0F4C81] transition hover:bg-[#EEF3FF]"
                >
                  Enquire Now
                </EnquiryTrigger>
              </div>
            ))}
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-[14px] border border-[#E2E8F0] bg-[#F7FAFC] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F4C81] text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-[15px] font-semibold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#475569]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <h2 className="text-[20px] font-bold text-[#0F172A] sm:text-[24px]">How it works</h2>

          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              { step: "1", title: "Send an enquiry", text: "Tell us the amount, the recipient's name and your message." },
              { step: "2", title: "Confirm and pay", text: "We share the payment options and confirm the order with you." },
              { step: "3", title: "Card delivered", text: "The personalised gift card reaches the recipient by email." },
            ].map((item) => (
              <li key={item.step} className="rounded-[14px] border border-[#E2E8F0] bg-white p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#17BEBB] text-[14px] font-bold text-white">
                  {item.step}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold text-[#0F172A]">{item.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#475569]">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="mx-auto max-w-[900px] px-4 py-10 sm:px-6 sm:py-12">
            <h2 className="text-[20px] font-bold text-[#0F172A] sm:text-[24px]">Gift card FAQs</h2>
            <div className="mt-5">
              <FAQAccordion items={faqs} />
            </div>

            <div className="mt-8 rounded-[14px] border border-[#E2E8F0] bg-[#F7FAFC] p-5 text-center">
              <p className="text-[14px] font-semibold text-[#0F172A]">Still have a question?</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[13.5px]">
                <a href={CONTACT.phoneHref} className="flex items-center gap-1.5 font-semibold text-[#0F4C81] no-underline">
                  <Phone className="h-4 w-4" />
                  {CONTACT.phone}
                </a>
                <a href={CONTACT.emailHref} className="flex items-center gap-1.5 font-semibold text-[#0F4C81] no-underline">
                  <Mail className="h-4 w-4" />
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
