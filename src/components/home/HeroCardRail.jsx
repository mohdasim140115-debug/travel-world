"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   HERO CARD RAIL
   Phones swipe through the four category cards; the dots
   below show where you are and jump between them. From sm
   up the same children lay out as a plain grid, so the dots
   are hidden there.

   The cards themselves are rendered by the (server) hero
   and passed straight through as children.
========================================================= */

const GAP = 12; // matches gap-3 on the rail

export default function HeroCardRail({ count, children }) {
  const railRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    function onScroll() {
      const card = rail.firstElementChild;
      if (!card) return;

      const step = card.offsetWidth + GAP;
      const index = Math.round(rail.scrollLeft / step);
      setActive(Math.max(0, Math.min(count - 1, index)));
    }

    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, [count]);

  function goTo(index) {
    const rail = railRef.current;
    const card = rail?.firstElementChild;
    if (!rail || !card) return;

    rail.scrollTo({ left: index * (card.offsetWidth + GAP), behavior: "smooth" });
  }

  return (
    <>
      <div
        ref={railRef}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:mt-9 sm:grid sm:grid-cols-2 sm:gap-3.5 sm:overflow-visible sm:pb-0 lg:grid-cols-4 lg:gap-5"
      >
        {children}
      </div>

      <div className="mt-3.5 flex items-center justify-center gap-1.5 sm:hidden">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show card ${index + 1}`}
            aria-current={index === active}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === active
                ? "w-7 bg-gradient-to-r from-[#C8489C] to-[#FF9018]"
                : "w-1.5 bg-white/35"
            }`}
          />
        ))}
      </div>
    </>
  );
}
