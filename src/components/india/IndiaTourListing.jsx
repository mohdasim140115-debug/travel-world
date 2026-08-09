"use client";

import { useMemo } from "react";
import { packages } from "@/data/packages";
import TourListing from "@/components/tours/TourListing";

/* =========================================================
   Most packages in packages.js don't have a `country` field
   populated, so it can't be used alone to separate India from
   World tours. Instead, a package counts as India unless its
   title/location mentions a known international city/country.
========================================================= */
const WORLD_KEYWORDS = [
  "thailand", "bangkok", "pattaya", "phuket", "krabi", "chiang mai",
  "nepal", "kathmandu", "pokhara",
  "sri lanka", "colombo", "kandy", "nuwara eliya",
  "switzerland", "zurich", "interlaken", "zermatt", "lucerne",
  "italy", "milan", "venice", "rome",
  "paris", "france",
  "dubai", "abu dhabi",
  "singapore", "kuala lumpur", "genting",
  "vietnam", "hanoi", "halong bay", "ho chi minh", "danang",
  "cambodia", "siem reap", "phnom penh",
  "japan", "tokyo", "kyoto", "osaka", "hakone",
  "korea", "seoul",
  "australia", "sydney", "melbourne", "gold coast", "cairns",
  "new zealand", "auckland", "rotorua", "queenstown",
  "europe", "vienna", "budapest", "prague", "austria", "germany",
  "greece", "athens", "santorini", "mykonos",
  "scandinavia", "copenhagen", "oslo", "stockholm",
  "amsterdam", "brussels", "cologne", "netherlands",
  "london",
  "usa", "america", "new york", "washington", "las vegas", "los angeles",
  "philadelphia", "boston", "san francisco",
  "canada", "vancouver", "banff", "lake louise", "toronto", "niagara falls",
  "south africa", "cape town", "johannesburg", "kruger",
  "kenya", "nairobi", "maasai mara", "lake nakuru", "serengeti", "zanzibar",
  "egypt", "cairo", "luxor", "aswan",
  "china", "beijing", "xian", "xi'an", "shanghai", "suzhou", "chengdu", "guilin",
  "bali", "denpasar", "ubud", "nusa dua",
];

function isIndiaPackage(pkg) {
  if (pkg.country) return false;
  if (pkg.state) return true;
  const haystack = `${pkg.title} ${pkg.location}`.toLowerCase();
  return !WORLD_KEYWORDS.some((keyword) => haystack.includes(keyword));
}

/* =========================================================
   Builds "Label (count)" option lists from the REAL India
   package data (packages.js entries that have a `state`),
   so every filter count on this page matches actual tours —
   and only India-relevant options ever appear here.
========================================================= */
function countBy(items, getKey) {
  const counts = new Map();
  for (const item of items) {
    const key = getKey(item);
    if (!key) continue;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

function toLabelList(counts, { limit } = {}) {
  const entries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const sliced = limit ? entries.slice(0, limit) : entries;
  return sliced.map(([label, count]) => `${label} (${count})`);
}

export default function IndiaTourListing() {
  const indiaPackages = useMemo(() => packages.filter(isIndiaPackage), []);

  const filters = useMemo(() => {
    const departureCounts = countBy(
      indiaPackages.flatMap((pkg) => (pkg.departureCities || []).map((city) => [pkg, city])).map(([, city]) => city),
      (city) => city
    );
    const joiningLeavingCount = indiaPackages.filter((pkg) => pkg.departureCities?.length).length;

    const cityCounts = countBy(
      indiaPackages.flatMap((pkg) => pkg.location.split("•").map((c) => c.trim())),
      (city) => city
    );

    const packageTypeCounts = countBy(indiaPackages, (pkg) => pkg.tourType);
    const specialityCounts = countBy(indiaPackages, (pkg) => pkg.category);

    return {
      departureCities: [
        ...(joiningLeavingCount ? [`Joining / Leaving (${joiningLeavingCount})`] : []),
        ...toLabelList(departureCounts),
      ],
      cities: toLabelList(cityCounts, { limit: 40 }),
      packageTypes: [`All (${indiaPackages.length})`, ...toLabelList(packageTypeCounts)],
      specialityTours: toLabelList(specialityCounts),
    };
  }, [indiaPackages]);

  const topDepartureCities = useMemo(() => {
    const counts = countBy(
      indiaPackages.flatMap((pkg) => pkg.departureCities || []),
      (city) => city
    );
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([city, count]) => `${count} tours from ${city}`);
  }, [indiaPackages]);

  return (
    <TourListing
      packages={indiaPackages}
      filters={filters}
      joiningLeaving={{
        heading: "View India Tour Packages",
        cities: topDepartureCities,
      }}
    />
  );
}
