"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { homeData } from "@/data/homeData";

/* =========================================================
   ILLUSTRATED POSTER SLIDES
   No real photo assets are available in this project, so
   these three "poster" slides are hand-built inline SVGs
   (gradient sky + simple landmark shapes + the promotional
   copy baked directly into the artwork) rendered through a
   normal <img> with object-fit: cover — same as a real photo
   poster would be, just illustrated instead of photographic.
========================================================= */

function svgToDataUri(svg) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const bigTravelDaysPoster = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 620">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#082C4B"/>
      <stop offset="55%" stop-color="#0F4C81"/>
      <stop offset="100%" stop-color="#17BEBB"/>
    </linearGradient>
  </defs>
  <rect width="600" height="620" fill="url(#sky)"/>
  <circle cx="470" cy="110" r="65" fill="#FBB627" opacity="0.95"/>
  <path d="M0 420 Q150 375 300 420 T600 420 V620 H0 Z" fill="#0B3B63" opacity="0.55"/>
  <path d="M0 470 Q150 435 300 470 T600 470 V620 H0 Z" fill="#082C4B" opacity="0.85"/>
  <path d="M170 220 L230 185 L320 220 L270 238 L235 262 L210 246 Z" fill="#FFFFFF" opacity="0.9"/>
  <text x="300" y="300" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="900" fill="#FFFFFF" text-anchor="middle">BIG TRAVEL</text>
  <text x="300" y="352" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="900" fill="#FBB627" text-anchor="middle">DAYS ARE HERE!</text>
  <text x="300" y="392" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#FFFFFF" text-anchor="middle">Grab the best deals of the season</text>
  <rect x="205" y="425" width="190" height="46" rx="23" fill="#FF7A1A"/>
  <text x="300" y="455" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" text-anchor="middle">Explore Offers</text>
</svg>
`);

const europePoster = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 620">
  <defs>
    <linearGradient id="esky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F4C81"/>
      <stop offset="60%" stop-color="#4DA8DA"/>
      <stop offset="100%" stop-color="#A9D8F0"/>
    </linearGradient>
  </defs>
  <rect width="600" height="620" fill="url(#esky)"/>
  <rect x="0" y="420" width="600" height="200" fill="#082C4B" opacity="0.5"/>
  <rect x="270" y="230" width="12" height="190" fill="#FFFFFF" opacity="0.9"/>
  <path d="M240 285 L360 285 L340 258 L260 258 Z" fill="#FFFFFF" opacity="0.9"/>
  <path d="M255 335 L345 335 L330 308 Z" fill="#FFFFFF" opacity="0.9"/>
  <path d="M225 420 L375 420 L350 365 L250 365 Z" fill="#FFFFFF" opacity="0.9"/>
  <circle cx="110" cy="110" r="52" fill="#FBB627" opacity="0.9"/>
  <text x="300" y="170" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="900" fill="#FFFFFF" text-anchor="middle">EUROPE</text>
  <text x="300" y="205" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="#FFFFFF" text-anchor="middle">Switzerland &#8226; Paris &#8226; Italy &#8226; more</text>
  <rect x="150" y="465" width="300" height="70" rx="10" fill="#082C4B" opacity="0.85"/>
  <text x="300" y="495" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#FFFFFF" text-anchor="middle">Starting from</text>
  <text x="300" y="525" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="900" fill="#FBB627" text-anchor="middle">&#8377;1,45,000</text>
</svg>
`);

const chinaPoster = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 620">
  <defs>
    <linearGradient id="csky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7A2E10"/>
      <stop offset="45%" stop-color="#D62839"/>
      <stop offset="100%" stop-color="#FBB627"/>
    </linearGradient>
  </defs>
  <rect width="600" height="620" fill="url(#csky)"/>
  <path d="M0 380 L60 355 L120 380 L180 345 L240 380 L300 350 L360 380 L420 355 L480 380 L540 350 L600 380 V620 H0 Z" fill="#082C4B" opacity="0.5"/>
  <rect x="255" y="235" width="90" height="65" fill="#FFFFFF" opacity="0.9"/>
  <path d="M240 235 L360 235 L300 208 Z" fill="#FFFFFF" opacity="0.9"/>
  <rect x="270" y="300" width="60" height="50" fill="#FFFFFF" opacity="0.85"/>
  <path d="M258 300 L342 300 L300 278 Z" fill="#FFFFFF" opacity="0.85"/>
  <text x="300" y="150" font-family="Arial, Helvetica, sans-serif" font-size="60" font-weight="900" fill="#FFFFFF" text-anchor="middle">CHINA</text>
  <text x="300" y="188" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="#FFFFFF" text-anchor="middle">From the Great Wall to the Great Leap</text>
  <rect x="150" y="465" width="300" height="70" rx="10" fill="#082C4B" opacity="0.85"/>
  <text x="300" y="495" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#FFFFFF" text-anchor="middle">7 Days, All Inclusive</text>
  <text x="300" y="525" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="900" fill="#FBB627" text-anchor="middle">Just &#8377;1,59,000</text>
</svg>
`);

const promoSlides = [
  { id: 1, type: "custom" },
  { id: 2, type: "image", image: bigTravelDaysPoster, alt: "Big Travel Days Are Here" },
  { id: 3, type: "image", image: europePoster, alt: "Europe Tour Promotion" },
  { id: 4, type: "image", image: chinaPoster, alt: "China Tour Promotion" },
];

const AUTO_SLIDE_MS = 5000;
const SWIPE_THRESHOLD = 40;

function WelcomeSlide() {
  const { mostLovedTours } = homeData;

  return (
    <div className="flex h-full flex-col justify-center bg-white p-5 sm:p-6">
      <div className="text-center">
        <h3 className="text-[24px] font-black leading-[1.1] text-[#0F172A] sm:text-[26px]">
          Honor Tour & Travels is Here!
        </h3>
        <p className="mt-1 text-[14px] font-bold text-[#0F4C81]">PAISA VASOOL Tours</p>

        <span className="mt-3 inline-block rounded-full bg-[#0F172A] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#FBB627]">
          Now welcoming you at
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {mostLovedTours.promoDestinations.map((dest) => (
          <div key={dest.name} className="overflow-hidden rounded-[10px] border border-[#E5E7EB]">
            <div className="relative h-[150px] bg-gradient-to-br from-[#4DA8DA] via-[#0F4C81] to-[#17BEBB]" />
            <div className="flex items-center justify-center gap-1 bg-white py-1.5">
              <MapPin className="h-3 w-3 flex-shrink-0 text-[#0F4C81]" />
              <span className="truncate text-[11px] font-semibold text-[#0F172A]">{dest.name}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-center text-[14px] italic leading-relaxed text-[#475569]">
        Chalo, Bag Bharo, Nikal Pado!
      </p>

      <div className="mt-5 border-t border-[#E5E7EB] pt-3">
        <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-[#60646C]">
          India &bull; World &bull; Group Tours &bull; Customized Holidays
        </p>
      </div>
    </div>
  );
}

function WelcomeCardCompact() {
  const { mostLovedTours } = homeData;

  return (
    <div className="flex h-full flex-col justify-center bg-white px-3.5 py-3">
      <div className="text-center">
        <h3 className="text-[16px] font-black leading-tight text-[#0F172A]">Honor Tour & Travels is Here!</h3>
        <p className="text-[11px] font-bold text-[#0F4C81]">PAISA VASOOL Tours</p>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {mostLovedTours.promoDestinations.map((dest) => (
          <div key={dest.name} className="overflow-hidden rounded-[6px] border border-[#E5E7EB]">
            <div className="h-[30px] bg-gradient-to-br from-[#4DA8DA] via-[#0F4C81] to-[#17BEBB]" />
            <div className="bg-white py-1 text-center">
              <span className="truncate text-[9px] font-semibold text-[#0F172A]">{dest.name}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2.5 text-center text-[11px] italic leading-snug text-[#475569]">
        Chalo, Bag Bharo, Nikal Pado!
      </p>
    </div>
  );
}

export default function PromoCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const total = promoSlides.length;

  const goPrev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(goNext, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, index]);

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;

    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();

    touchStartX.current = null;
  }

  return (
    <>
      {/* ================= MOBILE-ONLY (<768px): horizontal multi-card swipe ================= */}
      <div className="flex gap-2.5 overflow-x-auto px-1 pb-1 no-scrollbar snap-x snap-mandatory md:hidden">
        {promoSlides.map((slide) => (
          <div
            key={slide.id}
            className="h-[190px] w-[88%] flex-shrink-0 snap-start overflow-hidden rounded-[10px] border border-[#E5E7EB] shadow-sm"
          >
            {slide.type === "image" ? (
              <img
                src={slide.image}
                alt={slide.alt}
                className="block h-full w-full object-cover"
              />
            ) : (
              <WelcomeCardCompact />
            )}
          </div>
        ))}
      </div>

      {/* ================= DESKTOP (>=768px, unchanged) ================= */}
      <div
        className="relative hidden h-[420px] overflow-hidden rounded-[16px] border border-[#E5E7EB] shadow-sm md:block lg:h-[460px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {promoSlides.map((slide) => (
            <div key={slide.id} className="h-full w-full flex-shrink-0">
              {slide.type === "image" ? (
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <WelcomeSlide />
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] shadow-md transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0F172A] shadow-md transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {promoSlides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/60"
              } ${slide.type === "custom" ? "!bg-[#0F4C81]/30" : ""} ${
                i === index && slide.type === "custom" ? "!bg-[#0F4C81]" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
