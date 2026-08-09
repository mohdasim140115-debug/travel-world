import FAQAccordion from "@/components/common/FAQAccordion";

export default function FlightFAQ({ faqs, heading = "Frequently Asked Questions", subheading }) {
  return (
    <section className="px-3 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="text-center">
          <h2 className="text-[26px] font-bold text-[#0F172A] sm:text-[30px]">{heading}</h2>
          {subheading && <p className="mt-2 text-[14px] text-[#60646C]">{subheading}</p>}
        </div>

        <div className="mt-8">
          <FAQAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
