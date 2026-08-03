export function formatINR(value) {
  return `₹${new Intl.NumberFormat("en-IN").format(value)}`;
}

export function toCardItem(pkg, extraTag) {
  return {
    slug: pkg.slug,
    title: pkg.title,
    tags: ["GROUP TOUR", "SALE", extraTag || pkg.category],
    days: `${pkg.days} Days`,
    cities: `${pkg.cities} Cities`,
    dates: `${pkg.departures.length} Dates`,
    price: formatINR(pkg.price),
    emi: `${formatINR(pkg.emi)}/month`,
    highlights: pkg.highlights.join(", "),
  };
}

/* =========================================================
   REAL CLIENT-SIDE FILTER MATCHING
   Used by TourListing to actually filter the package array
   instead of rendering inert checkboxes.
========================================================= */

export function stripCount(label) {
  return label.replace(/\s*\(.*\)\s*$/, "").trim();
}

export function packageMatchesKeyword(pkg, keyword) {
  const needle = stripCount(keyword).toLowerCase();
  const haystack = `${pkg.title} ${pkg.location} ${pkg.category}`.toLowerCase();
  return haystack.includes(needle);
}

function parseDurationBucket(label) {
  const plusMatch = label.match(/(\d+)\s*\+/);
  if (plusMatch) return { min: Number(plusMatch[1]), max: Infinity };

  const rangeMatch = label.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) return { min: Number(rangeMatch[1]), max: Number(rangeMatch[2]) };

  return null;
}

export function packageMatchesDuration(pkg, label) {
  const bucket = parseDurationBucket(label);
  if (!bucket) return true;
  return pkg.days >= bucket.min && pkg.days <= bucket.max;
}

export function filterPackages(packages, filters) {
  const { cities = [], countries = [], packageTypes = [], specialityTours = [], durations = [], maxPrice } = filters;

  return packages.filter((pkg) => {
    if (cities.length > 0 && !cities.some((city) => packageMatchesKeyword(pkg, city))) return false;
    if (countries.length > 0 && !countries.some((country) => packageMatchesKeyword(pkg, country))) return false;
    if (packageTypes.length > 0 && !packageTypes.some((type) => packageMatchesKeyword(pkg, type))) return false;
    if (specialityTours.length > 0 && !specialityTours.some((type) => packageMatchesKeyword(pkg, type))) return false;
    if (durations.length > 0 && !durations.some((label) => packageMatchesDuration(pkg, label))) return false;
    if (typeof maxPrice === "number" && pkg.price > maxPrice) return false;
    return true;
  });
}
