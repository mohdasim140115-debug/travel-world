

"use client";

"use client";

import { useState } from "react";
import { ChevronDown, Phone, Star } from "lucide-react";
import IndiaTourListing from "./IndiaTourListing";
import IndiaTourZones from "./IndiaTourZones";
import IndiaTourExplore from "./IndiaTourExplore";
import IndiaTourBottom from "./IndiaTourBottom";

export default function IndiaToursPage() {
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

          {/* CATEGORY TABS */}
          <div className="india-tabs">
            <button type="button" className="active">
              All of India (264)
            </button>

            <button type="button">
              Rajasthan (32)
            </button>

            <button type="button">
              Uttar Pradesh (24)
            </button>

            <button type="button">
              North East (19)
            </button>

            <button type="button">
              Himachal Pradesh (11)
            </button>

            <button type="button">
              Gujarat (17)
            </button>

            <button type="button">
              Kerala (17)
            </button>

            <button type="button">
              Nainital Mussoorie Corbett (16)
            </button>

            <button type="button">
              Leh Ladakh (14)
            </button>

            <button type="button">
              Jammu and Kashmir (16)
            </button>
          </div>

          {/* =========================
              LISTING HEADING
          ========================== */}
          <div className="india-listing-heading">
            
            {/* PACKAGE COUNT */}
            <div>
              <h2>
                264 India Holiday
                <br />
                Packages
              </h2>

              <p>
                Showing 1-10 packages from 264 packages
              </p>
            </div>

            {/* LIVE TOURS */}
            <div className="live-tours-badge">
              <span />
              11 Tours Ongoing in India right now!
            </div>

            {/* SORT */}
            <div className="listing-actions">
              <select defaultValue="deals">
                <option value="deals">
                  Sort by: Deals
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

                <option value="duration">
                  Duration
                </option>
              </select>

              <button
                type="button"
                className="grid-view"
              >
                <span>⊞</span>
                Grid View
              </button>
            </div>
          </div>

          {/* =========================
              FILTER + TOUR CARDS
          ========================== */}
          <IndiaTourListing />



        </div>
      </section>

       <IndiaTourZones />

       <IndiaTourExplore />

       <IndiaTourBottom />
    </div>
  );
}