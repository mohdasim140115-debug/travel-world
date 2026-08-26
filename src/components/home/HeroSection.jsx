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

const HERO_IMAGE = "/arif-khan-CyR76QxjJhc-unsplash.jpg";

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
    <section className="w-full pt-2 sm:pt-3">
      {/* IMAGE + HEADLINE */}
      <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px]">
        <div className="relative h-[300px] w-full sm:h-[360px] lg:h-[420px]">
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

        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 lg:p-10">
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
          <div className="flex items-stretch gap-2 overflow-x-auto pb-1 no-scrollbar sm:gap-3 lg:pb-16">
            {cardData.map((card) => {
              const href = CARD_LINKS[card.title] ?? "/india";

              return (
                <Link
                  key={card.title}
                  href={href}
                  className="group flex w-[215px] shrink-0 items-center justify-between gap-3 rounded-[14px] bg-white/95 px-4 py-3 no-underline shadow-[0_8px_22px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-white sm:w-[240px]"
                >
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold leading-tight text-[#0F172A]">
                      {card.title}
                    </span>
                    <span className="mt-1 block text-[12px] font-light text-[#6B7280]">
                      {shortSubtitle(card.subtitle)}
                    </span>
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E6F7F5] text-[#0F4C81] transition-colors group-hover:bg-[#17BEBB] group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* SEARCH — overlaps the image on desktop, sits under it on phones */}
      <div className="relative z-10 mx-auto -mt-3 w-full px-1 sm:-mt-10 sm:px-6 lg:-mt-12 lg:max-w-[1080px] lg:px-0">
        <HeroSearchPanel destinations={searchDestinations} />
      </div>
    </section>
  );
}
