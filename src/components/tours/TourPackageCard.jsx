"use client";

import Link from "next/link";
import { ArrowLeftRight, Heart, MessageCircle } from "lucide-react";
import { getDestinationImage } from "@/data/destinationImages";

/* =========================================================
   GENERIC PACKAGE CARD
   Vertical card (image on top, content, price + CTA) so two
   cards sit comfortably side by side in the listing grid,
   matching the "double listing" layout used across India/
   World/city tour listing pages.

   Mobile (<640px) uses a compact redesigned layout; sm+
   keeps the original desktop card unchanged.
========================================================= */

function Tags({ tags, className = "" }) {
  return (
    <div className={className}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`border px-1.5 py-[2px] text-[7px] font-semibold sm:text-[8px] ${
            tag.includes("GROUP")
              ? "border-[#17BEBB] bg-[#F7FAFC] text-[#0F4C81]"
              : tag.includes("SALE")
              ? "border-amber-400 bg-amber-50 text-amber-700"
              : "border-pink-400 bg-pink-50 text-pink-600"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function TourPackageCard({ item }) {
  const image = item.image || getDestinationImage(item.title);

  return (
    <Link
      href={`/package/${item.slug}`}
      className="group relative flex h-full flex-col transform-gpu overflow-hidden rounded-[14px] border border-[#cfd4dc] bg-white no-underline shadow-[0_2px_10px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-[3px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)] sm:rounded-xl sm:shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
    >
      {/* IMAGE + TAGS (mobile: small square thumbnail with
          tags beside it; sm+: original full-width banner
          with tags overlaid on top) */}
      <div className="flex gap-3 p-3 pb-0 sm:block sm:p-0">
        <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[10px] sm:h-[130px] sm:w-full sm:rounded-none">
          <img
            src={image}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          {/* TAGS overlay (sm+ only) */}
          <Tags tags={item.tags} className="absolute inset-x-0 top-0 hidden flex-wrap gap-1 p-2 sm:flex" />
        </div>

        {/* TAGS beside image (mobile only) */}
        <Tags tags={item.tags} className="flex flex-1 flex-wrap items-start gap-1 sm:hidden" />
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

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-3 pt-2.5 sm:pt-3">
        <h3 className="text-[20px] font-bold leading-tight text-[#1e1e1e] transition-colors group-hover:text-[#0F4C81] sm:text-[17px] sm:font-semibold">
          {item.title}
        </h3>

        <span className="mt-1 inline-block text-[13px] font-semibold underline">
          ∞ All Inclusive
        </span>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[14px] font-medium text-[#222] sm:text-[13px]">
          <span>{item.days}</span>
          <span className="text-[#aaa]">•</span>
          <span className="underline">{item.cities}</span>
          <span className="text-[#aaa]">•</span>
          <span className="underline">{item.dates} ›</span>
        </div>

        <div className="mt-2.5 border-t border-[#ddd] pt-2 sm:mt-3">
          <p className="text-[12px] font-semibold text-[#56a33b]">Tour Highlights</p>

          <div className="mt-1 flex min-w-0 items-center">
            <p className="truncate text-[13px] text-[#444]">{item.highlights}</p>

            <span className="ml-1 shrink-0 text-[12px] font-semibold underline">More</span>
          </div>
        </div>

        {/* PRICE + CTA — mobile layout */}
        <div className="mt-auto pt-2.5 sm:hidden">
          <div className="rounded-[12px] border border-[#17BEBB] bg-[#F7FAFC] p-3">
            <div className="flex items-center justify-between gap-2 text-[12px] text-[#777]">
              <span>Starting price per person</span>
              <span>
                EMI from <span className="font-semibold text-[#0F172A] underline">{item.emi}</span>
              </span>
            </div>

            <strong className="mt-1 block text-[30px] leading-none text-[#0F172A]">{item.price}</strong>

            <div className="mt-3 flex h-[44px] w-full items-center justify-center rounded-[10px] bg-[#FF7A1A] text-[15px] font-semibold text-white transition-colors group-hover:bg-[#E56A0F]">
              View Details
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-center gap-8 text-[14px]">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className="flex items-center gap-1.5 underline hover:text-[#0F4C81]"
            >
              <ArrowLeftRight size={13} />
              Compare
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className="flex items-center gap-1.5 underline hover:text-[#0F4C81]"
            >
              <MessageCircle size={13} />
              Enquire Now
            </button>
          </div>
        </div>

        {/* PRICE + CTA — desktop layout (unchanged) */}
        <div className="hidden sm:block sm:mt-auto sm:pt-3">
          <div className="flex items-end justify-between gap-2 rounded-xl border border-[#17BEBB] bg-[#F7FAFC] p-3">
            <div>
              <p className="text-[12px] text-[#777]">Starting price per person</p>
              <strong className="text-[22px] leading-none text-[#0F172A]">{item.price}</strong>
              <p className="mt-1 text-[12px]">
                EMI from <span className="font-semibold underline">{item.emi}</span>
              </p>
            </div>

            <div className="flex h-[38px] shrink-0 items-center justify-center rounded-[3px] bg-[#FF7A1A] px-4 text-[14px] font-semibold text-white transition-colors group-hover:bg-[#E56A0F]">
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
              className="underline hover:text-[#0F4C81]"
            >
              Compare
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className="underline hover:text-[#0F4C81]"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
