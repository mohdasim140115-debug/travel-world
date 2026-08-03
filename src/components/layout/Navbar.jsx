"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import MegaMenu from "./MegaMenu";
import MobileNavAccordion from "./MobileNavAccordion";
import { indiaNavigation, worldNavigation } from "@/data/navigationData";

const links = [
  { label: "India", megaMenu: "india", href: "/india" },
  { label: "World", megaMenu: "world", href: "/world" },
  { label: "Specialty Tours", hasChevron: true },
  { label: "Customized Holidays", hasChevron: true },
  { label: "Flights", hasBadge: true, href: "/flights" },
  { label: "Corporate Travel" },
  { label: "NRI Tours" },
  { label: "Forex", hasChevron: true },
  { label: "Gift Cards" },
  { label: "Contact Us" },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
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

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileMenu(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <nav className="relative border-b border-slate-700/60 bg-[#071426] text-white">
      <div className="mx-auto flex h-[36px] max-w-[1280px] items-center justify-center overflow-x-auto px-3 sm:px-6 lg:px-0">
        <div className="flex items-center gap-2 whitespace-nowrap text-[13px] font-medium sm:gap-4">
          {links.map((link) => {
            const isMega = Boolean(link.megaMenu);
            const isActive = isMega && openMenu === link.megaMenu;

            const inner = (
              <div
                className={`flex items-center gap-1 rounded-[4px] px-2 py-1 transition ${
                  isActive ? "bg-white text-[#0B1F3A]" : ""
                }`}
              >
                <span className={isActive ? "" : "transition hover:text-[#60A5FA]"}>{link.label}</span>
                {link.hasChevron ? <ChevronDown className="h-3.5 w-3.5" /> : null}
                {isMega ? (
                  <ChevronDown className={`h-3.5 w-3.5 ${isActive ? "rotate-180" : ""}`} />
                ) : null}
                {link.hasBadge ? (
                  <span className="rounded-sm bg-[#E53935] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                    New
                  </span>
                ) : null}
              </div>
            );

            if (isMega) {
              return (
                <div
                  key={link.label}
                  className="hidden lg:block"
                  onMouseEnter={() => openNow(link.megaMenu)}
                  onMouseLeave={closeWithDelay}
                >
                  <Link href={link.href} className="no-underline">
                    {inner}
                  </Link>

                  <MegaMenu
                    data={link.megaMenu === "india" ? indiaNavigation : worldNavigation}
                    open={isActive}
                    onNavigate={closeNow}
                    onMouseEnter={() => openNow(link.megaMenu)}
                    onMouseLeave={closeWithDelay}
                  />
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

      {/* MOBILE India/World triggers + accordion (hover doesn't exist on touch) */}
      <div className="flex gap-1 border-t border-slate-700/40 px-3 py-1.5 lg:hidden">
        {["india", "world"].map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setMobileMenu(mobileMenu === key ? null : key)}
            className={`flex items-center gap-1 rounded-[4px] px-2 py-1 text-[12px] font-medium ${
              mobileMenu === key ? "bg-white text-[#0B1F3A]" : "text-white"
            }`}
          >
            {key === "india" ? "India" : "World"}
            <ChevronDown className={`h-3 w-3 ${mobileMenu === key ? "rotate-180" : ""}`} />
          </button>
        ))}
      </div>

      {mobileMenu && (
        <div className="border-t border-slate-700/40 lg:hidden">
          <MobileNavAccordion
            data={mobileMenu === "india" ? indiaNavigation : worldNavigation}
            overviewHref={mobileMenu === "india" ? "/india" : "/world"}
            overviewLabel={mobileMenu === "india" ? "All India Tour Packages" : "All World Tour Packages"}
            onNavigate={() => setMobileMenu(null)}
          />
        </div>
      )}

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
