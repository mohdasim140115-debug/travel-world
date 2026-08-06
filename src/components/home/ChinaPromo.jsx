import Link from "next/link";
import { homeData } from "@/data/homeData";

export default function ChinaPromo() {
  const { chinaPromo } = homeData;

  return (
    <section className="px-3 py-8 sm:px-6 md:py-12 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-[#F7FAFC] p-4 sm:p-5 md:p-8">
          <div className="grid gap-3 md:gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="order-2 min-w-0 lg:order-1">
              <h2 className="text-[26px] font-extrabold leading-[1.15] text-[#2B2B2B] md:text-[24px] md:font-black md:leading-[1.2] sm:text-[32px] lg:text-[36px]">
                <span className="italic text-[#0F4C81]">5,000</span> Years Ancient.{" "}
                <span className="italic text-[#0F4C81]">50</span> Years Ahead.
              </h2>
              <p className="mt-2 line-clamp-2 text-[15px] leading-snug text-[#4B5563] md:mt-4 md:text-[14px] md:leading-normal md:line-clamp-none">
                Visit all-inclusive{" "}
                <span className="font-bold underline">CHINA</span> tours with Travel World
              </p>

              <div className="mt-[18px] flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:mt-5">
                {chinaPromo.packages.map((pkg, idx) => (
                  <Link
                    key={idx}
                    href={`/package/${pkg.slug}`}
                    className={`min-w-[178px] flex-shrink-0 snap-start cursor-pointer rounded-[12px] border p-3 no-underline transition hover:-translate-y-[1px] hover:shadow-lg md:rounded-[14px] md:px-3.5 md:py-3.5 ${
                      idx === 0
                        ? "border-[#0F4C81] bg-[#F7FAFC] hover:border-[#0B3B63]"
                        : "border-[#E5E7EB] bg-white hover:border-[#17BEBB]"
                    }`}
                  >
                    <div className="text-[13px] font-semibold text-[#0F172A]">{pkg.days}</div>
                    <div className="mt-1 text-[18px] font-bold leading-tight text-[#0F172A] md:text-[14px]">{pkg.name}</div>
                    <div className="mt-2 text-[12px] text-[#475569]">Starting from</div>
                    <div className="text-[18px] font-bold text-[#0F172A] md:text-[15px]">{pkg.price}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative order-1 mx-auto h-[190px] w-[190px] overflow-hidden rounded-full bg-gradient-to-br from-[#D4A574] via-[#C89968] to-[#8B6F47] md:mx-0 md:h-[200px] md:w-full md:rounded-[14px] sm:h-[260px] sm:w-full lg:order-2 lg:h-[280px]">
              <div className="absolute left-6 top-8 h-24 w-24 rounded-full border-2 border-white/30" />
              <div className="absolute right-8 bottom-12 h-20 w-32 rounded-[40%_60%_50%_50%] border-2 border-white/20" />
              <div className="absolute left-12 bottom-6 h-16 w-16 bg-white/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
