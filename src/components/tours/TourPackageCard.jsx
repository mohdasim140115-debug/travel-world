"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

/* =========================================================
   GENERIC PACKAGE CARD
   Vertical card (image on top, content, price + CTA) so two
   cards sit comfortably side by side in the listing grid,
   matching the "double listing" layout used across India/
   World/city tour listing pages.
========================================================= */

export default function TourPackageCard({ item }) {
  return (
    <Link
      href={`/package/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-[#cfd4dc] bg-white no-underline shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#2563EB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)]"
    >
      {/* IMAGE */}
      <div className="relative h-[130px] shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b7d7eb] via-[#e8d9b5] to-[#98b1c7] transition-transform duration-300 ease-out group-hover:scale-105" />

        <div className="absolute inset-x-0 top-0 flex flex-wrap gap-1 p-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`border px-1.5 py-[2px] text-[8px] font-semibold ${
                tag.includes("GROUP")
                  ? "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]"
                  : tag.includes("SALE")
                  ? "border-red-400 bg-red-50 text-red-600"
                  : "border-pink-400 bg-pink-50 text-pink-600"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[13px] font-semibold text-[#31465a]">
          {item.title}
        </div>

        <button
          type="button"
          aria-label={`Save ${item.title}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#26394b]/70 text-white transition hover:bg-[#26394b]"
        >
          <Heart size={14} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-[17px] font-semibold text-[#1e1e1e] transition-colors group-hover:text-[#2563EB]">
          {item.title}
        </h3>

        <span className="mt-1 inline-block text-[13px] font-semibold underline">
          ∞ All Inclusive
        </span>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#222]">
          <span>{item.days}</span>
          <span className="text-[#aaa]">•</span>
          <span className="underline">{item.cities}</span>
          <span className="text-[#aaa]">•</span>
          <span className="underline">{item.dates} ›</span>
        </div>

        <div className="mt-3 border-t border-[#ddd] pt-2">
          <p className="text-[12px] font-semibold text-[#56a33b]">Tour Highlights</p>

          <div className="mt-1 flex min-w-0 items-center">
            <p className="truncate text-[13px] text-[#444]">{item.highlights}</p>

            <span className="ml-1 shrink-0 text-[12px] font-semibold underline">More</span>
          </div>
        </div>

        {/* PRICE + CTA */}
        <div className="mt-auto pt-3">
          <div className="flex items-end justify-between gap-2 rounded-[7px] border border-[#BFDBFE] bg-[#EFF6FF] p-3">
            <div>
              <p className="text-[12px] text-[#777]">Starting price per person</p>
              <strong className="text-[22px] leading-none text-[#0B1F3A]">{item.price}</strong>
              <p className="mt-1 text-[12px]">
                EMI from <span className="font-semibold underline">{item.emi}</span>
              </p>
            </div>

            <div className="flex h-[38px] shrink-0 items-center justify-center rounded-[3px] bg-[#2563EB] px-4 text-[14px] font-semibold text-white transition-colors group-hover:bg-[#1D4ED8]">
              View Details
            </div>
          </div>

          <div className="mt-2 flex justify-between text-[12px]">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className="underline hover:text-[#2563EB]"
            >
              Compare
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className="underline hover:text-[#2563EB]"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
