import Link from "next/link";
import { Building2 } from "lucide-react";
import { homeData } from "@/data/homeData";

export default function DepartureCities() {
  const { departureCities } = homeData;

  return (
    <section className="px-3 py-8 sm:px-6 md:py-12 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-[23px] font-bold text-[#0F172A] md:text-[28px] lg:text-[32px]">
          All-Inclusive Tour Packages, Starting From{" "}
          <span className="text-[#0F4C81]">Your City</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-[15px] leading-relaxed text-[#60646C] md:mt-3 md:text-[13px] md:leading-[1.6]">
          From flights and stays to sightseeing and meals — every Travel World tour begins conveniently from your doorstep. Pick your departure city below.
        </p>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:mt-8 md:gap-4 sm:grid sm:overflow-visible sm:grid-cols-2 lg:grid-cols-4">
          {departureCities.cities.map((city) => (
            <Link
              key={city.name}
              href={`/tour-packages-from-${city.slug}`}
              className="group flex w-full min-w-full flex-shrink-0 snap-start transform-gpu cursor-pointer flex-col overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white no-underline transition hover:-translate-y-[1px] hover:border-[#0F172A] hover:shadow-lg sm:w-auto sm:min-w-0"
            >
              <div className="flex items-center justify-between border-b border-[#E5E7EB] p-3.5">
                <div>
                  <h4 className="text-[18px] font-bold leading-tight text-[#0F172A] md:text-[15px]">{city.name}</h4>
                  <p className="mt-1 text-[13px] text-[#60646C] md:text-[12px]">{city.departures}</p>
                </div>
                <Building2 className="h-5 w-5 flex-shrink-0 text-[#60646C]" />
              </div>
              <div className="bg-[#F7FAFC] p-3.5">
                <p className="text-[12px] text-[#60646C]">Starting from</p>
                <p className="mt-1 text-[17px] font-bold text-[#0F172A] md:text-[16px]">{city.startingPrice}</p>
                <span className="mt-2 flex h-[42px] w-full items-center justify-center rounded-[10px] border border-[#0F172A] text-center text-[14px] font-bold text-[#0F172A] transition group-hover:bg-[#0B3B63] group-hover:text-white md:mt-3 md:h-auto md:rounded-xl md:py-2 md:text-[12px]">
                  View Tours
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 rounded-[14px] border border-[#0F4C81]/20 bg-[#F7FAFC] p-4 md:mt-8 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
            <div>
              <p className="text-[14px] leading-relaxed text-[#0F172A] md:text-[13px] md:leading-normal">
                Your City Not Listed? Choose our
                <span className="ml-1 font-bold text-[#0F4C81]">Joining & Leaving Option</span>
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#60646C] md:text-[13px] md:leading-normal">
                Book your own flights, we take care of the rest.
              </p>
              <button className="mt-3 flex h-[44px] items-center rounded-full bg-[#FF7A1A] px-5 text-[15px] font-bold text-white shadow-md shadow-orange-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E56A0F] hover:shadow-lg md:mt-4 md:h-auto md:py-2 md:text-[12px]">
                Request a callback
              </button>
            </div>
            <div className="text-[14px] leading-relaxed text-[#0F172A] md:text-[13px] md:leading-normal">
              <p className="font-semibold">
                Join the group directly at first destination &
              </p>
              <p className="mt-1 font-semibold">
                Leave the group at the last destination
              </p>
              <button className="mt-3 text-[13px] font-bold text-[#0F4C81] md:mt-4 md:text-[12px]">
                What's included in J/L option? View Inclusions →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
