"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LogIn, Menu, Mic, Phone, Search, X } from "lucide-react";
import { SPECIALTY_FEATURED, SPECIALTY_MORE } from "@/data/specialityTours";
import { CUSTOMIZED_HOLIDAYS_MENU, PLAN_MY_HOLIDAY_HREF } from "@/data/customizedHolidays";

const mobileMenuLinks = [
  { label: "India Tours", href: "/india" },
  { label: "World Tours", href: "/world" },
  {
    label: "Speciality Tours",
    submenu: {
      type: "flat",
      items: [...SPECIALTY_FEATURED, ...SPECIALTY_MORE],
      viewAllHref: "/speciality-tours",
      viewAllLabel: "View All Speciality Tours",
    },
  },
  {
    label: "Customized Holidays",
    submenu: {
      type: "grouped",
      groups: [
        CUSTOMIZED_HOLIDAYS_MENU.indiaHolidays,
        CUSTOMIZED_HOLIDAYS_MENU.worldHolidays,
        CUSTOMIZED_HOLIDAYS_MENU.travelStyle,
        CUSTOMIZED_HOLIDAYS_MENU.holidayServices,
      ],
      viewAllHref: PLAN_MY_HOLIDAY_HREF,
      viewAllLabel: "Plan My Holiday",
    },
  },
  { label: "Flights", href: "/flights" },
  { label: "Women's Special Tours", href: "/womens-special" },
  { label: "Seniors' Special Tours", href: "/seniors-special" },
  { label: "Transport", href: "/transport" },
  { label: "Hotels", href: "/hotels" },
  { label: "Gift Cards", href: "#" },
  { label: "Contact Us", href: "#" },
];

function MobileAccordionItem({ link, openIndex, index, onToggle, onNavigate }) {
  if (!link.submenu) {
    return (
      <Link
        href={link.href}
        onClick={onNavigate}
        className="rounded-[8px] px-3 py-2.5 text-[14px] font-medium text-white no-underline transition hover:bg-white/10"
      >
        {link.label}
      </Link>
    );
  }

  const isOpen = openIndex === index;

  return (
    <div>
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="flex w-full items-center justify-between rounded-[8px] px-3 py-2.5 text-[14px] font-medium text-white transition hover:bg-white/10"
      >
        {link.label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-2 mt-1 space-y-3 rounded-[8px] bg-white/5 px-3 py-3">
          {link.submenu.type === "flat" &&
            link.submenu.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="block py-1 text-[13px] text-white/85 no-underline"
              >
                {item.name}
              </Link>
            ))}

          {link.submenu.type === "grouped" &&
            link.submenu.groups.map((group) => (
              <div key={group.heading}>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#5EEAD4]">
                  {group.heading}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className="py-0.5 text-[13px] text-white/85 no-underline"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

          <Link
            href={link.submenu.viewAllHref}
            onClick={onNavigate}
            className="mt-1 inline-block text-[13px] font-semibold text-[#FBB627] no-underline underline"
          >
            {link.submenu.viewAllLabel} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  function closeMobileMenu() {
    setMobileOpen(false);
    setOpenAccordion(null);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/70 bg-[#0B3B63] text-white lg:static">
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

          <Link href="/" className="flex items-center no-underline">
            <img
              src="/logo.jpeg"
              alt="Honor Tour & Travels"
              className="h-10 w-auto rounded-[8px] object-contain sm:h-11"
            />
          </Link>
        </div>

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="flex w-[570px] items-center rounded-full border border-transparent bg-white px-4 py-2 shadow-md transition-colors focus-within:border-[#17BEBB]">
            <Search className="mr-3 h-4 w-4 text-slate-500" />
            <input
              aria-label="Search tours"
              className="w-full bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
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
          <div className="flex w-full items-center rounded-full border border-transparent bg-white px-4 py-2 shadow-md transition-colors focus-within:border-[#17BEBB]">
            <Search className="mr-3 h-4 w-4 flex-shrink-0 text-slate-500" />
            <input
              aria-label="Search tours"
              className="w-full min-w-0 bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
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
        <div className="max-h-[75vh] overflow-y-auto border-t border-slate-700/60 bg-[#0B3B63] px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {mobileMenuLinks.map((link, index) => (
              <MobileAccordionItem
                key={link.label}
                link={link}
                index={index}
                openIndex={openAccordion}
                onToggle={(idx) => setOpenAccordion((current) => (current === idx ? null : idx))}
                onNavigate={closeMobileMenu}
              />
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
