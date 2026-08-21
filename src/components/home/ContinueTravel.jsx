import CardRail from "@/components/common/CardRail";
import Link from "next/link";
import { homeData } from "@/data/homeData";

export default function ContinueTravel() {
  const { continueTravel } = homeData;

  return (
    <section className="bg-[#F7FAFC] px-3 py-8 sm:px-6 md:py-12 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-[23px] font-bold text-[#0F172A] md:text-[26px]">{continueTravel.heading}</h2>

        <CardRail className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:mt-6 md:gap-4 sm:grid sm:overflow-visible sm:grid-cols-2 lg:grid-cols-4">
          {continueTravel.tours.map((tour) => (
            <Link
              key={tour.name}
              href={`/package/${tour.slug}`}
              className="w-full min-w-full flex-shrink-0 snap-start transform-gpu cursor-pointer overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white no-underline transition hover:-translate-y-[1px] hover:border-[#4A7BA7] hover:shadow-lg sm:w-auto sm:min-w-0"
            >
              <div className="flex flex-col">
                <div className="h-[90px] w-full bg-gradient-to-br from-[#90C8E8] to-[#4A7BA7]" />
                <div className="p-3">
                  <h4 className="text-[16px] font-bold leading-tight text-[#0F172A] md:text-[13px]">{tour.name}</h4>
                  <p className="mt-1 text-[13px] text-[#60646C] md:text-[12px]">{tour.duration}</p>
                  <p className="mt-1 text-[14px] font-bold text-[#0F172A] md:text-[13px]">{tour.price}</p>
                  <p className="text-[12px] text-[#60646C] md:text-[11px]">twin sharing</p>
                  <span className="mt-2 block text-[13px] font-semibold text-[#0F4C81] md:mt-3 md:text-[12px]">
                    {tour.cta} &gt;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </CardRail>
      </div>
    </section>
  );
}
