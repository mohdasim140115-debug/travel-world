import { Users, CheckCircle, MapPin, Star } from "lucide-react";
import { homeData } from "@/data/homeData";

export default function TrustReviews() {
  const { trustReviews } = homeData;

  return (
    <section className="bg-[#0B1F3A] px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-[24px] font-bold text-white sm:text-[28px]">
          Trusted by Travel World guests across the World
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustReviews.stats.map((stat) => {
            const Icon = stat.icon === "Users" ? Users : CheckCircle;
            return (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center">
                  <Icon className="h-8 w-8 text-[#60A5FA]" />
                </div>
                <div className="mt-3 text-[24px] font-bold text-white sm:text-[28px]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[13px] text-[#CBD5E1]">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {trustReviews.reviews.map((review, idx) => (
            <div key={idx} className="rounded-[10px] border border-[#E5E7EB]/20 bg-white p-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#FFD400] text-[#FFD400]" />
                ))}
              </div>
              <p className="mt-3 text-[12px] font-semibold uppercase text-[#64748B]">
                {review.type}
              </p>
              <p className="mt-2 text-[12px] text-[#0B1F3A]">{review.destination}</p>
              <p className="mt-3 text-[13px] leading-[1.5] text-[#475569]">
                {review.excerpt}
              </p>
              <p className="mt-4 text-[12px] font-semibold text-[#0B1F3A]">{review.guest}</p>
              <p className="text-[11px] text-[#60646C]">{review.date}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] shadow-sm shadow-blue-900/20 transition-all duration-200 hover:from-[#1D4ED8] hover:to-[#1E40AF] hover:shadow-md hover:-translate-y-0.5 px-6 py-3 text-[14px] font-bold text-white">
            Read 15K+ Reviews
          </button>
        </div>
      </div>
    </section>
  );
}
