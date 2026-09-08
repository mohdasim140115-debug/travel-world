import Link from "next/link";
import { Caveat } from "next/font/google";
import {
  ChevronRight,
  Globe,
  IndianRupee,
  Landmark,
  PersonStanding,
  Plane,
  ShieldCheck,
  UsersRound,
  Venus,
} from "lucide-react";
import { homeData } from "@/data/homeData";
import { getDestinationHref } from "@/data/destinations";
import HeroCardRail from "./HeroCardRail";
import HeroSearchPanel from "./HeroSearchPanel";

/* =========================================================
   HERO
   No photograph anywhere — the backdrop is a Tailwind
   gradient plus blurred colour blobs and two SVG waves, so
   the hero downloads nothing. Headline on the left, a
   CSS/SVG flight composition and the trust strip on the
   right, the four category cards below, and the search
   panel floating across the bottom edge.
========================================================= */

const script = Caveat({ subsets: ["latin"], weight: ["600"], display: "swap" });

// Where each hero card points; unchanged from the previous layout.
const CARD_LINKS = {
  "India Tours": "/india",
  "World Tours": "/world",
  "Women's Special Tours": "/womens-special",
  "Seniors' Special Tours": "/seniors-special",
};

const CARD_STYLES = {
  "India Tours": { icon: Landmark, text: "text-[#F0762B]", chip: "bg-[#FFF1E6]" },
  "World Tours": { icon: Globe, text: "text-[#2E7BE8]", chip: "bg-[#E8F1FE]" },
  "Women's Special Tours": { icon: Venus, text: "text-[#E1467C]", chip: "bg-[#FDECF3]" },
  "Seniors' Special Tours": { icon: PersonStanding, text: "text-[#16A34A]", chip: "bg-[#E7F7ED]" },
};

const TRUST = [
  { icon: ShieldCheck, title: "Trusted & Safe", note: "Your Journey, Our Priority" },
  { icon: UsersRound, title: "Expert Tour Managers", note: "With You Always" },
  { icon: IndianRupee, title: "Best Price Guaranteed", note: "More Value, More Memories" },
];

// "264 Tours • 666 Departures" -> "264 Tours"
const shortSubtitle = (subtitle = "") => subtitle.split("•")[0].trim();

export default function HeroSection({ cards, destinations }) {
  const cardData = cards?.length ? cards : homeData.hero.cards;

  const searchDestinations = (destinations?.length ? destinations : homeData.destinations)
    .map((item) => ({ name: item.name, href: getDestinationHref(item.name) }))
    .filter((item) => item.href);

  return (
    <section className="w-full">
      <div className="relative overflow-hidden bg-[linear-gradient(105deg,#0A2050_0%,#13275C_26%,#3D2A63_52%,#8C3A48_76%,#DC5F2E_100%)]">

        {/* DECORATIVE GLOW + WAVES — gradients only, no assets */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-32 h-[460px] w-[460px] rounded-full bg-[#FF8A3D]/30 blur-[110px]" />
          <div className="absolute -bottom-40 right-1/4 h-[420px] w-[420px] rounded-full bg-[#F0762B]/25 blur-[120px]" />
          <div className="absolute -left-32 top-1/4 h-[380px] w-[380px] rounded-full bg-[#1E4FA3]/40 blur-[110px]" />

          <svg
            viewBox="0 0 1440 620"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-full w-full"
            fill="none"
          >
            <path
              d="M0 300 C 260 250, 470 420, 700 560 C 900 680, 1150 700, 1440 660 L1440 620 L0 620 Z"
              fill="#0A2050"
              fillOpacity="0.45"
            />
            <path d="M760 620 C 900 470, 1120 430, 1440 420 L1440 620 Z" fill="#FFFFFF" fillOpacity="0.07" />
            <path d="M0 250 C 300 210, 520 400, 780 540" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative mx-auto w-full max-w-[1280px] px-4 pb-7 pt-7 sm:px-6 sm:pb-16 sm:pt-9 lg:px-0 lg:pb-20 lg:pt-10">

          <div className="grid gap-6 lg:grid-cols-[1fr_1.08fr] lg:gap-10">

            {/* LEFT — HEADLINE */}
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/65 sm:text-[12px]">
                {homeData.hero.title}
                <span className="hidden sm:inline">
                  <span className="mx-1.5 text-white/35">/</span> {homeData.hero.tagline}
                </span>
              </p>

              <h1 className="mt-2.5 text-[32px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[44px] lg:text-[52px]">
                Discover your next
                <span className="mt-0.5 block bg-gradient-to-r from-[#FF7A1A] via-[#FB923C] to-[#FBBF24] bg-clip-text text-transparent">
                  escape
                </span>
              </h1>

              <p className="mt-3.5 max-w-[520px] text-[14px] leading-relaxed text-white/80 sm:text-[15.5px]">
                <span className="mr-2 inline-block h-px w-6 bg-[#FF7A1A] align-middle" />
                Handpicked group departures across India and the world — flights, stays,
                sightseeing and a tour manager, all in one price.
              </p>
            </div>

            {/* RIGHT — FLIGHT PATH, SCRIPT NOTE, TRUST STRIP */}
            <div className="hidden flex-col justify-between gap-5 sm:flex">

              <div aria-hidden className="relative hidden h-[168px] lg:block">
                <svg
                  viewBox="0 0 560 168"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M8 164 C 90 154, 96 84, 176 80 C 250 76, 258 34, 336 26"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="1 9"
                  />
                </svg>

                <Plane
                  className="absolute left-[58%] top-1 h-11 w-11 rotate-[42deg] fill-white text-white"
                  strokeWidth={1}
                />

                <div className="absolute right-0 top-0 text-right">
                  <p className={`${script.className} -rotate-3 text-[32px] leading-[1.05] text-white`}>
                    Travel
                    <br />
                    More
                    <br />
                    Live Better
                  </p>
                  <svg viewBox="0 0 180 16" className="ml-auto mt-1 h-4 w-[150px]" fill="none">
                    <path d="M6 9 C 52 2, 128 2, 174 6" stroke="#FF9B4D" strokeWidth="2.5" strokeLinecap="round" />
                    <path
                      d="M18 14 C 60 9, 120 9, 162 12"
                      stroke="#FF9B4D"
                      strokeOpacity="0.6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* TRUST STRIP */}
              <div className="grid gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/20">
                {TRUST.map((item) => (
                  <div key={item.title} className="flex items-center gap-2.5 sm:px-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-white/35">
                      <item.icon className="h-[18px] w-[18px] text-white" strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-semibold leading-tight text-white sm:whitespace-nowrap">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-[10.5px] leading-snug text-white/60 sm:whitespace-nowrap">
                        {item.note}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CATEGORY CARDS */}
          <HeroCardRail count={cardData.length}>
            {cardData.map((card) => {
              const href = CARD_LINKS[card.title] ?? "/india";
              const style = CARD_STYLES[card.title] ?? CARD_STYLES["India Tours"];
              const Icon = style.icon;

              return (
                <Link
                  key={card.title}
                  href={href}
                  className="group relative flex w-[78%] shrink-0 snap-start flex-col justify-between gap-3.5 rounded-2xl border border-white/20 bg-white/95 p-4 no-underline shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-white sm:w-auto sm:shrink sm:flex-row sm:items-center sm:gap-3.5 sm:p-4"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.chip} ${style.text} sm:h-auto sm:w-auto sm:rounded-none sm:bg-transparent`}
                  >
                    <Icon className="h-6 w-6 sm:h-9 sm:w-9" strokeWidth={1.5} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-bold leading-snug text-[#0F172A] sm:text-[14px] sm:leading-tight">
                      {card.title}
                    </span>
                    <span className="mt-1 block text-[13.5px] text-[#6B7280] sm:text-[12.5px]">
                      {shortSubtitle(card.subtitle)}
                    </span>
                  </span>

                  {/* Gradient lifted from the logo: magenta through to orange */}
                  <span className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C8489C] via-[#F0762B] to-[#FF9018] text-[13.5px] font-bold text-white shadow-[0_4px_12px_rgba(240,118,43,0.28)] transition duration-200 group-hover:brightness-105 sm:hidden">
                    View Tours
                    <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>

                  <span
                    className={`absolute right-5 top-5 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full ${style.chip} ${style.text} transition-transform duration-200 group-hover:translate-x-0.5 sm:static sm:flex`}
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </Link>
              );
            })}
          </HeroCardRail>
        </div>
      </div>

      {/* SEARCH — desktop only; phones get the hero and cards without it */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1280px] px-3 sm:-mt-10 sm:block sm:px-6 lg:-mt-12 lg:px-0">
        <HeroSearchPanel destinations={searchDestinations} />
      </div>

    </section>
  );
}
