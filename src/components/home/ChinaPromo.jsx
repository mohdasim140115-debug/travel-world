import Link from "next/link";
import { homeData } from "@/data/homeData";

export default function ChinaPromo() {
  const { chinaPromo } = homeData;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="overflow-hidden rounded-[10px] border border-[#D8E7E5] bg-[#F8F1E5] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-[32px] font-black leading-[1.2] text-[#2B2B2B] sm:text-[36px]">
                <span className="italic text-[#8B0000]">5,000</span> Years Ancient.{" "}
                <span className="italic text-[#8B0000]">50</span> Years Ahead.
              </h2>
              <p className="mt-4 text-[14px] text-[#4B5563]">
                Visit all-inclusive{" "}
                <span className="font-bold underline">CHINA</span> tours with Travel World
              </p>

              <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
                {chinaPromo.packages.map((pkg, idx) => (
                  <Link
                    key={idx}
                    href={`/package/${pkg.slug}`}
                    className={`min-w-max cursor-pointer rounded-[8px] border px-4 py-4 no-underline transition hover:-translate-y-[1px] hover:shadow-md ${
                      idx === 0
                        ? "border-[#008C95] bg-[#EFF9F8] hover:border-[#006D77]"
                        : "border-[#D8E7E5] bg-white hover:border-[#20B8B5]"
                    }`}
                  >
                    <div className="text-[13px] font-semibold text-[#183B3D]">{pkg.days}</div>
                    <div className="mt-1 text-[14px] font-bold text-[#183B3D]">{pkg.name}</div>
                    <div className="mt-2 text-[11px] text-[#667A7B]">Starting from</div>
                    <div className="text-[15px] font-bold text-[#183B3D]">{pkg.price}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative h-[280px] overflow-hidden rounded-[10px] bg-gradient-to-br from-[#D4A574] via-[#C89968] to-[#8B6F47]">
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
