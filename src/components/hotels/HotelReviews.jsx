import { Star } from "lucide-react";

const GUEST_REVIEWS = [
  {
    name: "Anjali Mehta",
    text: "Wonderful stay — the staff went out of their way to make us comfortable and the room was spotless.",
  },
  {
    name: "Rohan Kapoor",
    text: "Great location and very well maintained property. Breakfast spread was excellent.",
  },
  {
    name: "Priya Nair",
    text: "Loved the ambience and the view from our room. Would definitely book again on our next trip.",
  },
];

export default function HotelReviews({ rating, reviewCount }) {
  return (
    <section className="border-t border-[#E5E7EB] bg-[#0B3B63] py-10 sm:py-12">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="text-center text-white">
          <h2 className="text-[20px] font-bold sm:text-[26px]">Guest Reviews</h2>
          <p className="mt-2 flex items-center justify-center gap-2 text-[14px] text-white/80">
            <span className="rounded-[6px] bg-white/15 px-2 py-0.5 text-[14px] font-bold">
              {rating.toFixed(1)}
            </span>
            Based on {reviewCount.toLocaleString("en-IN")} reviews
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {GUEST_REVIEWS.map((review) => (
            <div key={review.name} className="rounded-[14px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
              <div className="flex gap-0.5 text-[#F5A623]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#475569]">&quot;{review.text}&quot;</p>
              <p className="mt-3 text-[14px] font-semibold text-[#0F172A]">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
