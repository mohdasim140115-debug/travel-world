"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* =========================================================
   CARD RAIL
   Wraps a horizontally scrolling row of cards and puts a
   prev/next arrow on either side of it.

   The arrows only appear when the row can actually scroll,
   so they disappear by themselves at the breakpoint where
   the same markup switches to a grid — no extra classes
   needed at the call site.

   Usage:
     <CardRail className="flex gap-3 overflow-x-auto ...">
       {cards}
     </CardRail>
========================================================= */

export default function CardRail({ className = "", children, label = "cards", ...rest }) {
  const scroller = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    // 2px of slack — sub-pixel widths otherwise leave the last arrow enabled forever.
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    measure();
    el.addEventListener("scroll", measure, { passive: true });

    // Catches the breakpoint flip to a grid, where nothing scrolls any more.
    const observer = new ResizeObserver(measure);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure, children]);

  function page(direction) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  // `hidden` and `flex` on one element is a coin toss — whichever display
  // utility Tailwind emits last wins — so pick exactly one.
  const arrow =
    "absolute top-1/2 z-20 h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full " +
    "border border-[#E5E7EB] bg-white text-[#0F4C81] shadow-[0_2px_10px_rgba(15,23,42,0.18)] " +
    "transition hover:border-[#17BEBB] hover:text-[#17BEBB] active:scale-95";

  return (
    <div className="relative">
      <div ref={scroller} className={className} {...rest}>
        {children}
      </div>

      <button
        type="button"
        aria-label={`Previous ${label}`}
        onClick={() => page(-1)}
        className={`${arrow} left-1 ${canScrollLeft ? "flex" : "hidden"}`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label={`Next ${label}`}
        onClick={() => page(1)}
        className={`${arrow} right-1 ${canScrollRight ? "flex" : "hidden"}`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
