"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FlightFAQ({ faqs, heading = "Frequently Asked Questions", subheading }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="px-3 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="text-center">
          <h2 className="text-[26px] font-bold text-[#0F172A] sm:text-[30px]">{heading}</h2>
          {subheading && <p className="mt-2 text-[13px] text-[#60646C]">{subheading}</p>}
        </div>

        <div className="mx-auto mt-8 w-full max-w-[900px] space-y-3">
          {faqs.map((faq, idx) => (
            <div key={faq.question} className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
              <button
                type="button"
                aria-expanded={openIdx === idx}
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="flex w-full items-center justify-between bg-white p-4 text-left transition-colors hover:bg-[#FAFAFA] sm:p-5"
              >
                <span className="text-left text-[13px] font-semibold text-[#0F172A] sm:text-[14px]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-[#60646C] transition-transform ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5">
                  <p className="text-[13px] leading-[1.6] text-[#4B5563]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
