import Link from "next/link";
import { Heart } from "lucide-react";
import { homeData } from "@/data/homeData";

export default function MostLovedTours() {
  const { mostLovedTours } = homeData;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="relative overflow-hidden rounded-[10px] bg-[#DBEAFE] p-6 sm:p-8">
            <div className="relative z-10">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                Curated for you
              </p>
              <h3 className="mt-2 text-[28px] font-black text-[#0B1F3A] leading-[1.1]">
                TRAVEL WORLD
              </h3>
              <h4 className="mt-1 text-[24px] font-black text-[#0B1F3A]">PAISA VASOOL</h4>
              <p className="mt-2 text-[18px] font-bold text-[#0B1F3A]">Tours</p>
              <p className="mt-3 text-[16px] italic text-[#334155]">Chalo, Bag Bharo, Nikal Pado!</p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {mostLovedTours.promoDestinations.map((dest) => (
                <div
                  key={dest.name}
                  className="flex h-[60px] flex-col items-center justify-center rounded-full border-2 border-[#93C5FD] bg-white/80 text-center"
                >
                  <div className="text-[11px] font-semibold text-[#0B1F3A]">{dest.name}</div>
                  <div className="text-[10px] text-[#60646C]">{dest.days}</div>
                  <div className="text-[11px] font-bold text-[#0B1F3A]">{dest.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#FF6B6B]" />
              <h3 className="text-[20px] font-bold text-[#0B1F3A]">Most Loved by Our Guests</h3>
            </div>
            <p className="mt-2 text-[13px] text-[#60646C]">
              1,26,522 guests have travelled so far.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {mostLovedTours.destinations.map((dest) => (
                <Link
                  key={dest.name}
                  href={`/package/${dest.slug}`}
                  className="flex cursor-pointer flex-col overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white no-underline transition hover:-translate-y-[1px] hover:border-[#4A7BA7] hover:shadow-md"
                >
                  <div className="relative h-[120px] bg-gradient-to-br from-[#6BA3D0] to-[#4A7BA7]">
                    <div className="absolute inset-0 opacity-30" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-[13px] font-bold text-[#0B1F3A]">{dest.name}</h4>
                    <p className="mt-1 text-[12px] text-[#60646C]">{dest.price}</p>
                    <p className="mt-2 text-[11px] text-[#4B5563]">
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
