import { ChevronLeft, ChevronRight } from "lucide-react";
import { homeData } from "@/data/homeData";

export default function FeaturedTour() {
  const { featuredTour } = homeData;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[10px]">
          <div
            className="relative h-[280px] w-full"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0,91,96,0.75) 0%, rgba(0,91,96,0.4) 50%, transparent 100%), linear-gradient(135deg, #006D77 0%, #168AAD 100%)`,
            }}
          >
            <div className="absolute inset-0">
              <div className="absolute left-8 top-12 h-32 w-32 rounded-full border-2 border-white/20" />
              <div className="absolute bottom-8 right-12 h-40 w-40 rounded-full bg-white/5" />
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">
              {featuredTour.region}
            </p>
            <h3 className="mt-2 text-[32px] font-black text-white sm:text-[40px]">
              {featuredTour.title}
            </h3>
            <p className="mt-3 text-[13px] text-white/90">{featuredTour.locations}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-[13px] font-semibold text-white">
                {featuredTour.days} | {featuredTour.date} | from {featuredTour.departure}
              </p>
              <p className="text-[18px] font-black text-[#7FE0D8]">{featuredTour.price}</p>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="rounded-full bg-white px-6 py-2 text-[13px] font-bold text-[#183B3D] transition duration-200 hover:bg-[#EFF9F8]">
                Book now
              </button>
              <p className="text-[11px] text-white/70">*T&C Apply</p>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full ${
                  i === 0 ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>

          <button className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
