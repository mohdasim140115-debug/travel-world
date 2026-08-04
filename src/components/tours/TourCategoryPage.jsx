"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Star,
  Quote,
  MapPin,
  Mail,
  MessageSquare,
} from "lucide-react";

import TourListing from "./TourListing";
import { toCardItem } from "./tourUtils";

/* =========================================================
   GENERIC TOUR CATEGORY PAGE
   Same structure/design as the India tours page (intro,
   callback form, tabs, listing, destination/interest/season/
   duration sections, reviews, FAQ, SEO) driven entirely by a
   config object so it can be reused for World / Women's
   Special / Seniors' Special without touching /india.
========================================================= */

const gradients = [
  "from-orange-300 via-rose-500 to-orange-900",
  "from-blue-300 via-cyan-100 to-emerald-600",
  "from-green-300 via-emerald-600 to-green-900",
  "from-sky-300 via-slate-100 to-emerald-500",
  "from-cyan-300 via-blue-100 to-cyan-300",
  "from-orange-100 via-stone-200 to-sky-300",
];

function SectionTitle({ children }) {
  return (
    <div className="text-center">
      <h2 className="text-[18px] font-medium text-[#222]">{children}</h2>
      <div className="mx-auto mt-2 h-[2px] w-[65px] bg-[#008C95]" />
    </div>
  );
}

function GradientPill({ name, count, index, href }) {
  return (
    <Link
      href={href || "#"}
      className={`group relative block h-[145px] overflow-hidden rounded-[5px] border border-[#d6d6d6] bg-gradient-to-br no-underline shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#20B8B5] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] ${gradients[index % gradients.length]}`}
    >
      <div className="absolute -bottom-10 -left-8 h-28 w-40 rotate-12 rounded-full bg-black/10" />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-3 pt-14 text-left">
        <h3 className="text-[12px] font-semibold text-white group-hover:underline">{name}</h3>

        {count && <p className="mt-[2px] text-[9px] text-white/90">{count}</p>}
      </div>
    </Link>
  );
}

export default function TourCategoryPage({ config }) {
  const [showMoreIntro, setShowMoreIntro] = useState(false);
  const [showMoreSeo, setShowMoreSeo] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [season, setSeason] = useState(config.seasons.items[0]);
  const [interest, setInterest] = useState(config.interests.items[0]);
  const [duration, setDuration] = useState(config.durations.items[0]);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="india-page">
      {/* =========================
          INTRO SECTION
      ========================== */}
      <section className="india-intro">
        <div className="india-container india-intro-grid">
          <div className="india-intro-content">
            <div className="india-breadcrumb">
              <Link href="/">Home</Link>

              {config.breadcrumbTrail.map((crumb) => (
                <span key={crumb}>
                  › {crumb}
                </span>
              ))}
            </div>

            <h1>{config.heading}</h1>

            <p>{config.intro}</p>

            {showMoreIntro && config.introExtra && (
              <p className="india-extra-text">{config.introExtra}</p>
            )}

            <button
              type="button"
              className="india-read-more"
              onClick={() => setShowMoreIntro(!showMoreIntro)}
            >
              {showMoreIntro ? "Read Less" : "Read More"}

              <ChevronDown
                size={14}
                className={showMoreIntro ? "rotate-chevron" : ""}
              />
            </button>

            <div className="india-rating">
              <div className="india-stars">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={15} fill="currentColor" />
                ))}
              </div>

              <strong>5</strong>

              <span className="rating-divider" />

              <a href="#reviews">{config.reviewsLabel}</a>
            </div>
          </div>

          {/* CALLBACK FORM */}
          <div className="callback-card">
            <h3>Want us to call you?</h3>

            <label htmlFor={`${config.slug}-callback-name`}>Full Name</label>

            <input
              id={`${config.slug}-callback-name`}
              type="text"
              placeholder="Full Name"
            />

            <label htmlFor={`${config.slug}-callback-mobile`}>Mobile Number</label>

            <div className="mobile-input">
              <span>🇮🇳</span>
              <span className="country-code">+91</span>

              <input
                id={`${config.slug}-callback-mobile`}
                type="tel"
                placeholder="Mobile Number"
              />
            </div>

            <button type="button">
              <Phone size={16} />
              Request Call Back
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          CATEGORY TABS + LISTING
      ========================== */}
      <section className="india-tabs-section">
        <div className="india-container">
          <div className="india-tabs">
            {config.tabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={index === activeTab ? "active" : ""}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="india-listing-heading">
            <div>
              <h2>
                {config.listing.countLine1}
                <br />
                {config.listing.countLine2}
              </h2>

              <p>{config.listing.showingLabel}</p>
            </div>

            <div className="live-tours-badge">
              <span />
              {config.listing.liveBadgeLabel}
            </div>

            <div className="listing-actions">
              <select defaultValue="deals">
                <option value="deals">Sort by: Deals</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>

              <button type="button" className="grid-view">
                <span>⊞</span>
                Grid View
              </button>
            </div>
          </div>

          <TourListing
            packages={config.packages}
            filters={config.filters}
            joiningLeaving={config.joiningLeaving}
          />

          {config.pagination !== false && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                className="h-8 rounded-[3px] border border-[#d3d7dd] bg-white px-3 text-[11px] font-medium text-[#333] disabled:text-[#b9bec6]"
              >
                Previous
              </button>

              {[1, 2, 3, 4, 5].map((number) => (
                <button
                  key={number}
                  type="button"
                  className={`h-8 min-w-8 rounded-[3px] border px-2 text-[11px] font-medium ${
                    number === 1
                      ? "border-[#008C95] bg-white text-[#008C95]"
                      : "border-[#d3d7dd] bg-white text-[#333]"
                  }`}
                >
                  {number}
                </button>
              ))}

              <span className="text-[12px] text-[#777]">...</span>

              <button
                type="button"
                className="h-8 rounded-[3px] border border-[#d3d7dd] bg-white px-3 text-[11px] font-medium text-[#333]"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          BY REGION / DESTINATION
      ================================================= */}
      {!config.hiddenSections?.includes("regions") && (
      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">
          <SectionTitle>{config.regions.title}</SectionTitle>

          <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {config.regions.items.map((item, index) => (
              <GradientPill
                key={item.name}
                name={item.name}
                count={item.count}
                index={index}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </section>
      )}

      {/* =================================================
          BY INTEREST
      ================================================= */}
      {!config.hiddenSections?.includes("interests") && (
      <section className="bg-white py-12">
        <div className="india-container">
          <SectionTitle>{config.interests.title}</SectionTitle>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {config.interests.items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setInterest(item)}
                className={`h-[30px] border px-4 text-[9px] ${
                  interest === item
                    ? "border-[#008C95] bg-[#008C95] text-white"
                    : "border-[#777] bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* =================================================
          BY SEASON
      ================================================= */}
      {!config.hiddenSections?.includes("seasons") && (
      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">
          <SectionTitle>{config.seasons.title}</SectionTitle>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {config.seasons.items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSeason(item)}
                className={`h-[32px] min-w-[125px] border px-4 text-[9px] ${
                  season === item
                    ? "border-[#008C95] bg-[#008C95] text-white"
                    : "border-[#444] bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* =================================================
          BY DURATION
      ================================================= */}
      {!config.hiddenSections?.includes("durations") && (
      <section className="bg-white py-12">
        <div className="india-container">
          <SectionTitle>{config.durations.title}</SectionTitle>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {config.durations.items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDuration(item)}
                className={`h-[30px] border px-4 text-[9px] ${
                  duration === item
                    ? "border-[#008C95] bg-[#008C95] text-white"
                    : "border-[#777] bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-7 flex max-w-[1180px] flex-wrap justify-center gap-3">
            {config.durations.packages.map((pkg) => {
              const item = toCardItem(pkg);

              return (
                <Link
                  key={pkg.slug}
                  href={`/package/${pkg.slug}`}
                  className="block w-[220px] shrink-0 rounded-[6px] border border-[#bcc8db] bg-white p-2 no-underline"
                >
                  <div className="h-[72px] rounded-[4px] bg-gradient-to-br from-sky-200 via-orange-200 to-slate-500" />

                  <div className="mt-2">
                    <span className="inline-block border border-[#20B8B5] bg-[#EFF9F8] px-1 py-[1px] text-[7px] font-semibold text-[#008C95]">
                      GROUP TOUR
                    </span>

                    <h3 className="mt-2 min-h-[30px] text-[10px] font-semibold leading-[1.3] text-[#1e1e1e]">
                      {pkg.title}
                    </h3>

                    <span className="mt-1 inline-block text-[9px] font-semibold underline">
                      ∞ All Inclusive
                    </span>

                    <div className="mt-3 flex gap-2 text-[8px]">
                      <span>{item.days}</span>
                      <span>•</span>
                      <span className="underline">{item.cities}</span>
                    </div>

                    <div className="mt-3 grid grid-cols-[1fr_72px] items-end gap-2 border-t pt-2">
                      <div>
                        <p className="text-[7px] text-[#777]">Starting price</p>
                        <strong className="text-[13px]">{item.price}</strong>
                      </div>

                      <span className="flex h-[28px] items-center justify-center rounded-[2px] bg-[#FF7A3D] text-[8px] font-semibold text-white">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* =================================================
          RELATED / EXPLORE MORE
      ================================================= */}
      {config.related && !config.hiddenSections?.includes("related") && (
        <section className="bg-white py-12">
          <div className="india-container">
            {config.related.note && (
              <p className="mx-auto max-w-[820px] text-center text-[11px] leading-[1.7] text-[#555]">
                {config.related.note}
              </p>
            )}

            <SectionTitle>{config.related.title}</SectionTitle>

            <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-3 sm:grid-cols-4">
              {config.related.items.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href || "#"}
                  className="group relative block h-[145px] overflow-hidden rounded-[5px] border border-[#d6d6d6] no-underline shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#20B8B5] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                >
                  <div
                    className={`h-full w-full bg-gradient-to-br ${gradients[index % gradients.length]}`}
                  />

                  <div className="absolute -bottom-10 -left-8 h-28 w-40 rotate-12 rounded-full bg-black/10" />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-3 pt-14 text-left">
                    <h3 className="text-[12px] font-semibold text-white group-hover:underline">
                      {item.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          DESTINATION LINK CLOUD
      ================================================= */}
      {config.linkCloud && !config.hiddenSections?.includes("linkCloud") && (
        <section className="bg-white py-10">
          <div className="india-container">
            <SectionTitle>{config.linkCloud.title}</SectionTitle>

            <div className="mx-auto mt-6 flex max-w-[1180px] flex-wrap justify-center gap-2">
              {config.linkCloud.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-[#d6d6d6] bg-white px-4 py-2 text-[10px] font-medium text-[#333] no-underline transition hover:border-[#20B8B5] hover:text-[#008C95]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          BLOGS
      ================================================= */}
      {!config.hiddenSections?.includes("blogs") && (
      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">
          <SectionTitle>Popular Travel Blogs</SectionTitle>

          <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {config.blogs.map((blog, index) => (
              <article key={blog} className="group cursor-pointer">
                <div
                  className={`h-[115px] rounded-[5px] bg-gradient-to-br ${gradients[index % gradients.length]}`}
                />

                <h3 className="mt-2 text-[10px] font-medium leading-[1.3] text-[#222] group-hover:text-[#008C95]">
                  {blog}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* =================================================
          REVIEWS
      ================================================= */}
      <section id="reviews" className="relative overflow-hidden bg-[#006D77] py-12">
        <div className="india-container relative">
          <Quote
            size={100}
            className="absolute -left-3 top-8 text-white/[0.08]"
            fill="currentColor"
          />

          <Quote
            size={100}
            className="absolute -right-3 bottom-0 rotate-180 text-white/[0.08]"
            fill="currentColor"
          />

          <div className="relative z-10 text-center text-white">
            <h2 className="text-[19px] font-semibold">Travel World tour reviews</h2>

            <p className="mt-1 text-[10px] text-white/80">
              What are you waiting for? Chalo Bag Bharo Nikal Pado!
            </p>
          </div>

          <div className="relative z-10 mx-auto mt-7 grid max-w-[1180px] gap-4 md:grid-cols-3">
            {config.reviews.map((review) => (
              <article
                key={`${review.name}-${review.tour}`}
                className="relative flex min-h-[205px] flex-col rounded-[6px] bg-white p-4 text-[#222]"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-[2px] text-[#ff6b00]">
                    <Star size={11} fill="currentColor" />
                    <span className="text-[10px] font-semibold text-[#222]">5</span>
                  </div>

                  <span className="rounded-[2px] border border-pink-400 px-1.5 py-[1px] text-[7px] text-pink-600">
                    {review.category}
                  </span>
                </div>

                <h3 className="mt-3 text-[12px] font-semibold">{review.tour}</h3>

                <p className="mt-3 line-clamp-3 text-[10px] leading-[1.5] text-[#666]">
                  &quot;{review.review}&quot;
                </p>

                <div className="mt-auto flex items-end justify-between border-t border-[#eee] pt-3">
                  <div>
                    <strong className="block text-[11px]">{review.name}</strong>
                    <span className="text-[8px] text-[#888]">Jul, 2026</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          FAQ
      ================================================= */}
      <section className="bg-[#f7f7f7] py-12">
        <div className="india-container">
          <div className="text-center">
            <h2 className="text-[18px] font-semibold text-[#222]">{config.faqHeading}</h2>

            <p className="mt-2 text-[10px] text-[#777]">{config.faqSubheading}</p>

            <div className="mx-auto mt-2 h-[2px] w-[65px] bg-[#008C95]" />
          </div>

          <div className="mx-auto mt-7 max-w-[820px] space-y-2">
            {config.faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-[4px] border border-[#e4e4e4] bg-white"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex min-h-[44px] w-full items-center justify-between gap-5 px-4 py-3 text-left transition-colors hover:bg-[#FAFAFA]"
                  >
                    <span className="text-[11px] font-medium text-[#333]">
                      {faq.question}
                    </span>

                    {isOpen ? (
                      <ChevronUp size={14} className="shrink-0" />
                    ) : (
                      <ChevronDown size={14} className="shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#eee] px-4 py-4">
                      <p className="text-[10px] leading-[1.7] text-[#666]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================
          SEO CONTENT
      ================================================= */}
      <section className="bg-white py-10">
        <div className="india-container">
          <div className="mx-auto max-w-[1040px]">
            <h2 className="text-[14px] font-semibold text-[#222]">{config.seo.heading}</h2>

            <div className="mt-4 text-[10px] leading-[1.8] text-[#6b6b6b]">
              {config.seo.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 first:mt-0">
                  {paragraph}
                </p>
              ))}

              {showMoreSeo &&
                config.seo.extraParagraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3">
                    {paragraph}
                  </p>
                ))}
            </div>

            <button
              type="button"
              onClick={() => setShowMoreSeo(!showMoreSeo)}
              className="mt-3 flex items-center gap-1 text-[10px] font-semibold underline"
            >
              {showMoreSeo ? "Read Less" : "Read More"}

              {showMoreSeo ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            <div className="mt-6 border-t border-[#ddd] pt-4">
              <p className="text-[8px] text-[#999]">
                {config.heading} | Travel World Holiday Packages | All prices and
                tour information are subject to availability and selected
                itinerary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          CONTACT STRIP
      ================================================= */}
      <section className="border-t border-[#ddd] bg-white">
        <div className="india-container">
          <div className="grid min-h-[72px] grid-cols-2 items-center gap-4 py-3 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <MapPin size={17} className="text-[#008C95]" />

              <div>
                <p className="text-[8px] text-[#777]">150+ Travel World Offices</p>
                <button className="text-[10px] font-semibold underline">Locate Us</button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={17} className="text-[#008C95]" />

              <div>
                <p className="text-[8px] text-[#777]">Request a Quote</p>
                <a href="tel:18003135555" className="text-[10px] font-semibold underline">
                  1800 313 5555
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare size={17} className="text-[#008C95]" />

              <div>
                <p className="text-[8px] text-[#777]">For Feedback</p>
                <span className="text-[9px] font-semibold">feedback@travelworld.com</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={17} className="text-[#008C95]" />

              <div>
                <p className="text-[8px] text-[#777]">For Enquiries</p>
                <span className="text-[9px] font-semibold">travel@travelworld.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
