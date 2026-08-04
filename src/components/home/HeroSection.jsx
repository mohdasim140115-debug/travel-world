

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/homeData";

const cardData = homeData.hero.cards;

export default function HeroSection() {
  // Card ke title ke according page URL
  const getTourLink = (title) => {
    switch (title) {
      case "India Tours":
        return "/india";

      case "World Tours":
        return "/world";

      case "Women's Special Tours":
        return "/womens-special";

      case "Seniors' Special Tours":
        return "/seniors-special";

      default:
        return "#";
    }
  };

  return (
    <section className="mt-2 w-full">
      <div
        className="relative overflow-hidden rounded-[12px] border border-[#20B8B5]/40 px-5 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6"
        style={{
          background: "linear-gradient(135deg, #FFF9F0 0%, #EFF9F8 55%, #E4F5F2 100%)",
        }}
      >
        
        {/* TOP CONTENT */}
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          
          {/* LEFT CONTENT */}
          <div className="max-w-[500px]">
            <p className="text-[14px] font-semibold uppercase tracking-[0.28em] text-[#008C95]">
              Premium travel experiences
            </p>

            <h1 className="mt-3 text-[36px] font-black leading-[1.05] text-[#183B3D] sm:text-[48px]">
              {homeData.hero.title
                .split(" ")
                .slice(0, 2)
                .join(" ")}{" "}
              <span className="text-[#183B3D]">Tours</span>
            </h1>

            <p className="mt-4 text-[18px] italic text-[#667A7B] sm:text-[20px]">
              {homeData.hero.tagline}
            </p>
          </div>

          {/* RIGHT DECORATION */}
          <div className="relative h-[140px] w-full max-w-[320px] self-end lg:self-auto">
            
            <div className="absolute right-8 top-2 h-20 w-20 rounded-full border border-[#20B8B5] bg-[#E2F5F2]" />

            <div className="absolute right-0 top-8 h-28 w-28 rounded-[50%_50%_45%_55%] border border-[#7FE0D8] bg-[#008C95]" />

            <div className="absolute left-10 top-12 h-14 w-14 rounded-full bg-[#006D77]" />

            <div className="absolute left-0 top-20 h-16 w-16 rounded-full border border-[#7FE0D8] bg-white/70" />

            <div className="absolute bottom-1 left-12 h-4 w-20 rounded-full bg-[#006D77]/80" />

            {/* SENIORS DAY BADGE */}
            <div className="absolute right-12 top-0 flex h-[64px] w-[88px] flex-col items-center justify-center rounded-[18px] border border-[#20B8B5] bg-white/90 px-2 text-center shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#183B3D]">
                21st Aug
              </span>

              <span className="text-[11px] font-semibold leading-[1.1] text-[#183B3D]">
                Celebrate Seniors&apos; Day!
              </span>
            </div>

            {/* ANTARCTICA BADGE */}
            <div className="absolute bottom-0 right-0 flex h-[68px] w-[100px] flex-col items-center justify-center rounded-[18px] border border-[#20B8B5] bg-white/90 px-2 text-center shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#183B3D]">
                Visit the 7th
              </span>

              <span className="text-[11px] font-semibold leading-[1.1] text-[#183B3D]">
                continent Antarctica
              </span>
            </div>
          </div>
        </div>

        {/* TOUR CARDS */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card) => {
            const href = getTourLink(card.title);

            return (
              <div
                key={card.title}
                className="group rounded-[9px] border border-[#D8E7E5] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#20B8B5] hover:shadow-md"
              >
                {/* CARD TITLE */}
                <h2 className="text-[16px] font-semibold text-[#183B3D]">
                  {card.title}
                </h2>

                {/* CARD SUBTITLE */}
                <p className="mt-1 text-[13px] text-[#667A7B]">
                  {card.subtitle}
                </p>

                {/* VIEW TOURS BUTTON */}
                {href !== "#" ? (
                  <Link
                    href={href}
                    className="mt-4 flex h-[35px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#FF7A3D] text-[13px] font-semibold text-white shadow-sm shadow-orange-900/20 transition-all duration-200 hover:bg-[#EA642C] hover:shadow-md hover:-translate-y-0.5"
                  >
                    View Tours

                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="mt-4 flex h-[35px] w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-[#FF7A3D] text-[13px] font-semibold text-white shadow-sm shadow-orange-900/20 transition-all duration-200 hover:bg-[#EA642C] hover:shadow-md hover:-translate-y-0.5"
                  >
                    View Tours

                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}