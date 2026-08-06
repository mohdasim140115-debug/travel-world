"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LogIn, Menu, Mic, Phone, Search, X } from "lucide-react";

const mobileMenuLinks = [
  { label: "India Tours", href: "/india" },
  { label: "World Tours", href: "/world" },
  { label: "Flights", href: "/flights" },
  { label: "Women's Special Tours", href: "/womens-special" },
  { label: "Seniors' Special Tours", href: "/seniors-special" },
  { label: "Corporate Travel", href: "#" },
  { label: "NRI Tours", href: "#" },
  { label: "Forex", href: "#" },
  { label: "Gift Cards", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-slate-700/70 bg-[#0B3B63] text-white">
      <div className="mx-auto flex h-auto w-full max-w-[1280px] flex-wrap items-center gap-3 px-4 py-3 sm:h-[76px] sm:flex-nowrap sm:justify-between sm:py-0 lg:px-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-400/40 bg-white/10 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FBB627] text-sm font-bold text-[#0B3B63]">
              V
            </div>

            <div className="hidden text-[18px] font-semibold tracking-[0.2em] text-white sm:text-[20px] md:block">
              TRAVEL WORLD
            </div>
          </Link>
        </div>

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="flex w-[570px] items-center rounded-full border border-slate-300/30 bg-white px-4 py-2 shadow-md">
            <Search className="mr-3 h-4 w-4 text-slate-500" />
            <input
              aria-label="Search tours"
              className="w-full border-[#0F172A] bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
              placeholder='Search "Rann of Kutch"'
            />
            <button className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B3B63] text-white">
              <Mic className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <a
            href="tel:18003135555"
            className="flex items-center gap-2 rounded-full border border-slate-400/40 bg-slate-800/50 px-3 py-2 no-underline"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#17BEBB] text-white">
              <Phone className="h-4 w-4" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Call us</div>
              <div className="text-[13px] font-semibold text-white">1800 313 5555</div>
            </div>
            <span className="text-[13px] font-semibold text-white sm:hidden">1800 313 5555</span>
            <ChevronDown className="hidden h-4 w-4 text-slate-300 sm:block" />
          </a>

          <button className="flex items-center gap-2 rounded-full border border-slate-400/40 bg-white/10 px-3 py-2 text-sm font-medium text-white">
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Login</span>
          </button>

          <button className="hidden items-center gap-2 rounded-full border border-slate-400/40 bg-white px-3 py-2 text-sm font-medium text-[#0F172A] lg:flex">
            <span className="text-base">🇮🇳</span>
            <span className="hidden sm:inline">India</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div className="order-last w-full lg:hidden">
          <div className="flex w-full items-center rounded-full border border-slate-300/30 bg-white px-4 py-2 shadow-md">
            <Search className="mr-3 h-4 w-4 flex-shrink-0 text-slate-500" />
            <input
              aria-label="Search tours"
              className="w-full min-w-0 border-[#0F172A] bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
              placeholder='Search "Gulmarg"'
            />
            <button className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0B3B63] text-white">
              <Mic className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SLIDE-DOWN MENU */}
      {mobileOpen ? (
        <div className="border-t border-slate-700/60 bg-[#0B3B63] px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {mobileMenuLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-[8px] px-3 py-2.5 text-[14px] font-medium text-white no-underline transition hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
