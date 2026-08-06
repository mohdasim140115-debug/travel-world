import Link from "next/link";
import { Heart } from "lucide-react";
import { homeData } from "@/data/homeData";
import PromoCarousel from "./PromoCarousel";

export default function MostLovedTours() {
  const { mostLovedTours } = homeData;

  return (
    <section className="px-3 py-8 sm:px-6 md:py-12 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid gap-5 md:gap-6 lg:grid-cols-[32%_1fr]">

          {/* ================= LEFT: PROMOTIONAL BANNER CAROUSEL ================= */}
          <PromoCarousel />

          {/* ================= RIGHT: MOST LOVED GRID ================= */}
          <div className="min-w-0 overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-[#F7FAFC] p-5 sm:p-7">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <Heart className="h-4 w-4 fill-[#FF6B6B] text-[#FF6B6B]" />
              </div>
              <h3 className="text-[23px] font-bold text-[#0F172A] sm:text-[25px]">Most Loved by Our Guests</h3>
            </div>
            <p className="mt-1.5 text-[15px] leading-relaxed text-[#60646C] sm:text-[16px]">
              1,26,704 guests have travelled so far.
            </p>

            <div className="mt-5 flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible lg:grid-cols-4">
              {mostLovedTours.destinations.map((dest) => (
                <Link
                  key={dest.name}
                  href={`/package/${dest.slug}`}
                  className="group min-w-[180px] flex-shrink-0 snap-start transform-gpu cursor-pointer overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white no-underline transition-all duration-300 hover:-translate-y-1 hover:border-[#17BEBB] hover:shadow-lg sm:min-w-0"
                >
                  <div className="relative h-[130px] overflow-hidden bg-gradient-to-br from-[#6BA3D0] to-[#4A7BA7]">
                    {dest.image ? (
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                    <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[13px] font-semibold text-white">
                      {dest.price}
                    </span>

                    <h4 className="absolute inset-x-2 bottom-2 line-clamp-2 text-center text-[16px] font-bold leading-tight text-white sm:text-[17px]">
                      {dest.name}
                    </h4>
                  </div>

                  <div className="bg-white py-1.5 text-center">
                    <p className="text-[12px] text-[#60646C] sm:text-[13px]">
                      {dest.guests} guests travelled
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
