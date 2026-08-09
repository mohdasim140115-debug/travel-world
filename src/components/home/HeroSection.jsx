

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
    <section className="mt-1.5 w-full">
      <div
        className="relative overflow-hidden rounded-[12px] border border-[#F0A93A]/30 p-2.5 md:px-8 md:py-4 lg:px-10 lg:py-4"
        style={{
          background: "linear-gradient(135deg, #FFF3DC 0%, #FFEACB 55%, #FFF8EC 100%)",
        }}
      >

        {/* TOP CONTENT */}
        <div className="relative z-10 flex items-start justify-between gap-1.5 md:flex-col md:gap-5 lg:flex-row lg:items-start lg:justify-between">

          {/* LEFT CONTENT */}
          <div className="max-w-[64%] md:max-w-140">
            <p className="hidden text-[14px] font-semibold uppercase tracking-[0.28em] text-[#0F172A] md:block">
              Premium travel experiences
            </p>

            <h1 className="max-md:animate-[heroFadeIn_0.6s_ease-out] max-md:text-[20px] max-md:font-bold text-[#0F172A] leading-[1.15] md:mt-2 md:whitespace-nowrap md:text-[28px] md:font-black">
              {homeData.hero.title
                .split(" ")
                .slice(0, 2)
                .join(" ")}{" "}
              <span className="text-[#0F172A]">Tours</span>
            </h1>

            <p className="mt-0.5 max-md:animate-[heroFadeIn_0.8s_ease-out] text-[12px] italic text-[#3A2A0F] md:mt-2 md:text-[16px]">
              {homeData.hero.tagline}
            </p>
          </div>

          {/* RIGHT DECORATION */}
          <div className="relative h-[42px] w-[42px] flex-shrink-0 md:h-[110px] md:w-full md:max-w-[320px] md:flex-shrink md:self-end lg:self-auto">

            {/* HOT AIR BALLOON */}
            <svg
              viewBox="0 0 200 260"
              className="absolute right-0 top-0 h-[42px] w-[34px] max-md:animate-[heroFloat_3s_ease-in-out_infinite] md:right-2 md:h-[100px] md:w-[80px] lg:h-[115px] lg:w-[92px]"
            >
              <defs>
                <clipPath id="balloonClip">
                  <ellipse cx="100" cy="95" rx="68" ry="82" />
                </clipPath>
              </defs>

              <g clipPath="url(#balloonClip)">
                <rect x="10" y="10" width="20" height="170" fill="#D62839" />
                <rect x="30" y="10" width="20" height="170" fill="#FBB627" />
                <rect x="50" y="10" width="20" height="170" fill="#17BEBB" />
                <rect x="70" y="10" width="20" height="170" fill="#0F4C81" />
                <rect x="90" y="10" width="20" height="170" fill="#4DA8DA" />
                <rect x="110" y="10" width="20" height="170" fill="#17BEBB" />
                <rect x="130" y="10" width="20" height="170" fill="#FBB627" />
                <rect x="150" y="10" width="20" height="170" fill="#D62839" />
              </g>

              <ellipse
                cx="100"
                cy="95"
                rx="68"
                ry="82"
                fill="none"
                stroke="#0F172A"
                strokeOpacity="0.15"
                strokeWidth="2"
              />

              <path d="M62 168 L38 210" stroke="#3A2A0F" strokeWidth="2" fill="none" />
              <path d="M138 168 L162 210" stroke="#3A2A0F" strokeWidth="2" fill="none" />
              <path d="M80 172 L48 210" stroke="#3A2A0F" strokeWidth="2" fill="none" />
              <path d="M120 172 L152 210" stroke="#3A2A0F" strokeWidth="2" fill="none" />

              <rect x="42" y="208" width="116" height="34" rx="6" fill="#7A5230" />
              <line x1="42" y1="220" x2="158" y2="220" stroke="#5C3E24" strokeWidth="1.5" />
              <line x1="42" y1="230" x2="158" y2="230" stroke="#5C3E24" strokeWidth="1.5" />
              <line x1="75" y1="208" x2="75" y2="242" stroke="#5C3E24" strokeWidth="1.5" />
              <line x1="125" y1="208" x2="125" y2="242" stroke="#5C3E24" strokeWidth="1.5" />
            </svg>

            {/* SENIORS DAY BADGE */}
            <div className="absolute left-0 top-0 hidden flex-col items-center md:flex">
              <div className="h-3 w-px bg-[#3A2A0F]/50" />
              <div className="flex h-[46px] w-[70px] flex-col items-center justify-center rounded-[14px] bg-[#0F172A] px-1.5 text-center shadow-lg">
                <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#FBB627]">
                  21st Aug
                </span>

                <span className="text-[8px] font-semibold leading-[1.1] text-white">
                  Celebrate Seniors&apos; Day!
                </span>
              </div>
            </div>

            {/* ANTARCTICA BADGE */}
            <div className="absolute right-1 top-6 hidden flex-col items-center md:flex">
              <div className="h-3 w-px bg-[#3A2A0F]/50" />
              <div className="flex h-[48px] w-[76px] flex-col items-center justify-center rounded-[14px] bg-[#0F172A] px-1.5 text-center shadow-lg">
                <span className="text-[8px] font-semibold uppercase tracking-[0.13em] text-white">
                  Visit the 7th
                </span>

                <span className="text-[8px] font-semibold leading-[1.1] text-[#FBB627]">
                  continent Antarctica
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TOUR CARDS */}
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar snap-x snap-mandatory md:mt-4 md:grid md:overflow-visible md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card) => {
            const href = getTourLink(card.title);

            return (
              <div
                key={card.title}
                className="group min-w-[190px] max-w-[190px] flex-shrink-0 snap-start rounded-[14px] border border-[#E5E7EB] bg-white p-2 shadow-[0_2px_10px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#17BEBB] hover:shadow-lg md:min-w-0 md:max-w-none md:rounded-[16px] md:px-4 md:py-3"
              >
                {/* CARD TITLE */}
                <h2 className="text-[14px] font-semibold leading-tight text-[#0F172A] md:text-[16px]">
                  {card.title}
                </h2>

                {/* CARD SUBTITLE */}
                <p className="mt-0.5 text-[11px] leading-snug text-[#475569] md:mt-1 md:text-[11px] md:leading-snug">
                  {card.subtitle}
                </p>

                {/* VIEW TOURS BUTTON */}
                {href !== "#" ? (
                  <Link
                    href={href}
                    className="mt-2 flex h-[36px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#FBB627] text-[12px] font-semibold text-[#0F172A] shadow-md shadow-amber-900/20 transition-all duration-200 hover:bg-[#F0A93A] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 md:mt-4 md:h-[35px] md:text-[13px]"
                  >
                    View Tours

                    <ArrowRight className="h-3.5 w-3.5 md:h-3.5 md:w-3.5" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="mt-2 flex h-[36px] w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#FBB627] text-[12px] font-semibold text-[#0F172A] shadow-md shadow-amber-900/20 transition-all duration-200 hover:bg-[#F0A93A] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 md:mt-4 md:h-[35px] md:text-[13px]"
                  >
                    View Tours

                    <ArrowRight className="h-3.5 w-3.5 md:h-3.5 md:w-3.5" />
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
