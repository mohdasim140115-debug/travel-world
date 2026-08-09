import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PartnerBanner() {
  return (
    <section className="px-3 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div
          className="relative overflow-hidden rounded-[14px] p-8 sm:p-12"
          style={{ background: "linear-gradient(135deg, #0B3B63 0%, #4DA8DA 100%)" }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-white">
              <h2 className="text-[28px] font-bold leading-[1.2] sm:text-[32px]">
                Book Experiences, Attractions, Activities
              </h2>
              <p className="mt-2 text-[20px] font-bold">
                in Malaysia & Beyond.
              </p>
              <p className="mt-4 text-[13px] leading-[1.6] text-white/80">
                Discover memorable experiences and exciting attractions with Honor Tour & Travels.
              </p>
              <button className="mt-6 rounded-full bg-white px-6 py-2 text-[13px] font-bold text-[#0F172A] transition duration-200 hover:bg-[#F7FAFC]">
                Explore Tours
              </button>
            </div>

            <div className="relative h-[200px] w-full flex-shrink-0 lg:h-[200px] lg:w-[300px]">
              <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-[#A9D8F0]/30 via-[#17BEBB]/20 to-white/10" />
              <div className="absolute left-6 top-6 h-24 w-24 rounded-full border-2 border-white/30" />
              <div className="absolute bottom-12 right-8 h-20 w-32 rounded-[40%_60%_50%_50%] border-2 border-white/20" />
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full ${
                  i === 0 ? "w-4 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          <button className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
