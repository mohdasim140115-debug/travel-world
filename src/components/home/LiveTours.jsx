import { CheckCircle } from "lucide-react";
import { homeData } from "@/data/homeData";

export default function LiveTours() {
  return (
    <section className="bg-[#F3F6FA] px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeData.liveTours.cards.map((card) => (
            <div key={card.destination} className="relative overflow-hidden rounded-[10px]">
              <div
                className="relative h-[240px] w-full bg-gradient-to-br from-[#4A7BA7] via-[#6BA3D0] to-[#90C8E8]"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${card.color1} 0%, ${card.color2} 50%, ${card.color3} 100%)`,
                }}
              >
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute left-8 top-6 h-16 w-16 rounded-full bg-white/20" />
                  <div className="absolute bottom-12 right-10 h-20 w-20 rounded-full bg-white/10" />
                  <div className="absolute right-4 top-1/3 h-32 w-1 rounded-full bg-white/15" />
                </div>

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[12px] font-semibold text-slate-700">
                    {card.liveTourCount} TOURS live
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div>
                <p className="text-[18px] font-bold text-[#0B1F3A]">
                  27+ tours are live right now with Travel World
                </p>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#4B5563]">
                  Guests everywhere are travelling with ease and care — step into your journey.
                </p>
                <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] shadow-sm shadow-blue-900/20 transition-all duration-200 hover:from-[#1D4ED8] hover:to-[#1E40AF] hover:shadow-md hover:-translate-y-0.5 px-5 py-2 text-[13px] font-semibold text-white">
                  Upcoming Departures
                </button>
                <span className="ml-3 text-[13px] italic text-[#60646C]">in the next 15 Days</span>
              </div>
            </div>
          </div>

          <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DBEAFE] text-[12px] font-bold text-[#0B1F3A]">
                R
              </div>
              <div className="flex-1">
                <p className="text-[13px] leading-[1.5] text-[#2B2B2B]">
                  "Everything from searching for the trip, booking it, and eventually enjoying it was absolutely amazing."
                </p>
                <p className="mt-2 text-[12px] text-[#60646C]">Read more</p>
              </div>
            </div>
            <p className="mt-3 text-[12px] font-semibold text-[#0B1F3A]">- Ramkumar Iyer</p>
            <div className="mt-3 inline-block rounded-full border border-[#0B1F3A]/20 bg-[#F3F6FA] px-3 py-1 text-[11px] font-semibold text-[#0B1F3A]">
              Bali
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
