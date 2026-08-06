"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { homeData } from "@/data/homeData";

export default function FeaturedTour() {
  const tours = homeData.featuredTour;
  const [index, setIndex] = useState(0);

  const featuredTour = tours[index];

  const goPrev = () => setIndex((i) => (i === 0 ? tours.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === tours.length - 1 ? 0 : i + 1));

  return (
    <section className="px-3 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[14px]">
          <div
            className="relative h-[340px] w-full transition-all duration-300 sm:h-[320px] lg:h-[360px]"
            style={
              featuredTour.image
                ? undefined
                : { backgroundImage: `linear-gradient(135deg, #0B3B63 0%, #4DA8DA 100%)` }
            }
          >
            {featuredTour.image && (
              <img
                src={featuredTour.image}
                alt={featuredTour.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(15,76,129,0.75) 0%, rgba(15,76,129,0.4) 50%, transparent 100%)`,
              }}
            />

            {!featuredTour.image && (
              <div className="absolute inset-0">
                <div className="absolute left-8 top-12 h-32 w-32 rounded-full border-2 border-white/20" />
                <div className="absolute bottom-8 right-12 h-40 w-40 rounded-full bg-white/5" />
              </div>
            )}
          </div>

          <div key={index} className="absolute inset-0 flex flex-col justify-center px-6 transition-opacity duration-300 sm:px-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">
              {featuredTour.region}
            </p>
            <h3 className="mt-2 text-[28px] font-black text-white sm:text-[40px]">
              {featuredTour.title}
            </h3>
            <p className="mt-3 text-[13px] text-white/90">{featuredTour.locations}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-[13px] font-semibold text-white">
                {featuredTour.days} | {featuredTour.date} | from {featuredTour.departure}
              </p>
              <p className="text-[18px] font-black text-[#A9D8F0]">{featuredTour.price}</p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button className="rounded-full bg-white px-6 py-2 text-[13px] font-bold text-[#0F172A] transition duration-200 hover:bg-[#F7FAFC] active:scale-95">
                Book now
              </button>
              <p className="text-[11px] text-white/70">*T&C Apply</p>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-1">
            {tours.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all duration-200 ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous tour"
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30 active:scale-90"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next tour"
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/30 active:scale-90"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
