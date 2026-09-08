import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/homeData";
import { getDestinationHref } from "@/data/destinations";
import HeroSearchPanel from "./HeroSearchPanel";

/* =========================================================
   HERO
   A single rounded image, the headline over it, the four
   category links as glass chips along its lower edge, and
   the search panel floating across its bottom border.

   The chips keep the same four destinations and hrefs the
   old card row had — they are the site's main entry points.
========================================================= */

const HERO_IMAGE = "/uploads/destinations/arif-khan-CyR76QxjJhc-unsplash.jpg";

// Where each hero card points; unchanged from the previous layout.
const CARD_LINKS = {
  "India Tours": "/india",
  "World Tours": "/world",
  "Women's Special Tours": "/womens-special",
  "Seniors' Special Tours": "/seniors-special",
};

// "264 Tours • 666 Departures" -> "264 Tours"
const shortSubtitle = (subtitle = "") => subtitle.split("•")[0].trim();

export default function HeroSection({ cards, destinations }) {
  const cardData = cards?.length ? cards : homeData.hero.cards;

  const searchDestinations = (destinations?.length ? destinations : homeData.destinations)
    .map((item) => ({ name: item.name, href: getDestinationHref(item.name) }))
    .filter((item) => item.href);

  return (
    <section className="w-full">
      {/* IMAGE + HEADLINE */}
      <div className="relative overflow-hidden">
        <div className="relative h-[366px] w-full sm:h-[390px] lg:h-[430px]">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/65" />
        </div>

        <div className="absolute inset-0 mx-auto flex w-full max-w-[1280px] flex-col justify-between px-4 py-6 sm:px-6 sm:py-8 lg:px-0 lg:py-10">
          <div className="max-w-[620px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
              {homeData.hero.title}
              <span className="hidden sm:inline">
                <span className="mx-1.5 text-white/35">/</span> {homeData.hero.tagline}
              </span>
            </p>
            <h1 className="mt-3 text-[30px] font-bold leading-[1.12] text-white sm:text-[40px] lg:text-[46px]">
              Discover your next <span className="text-[#5EEAD4]">escape</span>
            </h1>
            <p className="mt-3 max-w-[440px] text-[14px] font-light leading-relaxed text-white/85 sm:text-[15px]">
              Handpicked group departures across India and the world — flights, stays, sightseeing
              and a tour manager, all in one price.
            </p>
          </div>

          {/* CATEGORY CHIPS — the old hero cards, kept as links */}
          <div className="flex items-stretch gap-2 overflow-x-auto pb-4 no-scrollbar sm:gap-3 sm:pb-6 lg:pb-16">
            {cardData.map((card) => {
              const href = CARD_LINKS[card.title] ?? "/india";

              return (
                <Link
                  key={card.title}
                  href={href}
                  className="group flex w-[190px] shrink-0 flex-col rounded-[14px] bg-white/95 p-3.5 no-underline shadow-[0_8px_22px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-white sm:w-[215px]"
                >
                  {/* flex-1 keeps every button on the same line when a title wraps */}
                  <span className="block flex-1">
                    <span className="block text-[14px] font-semibold leading-tight text-[#0F172A]">
                      {card.title}
                    </span>
                    <span className="mt-1 block text-[12px] font-light text-[#6B7280]">
                      {shortSubtitle(card.subtitle)}
                    </span>
                  </span>

                  <span className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#0B3B63] text-[12px] font-bold text-white transition group-hover:bg-[#17BEBB]">
                    View details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* SEARCH — overlaps the image on desktop, sits under it on phones */}
      <div className="relative z-10 mx-auto -mt-6 w-full max-w-[1280px] px-3 sm:-mt-10 sm:px-6 lg:-mt-12 lg:px-0">
        <HeroSearchPanel destinations={searchDestinations} />
      </div>
    </section>
  );
}
