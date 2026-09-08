"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import MegaMenu from "./MegaMenu";
import SpecialtyToursMenu from "./SpecialtyToursMenu";
import CustomizedHolidaysMenu from "./CustomizedHolidaysMenu";
import { indiaNavigation, worldNavigation } from "@/data/navigationData";
import { CONTACT } from "@/lib/contact";
import { SPECIALTY_FEATURED, SPECIALTY_MORE } from "@/data/specialityTours";
import { CUSTOMIZED_HOLIDAYS_MENU, PLAN_MY_HOLIDAY_HREF } from "@/data/customizedHolidays";

const links = [
  { label: "India", megaMenu: "india", href: "/india" },
  { label: "World", megaMenu: "world", href: "/world" },
  { label: "Specialty Tours", megaMenu: "specialty" },
  { label: "Customized Holidays", megaMenu: "customized" },
  { label: "Flights", hasBadge: true, href: "/flights" },
  { label: "Transport", href: "/transport" },
  { label: "Hotels", href: "/hotels" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Contact Us", href: "/contact" },
];

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
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Contact Us", href: "/contact" },
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

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const closeTimer = useRef(null);

  function openNow(key) {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(key);
  }

  function closeWithDelay() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }

  function closeNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(null);
  }

  function toggleNow(key) {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu((current) => (current === key ? null : key));
  }

  function closeMobileMenu() {
    setMobileOpen(false);
    setOpenAccordion(null);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
      setOpenAccordion(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // The drawer scrolls on its own; the page behind it must not.
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0B3B63] text-white shadow-[0_1px_0_rgba(255,255,255,0.08),0_4px_16px_rgba(11,59,99,0.25)]">
      <div className="mx-auto flex h-[62px] w-full max-w-[1280px] items-center gap-4 px-4 sm:px-6 lg:h-[68px] lg:px-6 xl:px-0">

        <Link href="/" className="flex shrink-0 items-center no-underline">
          <Image
            src="/uploads/brand/logo.png"
            alt="Honor Tour & Travels"
            width={929}
            height={269}
            priority
            className="h-8 w-auto object-contain sm:h-9"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="ml-auto hidden items-center lg:flex">
          <div className="flex items-center whitespace-nowrap text-[12.5px] font-medium xl:text-[13.5px]">
            {links.map((link) => {
              const isMega = Boolean(link.megaMenu);
              const isActive = isMega && openMenu === link.megaMenu;

              const inner = (
                <div
                  className={`relative flex h-[68px] items-center gap-1.5 transition-colors after:absolute after:inset-x-2 after:bottom-0 after:h-[2px] after:rounded-full after:transition-colors xl:px-3.5 px-2 ${
                    isActive
                      ? "text-white after:bg-[#17BEBB]"
                      : "text-white/80 after:bg-transparent hover:text-white hover:after:bg-white/30"
                  }`}
                >
                  <span>{link.label}</span>
                  {isMega ? (
                    <ChevronDown className={`h-3.5 w-3.5 ${isActive ? "rotate-180" : ""}`} />
                  ) : null}
                  {link.hasBadge ? (
                    <span className="rounded-[3px] bg-[#E53935] px-1 py-px text-[9px] font-bold uppercase tracking-[0.1em] leading-[1.5] text-white">
                      New
                    </span>
                  ) : null}
                </div>
              );

              if (isMega) {
                const menuProps = {
                  open: isActive,
                  onNavigate: closeNow,
                  onMouseEnter: () => openNow(link.megaMenu),
                  onMouseLeave: closeWithDelay,
                };

                return (
                  <div
                    key={link.label}
                    onMouseEnter={() => openNow(link.megaMenu)}
                    onMouseLeave={closeWithDelay}
                  >
                    {link.href ? (
                      <Link href={link.href} className="no-underline">
                        {inner}
                      </Link>
                    ) : (
                      <button type="button" onClick={() => toggleNow(link.megaMenu)} className="no-underline">
                        {inner}
                      </button>
                    )}

                    {link.megaMenu === "india" && <MegaMenu data={indiaNavigation} {...menuProps} />}
                    {link.megaMenu === "world" && <MegaMenu data={worldNavigation} {...menuProps} />}
                    {link.megaMenu === "specialty" && <SpecialtyToursMenu {...menuProps} />}
                    {link.megaMenu === "customized" && <CustomizedHolidaysMenu {...menuProps} />}
                  </div>
                );
              }

              return (
                <Link key={link.label} href={link.href} className="no-underline">
                  {inner}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* CALL PILL — widest screens only, where the links leave room */}
        <a
          href={CONTACT.phoneHref}
          className="ml-5 hidden shrink-0 items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-[13px] font-semibold text-white no-underline transition hover:bg-white/10 xl:flex"
        >
          <Phone className="h-4 w-4" />
          {CONTACT.phone}
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* BACKDROP for desktop mega menu */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={openMenu ? 0 : -1}
        onClick={closeNow}
        className={`fixed inset-0 top-[68px] z-30 hidden bg-black/30 transition-opacity duration-200 lg:block ${
          openMenu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* MOBILE DRAWER — slides in over the page, with its own scroll */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={closeMobileMenu}
          className={`absolute inset-0 h-full w-full cursor-default bg-black/60 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-[340px] flex-col bg-[#0B3B63] shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
            <Link href="/" onClick={closeMobileMenu} className="flex items-center no-underline">
              <Image
                src="/uploads/brand/logo.png"
                alt="Honor Tour & Travels"
                width={929}
                height={269}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
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
          </nav>

          <div className="shrink-0 border-t border-white/10 px-4 py-3">
            <a
              href={CONTACT.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full bg-[#17BEBB] px-4 py-2.5 text-[14px] font-semibold text-white no-underline"
            >
              <Phone className="h-4 w-4" />
              {CONTACT.phone}
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}
