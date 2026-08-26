import { db } from "./db.js";

/* =========================================================
   CURATED DESTINATIONS
   The `destination` collection backs the panel's
   "Destinations (India + World)" module. Slugs it does not
   cover still fall through to the synthesized pages in
   src/data/destinations.js, so a link to an uncurated
   destination keeps working.
========================================================= */

export function getDestinationRecords() {
  return db.destination.findMany({ orderBy: { order: "asc" } });
}

export async function getDestinationParamsFromDb(parent) {
  const records = await db.destination.findMany({
    where: { parent },
    select: { slug: true },
    orderBy: { order: "asc" },
  });
  return records.map(({ slug }) => ({ destination: slug }));
}
