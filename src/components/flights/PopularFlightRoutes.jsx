import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";

const gradients = [
  "from-[#006D77] via-[#168AAD] to-[#7FE0D8]",
  "from-[#005B60] via-[#008C95] to-[#20B8B5]",
  "from-[#168AAD] via-[#006D77] to-[#20B8B5]",
  "from-[#006D77] via-[#0F9AA8] to-[#7FE0D8]",
];

export default function PopularFlightRoutes({ routes }) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="text-center">
          <h2 className="text-[26px] font-bold text-[#183B3D] sm:text-[30px]">
            Discover the Most Popular Flight Routes
          </h2>
          <p className="mx-auto mt-2 max-w-[620px] text-[13px] text-[#60646C]">
            Choose from popular domestic and international flight routes booked frequently by
            our travellers, and check indicative fares in a couple of clicks.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((route, index) => (
            <Link
              key={route.slug}
              href={`/flights/${route.slug}`}
              className="group block overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white no-underline shadow-sm transition hover:shadow-md"
            >
              <div
                className={`relative flex h-[110px] items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]}`}
              >
                <Plane className="h-8 w-8 text-white/80" />
              </div>

              <div className="p-3">
                <p className="text-[13px] font-semibold text-[#183B3D] group-hover:text-[#008C95]">
                  {route.from} to {route.to}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#6B7280]">
                  {route.fromCode}-{route.toCode}
                  <ArrowRight size={11} className="opacity-60" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
