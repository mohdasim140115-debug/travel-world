export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.honortourtravels.com";
export const SITE_NAME = "Honor Tour & Travels";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
export const DEFAULT_KEYWORDS = [
  "Honor Tour & Travels",
  "tour packages",
  "India tour packages",
  "world tour packages",
  "holiday packages",
  "flight booking",
  "hotel booking",
  "customized holidays",
];

function absoluteUrl(path = "/") {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Builds a Next.js Metadata object with title, description, canonical,
 * Open Graph and Twitter tags pre-wired from a small set of inputs.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = true,
  keywords = [],
  type = "website",
}) {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function tourSchema({ title, description, image, price, path, days }) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description,
    image: image ? absoluteUrl(image) : DEFAULT_OG_IMAGE,
    url: absoluteUrl(path),
    ...(days ? { itinerary: { "@type": "ItemList", numberOfItems: days } } : {}),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(path),
    },
    provider: {
      "@type": "TravelAgency",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function hotelSchema({ name, description, image, address, rating, reviewCount, pricePerNight, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name,
    description,
    image: image ? absoluteUrl(image) : DEFAULT_OG_IMAGE,
    url: absoluteUrl(path),
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressCountry: "IN",
    },
    ...(rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating,
            reviewCount: reviewCount || 1,
          },
        }
      : {}),
    ...(pricePerNight
      ? {
          priceRange: `₹${pricePerNight}`,
        }
      : {}),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/india?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

