import { db } from "./db.js";
import { buildRoute, flightRoutes as staticRoutes, getRouteBySlugOrNull } from "@/data/flightRoutes";
import { airports as staticAirports } from "@/data/airports";

/* =========================================================
   FLIGHT ROUTES & AIRPORTS
   Both are admin-managed. The files under src/data stay as
   the fallback so a fresh database still renders a complete
   site — the same pattern the rest of the content loaders
   use.
========================================================= */

const byOrder = { orderBy: { order: "asc" } };

export async function getFlightRoutes() {
  try {
    const rows = await db.flightRoute.findMany(byOrder);
    if (rows.length) return rows.map(buildRoute);
  } catch (error) {
    console.error("[flights] route load failed:", error.message);
  }
  return staticRoutes;
}

export async function getFlightRoute(slug) {
  const rows = await getFlightRoutes();
  // A slug the admin has not stored still resolves: the static helper
  // synthesises a route from the two city tokens.
  return rows.find((route) => route.slug === slug) || getRouteBySlugOrNull(slug);
}

export async function getFlightRouteSlugs() {
  const rows = await getFlightRoutes();
  return rows.map((route) => ({ route: route.slug }));
}

export async function getAirports() {
  try {
    const rows = await db.airport.findMany(byOrder);
    if (rows.length) return rows.map(({ city, code, country }) => ({ city, code, country }));
  } catch (error) {
    console.error("[flights] airport load failed:", error.message);
  }
  return staticAirports;
}
