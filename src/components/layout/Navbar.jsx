"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import MegaMenu from "./MegaMenu";
import SpecialtyToursMenu from "./SpecialtyToursMenu";
import CustomizedHolidaysMenu from "./CustomizedHolidaysMenu";
import { indiaNavigation, worldNavigation } from "@/data/navigationData";

const links = [
  { label: "India", megaMenu: "india", href: "/india" },
  { label: "World", megaMenu: "world", href: "/world" },
  { label: "Specialty Tours", megaMenu: "specialty" },
  { label: "Customized Holidays", megaMenu: "customized" },
  { label: "Flights", hasBadge: true, href: "/flights" },
  { label: "Transport", href: "/transport" },
  { label: "Hotels", href: "/hotels" },
  { label: "Gift Cards" },
  { label: "Contact Us" },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
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

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <nav className="sticky top-0 z-50 hidden border-b border-slate-700/60 bg-[#0B3B63] text-white lg:block">
      <div className="mx-auto hidden h-[36px] max-w-[1280px] items-center justify-center overflow-x-auto px-3 sm:px-6 lg:flex lg:px-0">
        <div className="flex items-center gap-2 whitespace-nowrap text-[13px] font-medium sm:gap-4">
          {links.map((link) => {
            const isMega = Boolean(link.megaMenu);
            const isActive = isMega && openMenu === link.megaMenu;

            const inner = (
              <div
                className={`flex items-center gap-1 rounded-[8px] border-b-2 px-2 py-1 transition ${
                  isActive ? "border-[#17BEBB] bg-white text-[#0F172A]" : "border-transparent"
                }`}
              >
                <span className={isActive ? "" : "transition hover:text-[#5EEAD4]"}>{link.label}</span>
                {link.hasChevron ? <ChevronDown className="h-3.5 w-3.5" /> : null}
                {isMega ? (
                  <ChevronDown className={`h-3.5 w-3.5 ${isActive ? "rotate-180" : ""}`} />
                ) : null}
                {link.hasBadge ? (
                  <span className="rounded-sm bg-[#E53935] px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
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
                  className="hidden lg:block"
                  onMouseEnter={() => openNow(link.megaMenu)}
                  onMouseLeave={closeWithDelay}
                >
                  {link.href ? (
                    <Link href={link.href} className="no-underline">
                      {inner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleNow(link.megaMenu)}
                      className="no-underline"
                    >
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

            if (link.href) {
              return (
                <Link key={link.label} href={link.href} className="no-underline lg:block">
                  {inner}
                </Link>
              );
            }

            return (
              <div key={link.label} className={isMega ? "lg:hidden" : ""}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      {/* BACKDROP for desktop mega menu */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={openMenu ? 0 : -1}
        onClick={closeNow}
        className={`fixed inset-0 top-[112px] z-30 hidden bg-black/30 transition-opacity duration-200 lg:block ${
          openMenu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
    </nav>
  );
}
