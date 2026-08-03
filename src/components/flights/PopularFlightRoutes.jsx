import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";

const gradients = [
  "from-[#0B2033] via-[#173e74] to-[#3f6fb5]",
  "from-[#1d4aa7] via-[#3f6fb5] to-[#8fb3e6]",
  "from-[#173e74] via-[#0B2033] to-[#3f6fb5]",
  "from-[#0B2033] via-[#2b527f] to-[#6a9cd6]",
];

export default function PopularFlightRoutes({ routes }) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="text-center">
          <h2 className="text-[22px] font-bold text-[#0B1F3A] sm:text-[26px]">
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
                <p className="text-[13px] font-semibold text-[#0B1F3A] group-hover:text-[#173e74]">
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
