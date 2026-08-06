"use client";

import { useEffect, useRef, useState } from "react";
import { Users, CheckCircle, Star } from "lucide-react";
import { homeData } from "@/data/homeData";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function parseStatValue(value) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { target: parseFloat(match[1]), suffix: match[2], decimals };
}

function CounterStat({ value, inView }) {
  const parsed = parseStatValue(value);

  const [display, setDisplay] = useState(() =>
    parsed ? `${(0).toFixed(parsed.decimals)}${parsed.suffix}` : value
  );

  useEffect(() => {
    if (!inView || !parsed) return;

    const duration = 1200;
    let raf;
    let start;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplay(`${(parsed.target * progress).toFixed(parsed.decimals)}${parsed.suffix}`);
      if (progress < 1) raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <>{display}</>;
}

export default function TrustReviews() {
  const { trustReviews } = homeData;
  const [sectionRef, inView] = useInView();

  const fade = (delay = "") =>
    `transition-all duration-700 ${delay} ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`;

  return (
    <section className="px-3 sm:px-6 md:bg-[#0B3B63] md:py-12 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">

        {/* ================= MOBILE-ONLY LAYOUT (<768px) ================= */}
        <div
          ref={sectionRef}
          className="relative overflow-hidden rounded-[20px] bg-[#0B3B63] p-[18px] md:hidden"
        >
          <h2 className={`line-clamp-2 text-center text-[24px] font-bold leading-snug text-white ${fade()}`}>
            Trusted by Travel World guests across the World
          </h2>

          <div className={`mt-[18px] grid grid-cols-2 gap-5 ${fade("delay-100")}`}>
            {trustReviews.stats.map((stat) => {
              const Icon = stat.icon === "Users" ? Users : CheckCircle;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center">
                    <Icon className="h-7 w-7 text-[#5EEAD4]" />
                  </div>
                  <div className="mt-2 text-[30px] font-bold text-white">
                    <CounterStat value={stat.value} inView={inView} />
                  </div>
                  <div className="mt-1 text-[14px] text-[#CBD5E1]">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className={`mt-5 flex gap-4 overflow-x-auto pb-1 no-scrollbar snap-x snap-mandatory ${fade("delay-200")}`}>
            {trustReviews.reviews.map((review, idx) => (
              <div
                key={idx}
                className="min-w-[290px] max-w-[290px] min-h-[195px] flex-shrink-0 snap-start rounded-[14px] bg-white px-3.5 py-4 transition-transform duration-200 active:scale-[0.98]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="inline-block rounded-full bg-[#F7FAFC] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#475569]">
                      {review.type}
                    </span>

                    <div className="mt-1.5 flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#FFD400] text-[#FFD400]" />
                      ))}
                    </div>

                    <h3 className="mt-1 text-[17px] font-bold leading-tight text-[#0F172A]">
                      {review.destination}
                    </h3>
                  </div>

                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#E6F7F5] text-[13px] font-bold text-[#0F4C81]">
                    {review.guest.charAt(0)}
                  </div>
                </div>

                <p className="mt-2 text-[14px] leading-relaxed text-[#475569]">
                  {review.excerpt}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-[#0F172A]">{review.guest}</p>
                  <p className="text-[12px] text-[#60646C]">{review.date}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className={`mt-[18px] flex h-[46px] w-full items-center justify-center rounded-full bg-[#FF7A1A] text-[15px] font-bold text-white shadow-md shadow-orange-900/20 transition-all duration-200 active:scale-95 ${fade("delay-300")}`}
          >
            Read 15K+ Reviews
          </button>

          {/* FLOATING CIRCULAR ACTION BUTTON */}
          <button
            type="button"
            aria-label="Reviews"
            className="absolute -bottom-4 -right-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF7A1A] shadow-lg shadow-orange-900/30 transition-transform duration-200 active:scale-90"
          >
            <Star className="h-6 w-6 fill-white text-white" />
          </button>
        </div>

        {/* ================= DESKTOP LAYOUT (unchanged, >=768px) ================= */}
        <div className="hidden md:block">
          <h2 className="text-center text-[28px] font-bold text-white lg:text-[32px]">
            Trusted by Travel World guests across the World
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustReviews.stats.map((stat) => {
              const Icon = stat.icon === "Users" ? Users : CheckCircle;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center">
                    <Icon className="h-8 w-8 text-[#5EEAD4]" />
                  </div>
                  <div className="mt-3 text-[32px] font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[13px] text-[#CBD5E1]">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex gap-6 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory lg:grid lg:overflow-visible lg:grid-cols-3">
            {trustReviews.reviews.map((review, idx) => (
              <div key={idx} className="min-w-[260px] flex-shrink-0 snap-start rounded-[14px] border border-[#E5E7EB]/20 bg-white p-6 lg:min-w-0">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FFD400] text-[#FFD400]" />
                  ))}
                </div>
                <p className="mt-3 text-[12px] font-semibold uppercase text-[#475569]">
                  {review.type}
                </p>
                <p className="mt-1 text-[12px] text-[#0F172A]">{review.destination}</p>
                <p className="mt-3 text-[13px] leading-[1.5] text-[#475569]">
                  {review.excerpt}
                </p>
                <p className="mt-4 text-[12px] font-semibold text-[#0F172A]">{review.guest}</p>
                <p className="text-[11px] text-[#60646C]">{review.date}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="inline-flex items-center gap-2 rounded-full bg-[#FF7A1A] px-6 py-3 text-[14px] font-bold text-white shadow-md shadow-orange-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E56A0F] hover:shadow-lg">
              Read 15K+ Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
