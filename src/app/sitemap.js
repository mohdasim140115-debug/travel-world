import { SITE_URL } from "@/lib/seo";
import { packages } from "@/data/packages";
import { getDestinationParams } from "@/data/destinations";
import { getSpecialitySlugs } from "@/data/specialityTours";
import { getDepartureCityParams } from "@/data/departureCities";
import { getAllRouteSlugs } from "@/data/flightRoutes";
import { prisma } from "@/lib/prisma";

function url(path, { changeFrequency = "weekly", priority = 0.6 } = {}) {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap() {
  const [transportRoutes, hotels] = await Promise.all([
    prisma.transportRoute.findMany({ select: { slug: true } }),
    prisma.hotel.findMany({ select: { slug: true, citySlug: true } }),
  ]);

  const staticPages = [
    url("/", { changeFrequency: "daily", priority: 1 }),
    url("/india", { changeFrequency: "daily", priority: 0.9 }),
    url("/world", { changeFrequency: "daily", priority: 0.9 }),
    url("/speciality-tours", { priority: 0.7 }),
    url("/customized-holidays", { priority: 0.7 }),
    url("/flights", { changeFrequency: "daily", priority: 0.8 }),
    url("/transport", { priority: 0.7 }),
    url("/hotels", { changeFrequency: "daily", priority: 0.8 }),
    url("/womens-special", { priority: 0.6 }),
    url("/seniors-special", { priority: 0.6 }),
  ];

  const packagePages = packages.map((pkg) =>
    url(`/package/${pkg.slug}`, { priority: 0.7 })
  );

  const indiaDestinationPages = getDestinationParams("india").map(({ destination }) =>
    url(`/india/${destination}`, { priority: 0.7 })
  );

  const worldDestinationPages = getDestinationParams("world").map(({ destination }) =>
    url(`/world/${destination}`, { priority: 0.7 })
  );

  const specialityPages = getSpecialitySlugs().map((category) =>
    url(`/speciality-tours/${category}`, { priority: 0.6 })
  );

  const departureCityPages = getDepartureCityParams().map(({ city }) =>
    url(`/tour-packages-from/${city}`, { priority: 0.6 })
  );

  const flightRoutePages = getAllRouteSlugs().map(({ route }) =>
    url(`/flights/${route}`, { priority: 0.6 })
  );

  const transportRoutePages = transportRoutes.map((route) =>
    url(`/transport/${route.slug}`, { priority: 0.6 })
  );

  const hotelCityPages = Array.from(new Set(hotels.map((h) => h.citySlug))).map((citySlug) =>
    url(`/hotels/${citySlug}`, { priority: 0.6 })
  );

  const hotelDetailPages = hotels.map((hotel) =>
    url(`/hotels/${hotel.citySlug}/${hotel.slug}`, { priority: 0.6 })
  );

  return [
    ...staticPages,
    ...packagePages,
    ...indiaDestinationPages,
    ...worldDestinationPages,
    ...specialityPages,
    ...departureCityPages,
    ...flightRoutePages,
    ...transportRoutePages,
    ...hotelCityPages,
    ...hotelDetailPages,
  ];
}
