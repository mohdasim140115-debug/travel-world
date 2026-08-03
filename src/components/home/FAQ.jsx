"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { homeData } from "@/data/homeData";

export default function FAQ() {
  const { faq } = homeData;
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="text-center">
          <h2 className="text-[24px] font-bold text-[#0B1F3A] sm:text-[28px]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-[13px] text-[#60646C]">
            We help you prepare for your trip and answer commonly asked travel questions.
          </p>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[900px] space-y-3">
          {faq.questions.map((q, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white"
            >
              <button
                type="button"
                aria-expanded={openIdx === idx}
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="flex w-full items-center justify-between bg-white p-4 text-left transition-colors hover:bg-[#FAFAFA] sm:p-5"
              >
                <span className="text-left text-[13px] font-semibold text-[#0B1F3A] sm:text-[14px]">
                  {q.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-[#60646C] transition-transform ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="border-t border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5">
                  <p className="text-[13px] leading-[1.6] text-[#4B5563]">
                    {q.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[13px] text-[#2B2B2B]">
            Have questions about
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {faq.categories.map((cat) => (
              <button
                key={cat}
                className="rounded-full border border-[#0B1F3A] px-4 py-2 text-[11px] font-semibold text-[#0B1F3A] transition hover:bg-[#071426] hover:text-white"
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-[#4B5563]">
            We've got you covered.
          </p>
          <button className="mt-4 rounded-full bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] shadow-sm shadow-blue-900/20 transition-all duration-200 hover:from-[#1D4ED8] hover:to-[#1E40AF] hover:shadow-md hover:-translate-y-0.5 px-6 py-2 text-[13px] font-bold text-white">
            View all FAQs
          </button>
        </div>
      </div>
    </section>
  );
}
