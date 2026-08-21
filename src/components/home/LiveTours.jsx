"use client";

import CardRail from "@/components/common/CardRail";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { homeData } from "@/data/homeData";

const AUTO_SLIDE_MS = 3000;

export default function LiveTours() {
  const { reviews } = homeData.trustReviews;
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((i) => (i + 1) % reviews.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="bg-[#F7FAFC] px-3 py-8 sm:px-6 md:py-12 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <CardRail className="flex gap-4 overflow-x-auto pb-1 no-scrollbar snap-x snap-mandatory sm:grid sm:gap-5 sm:overflow-visible sm:grid-cols-2 lg:grid-cols-4">
          {homeData.liveTours.cards.map((card) => (
            <div key={card.destination} className="relative min-w-[190px] flex-shrink-0 snap-start overflow-hidden rounded-[14px] sm:min-w-0">
              <div
                className="relative h-[170px] w-full bg-gradient-to-br from-[#4A7BA7] via-[#6BA3D0] to-[#90C8E8] sm:h-[240px]"
                style={
                  card.image
                    ? undefined
                    : { backgroundImage: `linear-gradient(135deg, ${card.color1} 0%, ${card.color2} 50%, ${card.color3} 100%)` }
                }
              >
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.destination}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 60vw, 300px"
                  />
                )}

                {!card.image && (
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute left-8 top-6 h-16 w-16 rounded-full bg-white/20" />
                    <div className="absolute bottom-12 right-10 h-20 w-20 rounded-full bg-white/10" />
                    <div className="absolute right-4 top-1/3 h-32 w-1 rounded-full bg-white/15" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[12px] font-semibold text-slate-700">
                    {card.liveTourCount} TOURS live
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardRail>

        <div className="mt-6 grid gap-6 md:mt-8 lg:grid-cols-[1.5fr_1.3fr] lg:gap-8">
          <div>
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div>
                <p className="text-[19px] font-bold leading-snug text-[#0F172A] md:text-[18px]">
                  27+ tours are live right now with Honor Tour & Travels
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-[#4B5563] md:mt-3 md:text-[14px] md:leading-[1.6]">
                  Guests everywhere are travelling with ease and care — step into your journey.
                </p>
                <button className="mt-3 flex h-[44px] items-center gap-2 rounded-full bg-[#FF7A1A] px-5 text-[15px] font-semibold text-white shadow-md shadow-orange-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E56A0F] hover:shadow-lg md:mt-4 md:h-auto md:py-2 md:text-[13px]">
                  Upcoming Departures
                </button>
                <span className="ml-3 text-[13px] italic text-[#60646C]">in the next 15 Days</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white p-4">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
              >
                {reviews.map((review) => (
                  <div key={review.guest} className="w-full shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#E6F7F5] text-[12px] font-bold text-[#0F172A]">
                        {review.guest.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-[15px] leading-relaxed text-[#2B2B2B] md:text-[13px] md:leading-[1.5]">
                          "{review.excerpt}"
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-[13px] font-semibold text-[#0F172A]">- {review.guest}</p>
                      <div className="inline-block shrink-0 rounded-full border border-[#0F172A]/20 bg-[#F7FAFC] px-3 py-1 text-[11px] font-semibold text-[#0F172A]">
                        {review.destination}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex justify-center gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show review ${i + 1}`}
                  onClick={() => setReviewIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === reviewIndex ? "w-5 bg-[#0F4C81]" : "w-1.5 bg-[#E5E7EB]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
