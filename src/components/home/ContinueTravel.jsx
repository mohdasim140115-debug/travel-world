import Link from "next/link";
import { homeData } from "@/data/homeData";

export default function ContinueTravel() {
  const { continueTravel } = homeData;

  return (
    <section className="bg-[#EFF9F8] px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-[26px] font-bold text-[#183B3D]">{continueTravel.heading}</h2>

        <div className="mt-6 grid gap-4 overflow-x-auto pb-2 sm:grid-cols-2 lg:grid-cols-4">
          {continueTravel.tours.map((tour) => (
            <Link
              key={tour.name}
              href={`/package/${tour.slug}`}
              className="min-w-max flex-shrink-0 cursor-pointer overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white no-underline transition hover:-translate-y-[1px] hover:border-[#4A7BA7] hover:shadow-md sm:min-w-full"
            >
              <div className="flex flex-col">
                <div className="h-[100px] w-full bg-gradient-to-br from-[#90C8E8] to-[#4A7BA7]" />
                <div className="p-3">
                  <h4 className="text-[13px] font-bold text-[#183B3D]">{tour.name}</h4>
                  <p className="mt-1 text-[12px] text-[#60646C]">{tour.duration}</p>
                  <p className="mt-1 text-[13px] font-bold text-[#183B3D]">{tour.price}</p>
                  <p className="text-[11px] text-[#60646C]">twin sharing</p>
                  <span className="mt-3 block text-[12px] font-semibold text-[#008C95]">
                    {tour.cta} &gt;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
