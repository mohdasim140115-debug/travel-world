/* =========================================================
   IMAGE PATHS -> public/uploads/...
   public/ ki images folder-wise organize hui hain, to database
   me stored paths bhi update karne hain.

   Sirf local paths (/xyz.jpg) chhuta hai — bahar ke URLs
   (wikimedia waale) aur pehle se /uploads/ wale paths waise
   ke waise rehte hain, isliye ye script dobara chalane par
   kuch nahi bigadta.

     node scripts/migrate-image-paths.mjs [--dry]
========================================================= */

import "dotenv/config";
import { getDb, client } from "../src/lib/mongodb.js";

const DRY = process.argv.includes("--dry");

// collection -> field
const TARGETS = {
  hotel: "image",
  liveTourCard: "image",
  indiaZoneCard: "image",
  indiaExploreTile: "image",
  mostLovedDestination: "image",
  featuredTourSlide: "image",
  indiaListingPackage: "image",
  package: "imageUrl",
  transportOption: "image",
};

/** /abc.jpg -> /uploads/destinations/abc.jpg ; svg -> placeholders */
function relocate(value) {
  if (typeof value !== "string" || !value.startsWith("/")) return null; // remote or empty
  if (value.startsWith("/uploads/")) return null;                        // already moved

  const name = value.replace(/^\//, "");
  if (/\.svg$/i.test(name)) return `/uploads/placeholders/${name}`;
  if (/^logo\.png$/i.test(name)) return "/uploads/brand/logo.png";
  return `/uploads/destinations/${name}`;
}

const db = await getDb();
let changed = 0;

for (const [collection, field] of Object.entries(TARGETS)) {
  const rows = await db.collection(collection).find({ [field]: { $ne: null } }).toArray();

  for (const row of rows) {
    const next = relocate(row[field]);
    if (!next) continue;

    if (!DRY) {
      await db.collection(collection).updateOne({ _id: row._id }, { $set: { [field]: next } });
    }
    changed += 1;
    console.log(`  ${collection}: ${row[field]}  →  ${next}`);
  }
}

console.log(`\n${DRY ? "[dry run] " : ""}${changed} records updated.`);
await client.close();
