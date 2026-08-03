import Link from "next/link";
import { Building2 } from "lucide-react";
import { homeData } from "@/data/homeData";

export default function DepartureCities() {
  const { departureCities } = homeData;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-[24px] font-bold text-[#0B1F3A] sm:text-[28px]">
          All-Inclusive Tour Packages, Starting From{" "}
          <span className="text-[#2563EB]">Your City</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[13px] leading-[1.6] text-[#60646C]">
          From flights and stays to sightseeing and meals — every Travel World tour begins conveniently from your doorstep. Pick your departure city below.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {departureCities.cities.map((city) => (
            <Link
              key={city.name}
              href={`/tour-packages-from-${city.slug}`}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white no-underline transition hover:-translate-y-[1px] hover:border-[#0B1F3A] hover:shadow-md"
            >
              <div className="flex items-center justify-between border-b border-[#E5E7EB] p-4">
                <div>
                  <h4 className="text-[15px] font-bold text-[#0B1F3A]">{city.name}</h4>
                  <p className="mt-1 text-[12px] text-[#60646C]">{city.departures}</p>
                </div>
                <Building2 className="h-5 w-5 text-[#60646C]" />
              </div>
              <div className="bg-[#F3F6FA] p-4">
                <p className="text-[11px] text-[#60646C]">Starting from</p>
                <p className="mt-1 text-[16px] font-bold text-[#0B1F3A]">{city.startingPrice}</p>
                <span className="mt-3 block w-full rounded-[6px] border border-[#0B1F3A] py-2 text-center text-[12px] font-bold text-[#0B1F3A] transition group-hover:bg-[#071426] group-hover:text-white">
                  View Tours
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-[10px] border border-[#2563EB]/20 bg-[#F3F6FA] p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[13px] text-[#0B1F3A]">
                Your City Not Listed? Choose our
                <span className="ml-1 font-bold text-[#2563EB]">Joining & Leaving Option</span>
              </p>
              <p className="mt-2 text-[13px] text-[#60646C]">
                Book your own flights, we take care of the rest.
              </p>
              <button className="mt-4 rounded-full bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] shadow-sm shadow-blue-900/20 transition-all duration-200 hover:from-[#1D4ED8] hover:to-[#1E40AF] hover:shadow-md hover:-translate-y-0.5 px-5 py-2 text-[12px] font-bold text-white">
                Request a callback
              </button>
            </div>
            <div className="text-[13px] text-[#0B1F3A]">
              <p className="font-semibold">
                Join the group directly at first destination &
              </p>
              <p className="mt-1 font-semibold">
                Leave the group at the last destination
              </p>
              <button className="mt-4 text-[12px] font-bold text-[#2563EB]">
                What's included in J/L option? View Inclusions →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
