

"use client";

"use client";

import { useState } from "react";
import { ChevronDown, Phone, Star } from "lucide-react";
import IndiaTourListing from "./IndiaTourListing";
import IndiaTourZones from "./IndiaTourZones";
import IndiaTourExplore from "./IndiaTourExplore";
import IndiaTourBottom from "./IndiaTourBottom";

export default function IndiaToursPage({ catalog = [], content = {} }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="india-page">
      {/* =========================
          INTRO SECTION
      ========================== */}
      <section className="india-intro">
        <div className="india-container india-intro-grid">
          
          {/* LEFT CONTENT */}
          <div className="india-intro-content">
            <div className="india-breadcrumb">
              Home <span>›</span> India Tour Packages
            </div>

            <h1>India Tour Packages</h1>

            <p>
              The ancient spark of the spiritual land, with ethnic evolutionary
              life, completely different from anywhere on the globe, is the
              land where your soul awaits to transcend!
            </p>

            {showMore && (
              <p className="india-extra-text">
                Discover unforgettable India holidays covering mountains,
                beaches, heritage cities, wildlife destinations and spiritual
                experiences. Choose from family tours, group holidays,
                honeymoon packages and customized travel experiences across
                India.
              </p>
            )}

            <button
              type="button"
              className="india-read-more"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Read Less" : "Read More"}

              <ChevronDown
                size={14}
                className={showMore ? "rotate-chevron" : ""}
              />
            </button>

            {/* RATING */}
            <div className="india-rating">
              <div className="india-stars">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    size={15}
                    fill="currentColor"
                  />
                ))}
              </div>

              <strong>5</strong>

              <span className="rating-divider" />

              <a href="#reviews">11,004 Reviews</a>
            </div>
          </div>

          {/* =========================
              CALLBACK FORM
          ========================== */}
          <div className="callback-card">
            <h3>Want us to call you?</h3>

            <label htmlFor="callback-name">
              Full Name
            </label>

            <input
              id="callback-name"
              type="text"
              placeholder="Full Name"
            />

            <label htmlFor="callback-mobile">
              Mobile Number
            </label>

            <div className="mobile-input">
              <span>🇮🇳</span>

              <span className="country-code">
                +91
              </span>

              <input
                id="callback-mobile"
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
          CATEGORY + PACKAGES
      ========================== */}
      <section className="india-tabs-section">
        <div className="india-container">

          {/* =========================
              FILTER + TOUR CARDS
          ========================== */}
          <IndiaTourListing catalog={catalog} />



        </div>
      </section>

       <IndiaTourZones zones={content.zones} />

       <IndiaTourExplore
         cityTiles={content.cityTiles}
         seasonTiles={content.seasonTiles}
         interests={content.interests}
         durations={content.durations}
         blogs={content.blogs}
       />

       <IndiaTourBottom reviews={content.reviews} faqs={content.faqs} />
    </div>
  );
}