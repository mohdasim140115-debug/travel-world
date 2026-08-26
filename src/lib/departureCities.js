import { db } from "./db.js";

/* =========================================================
   DEPARTURE CITIES
   Backs the panel's "Departure Cities" module, which drives
   the /tour-packages-from-{city} pages.
========================================================= */

export function getDepartureCityRecords() {
  return db.departureCity.findMany({ orderBy: { order: "asc" } });
}

export async function getDepartureCityParamsFromDb() {
  const rows = await db.departureCity.findMany({
    select: { slug: true },
    orderBy: { order: "asc" },
  });
  return rows.map(({ slug }) => ({ city: slug }));
}
