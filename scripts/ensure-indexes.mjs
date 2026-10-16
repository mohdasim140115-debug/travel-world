/* =========================================================
   DATABASE INDEXES
   The collections were created by the app, so none of them
   had an index beyond _id — every slug lookup was a full
   collection scan. Small collections hide that locally and
   show it as latency once the data grows.

   Safe to run as often as you like: createIndex is a no-op
   when the index already exists.

     node scripts/ensure-indexes.mjs
========================================================= */

import fs from "node:fs";
import { pathToFileURL } from "node:url";

for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match) process.env[match[1]] ??= match[2].replace(/^"|"$/g, "");
}

const { getDb } = await import(pathToFileURL(process.cwd() + "/src/lib/mongodb.js").href);

const INDEXES = {
  package: [{ slug: 1 }, { order: 1 }, { status: 1 }],
  destination: [{ parent: 1, slug: 1 }, { order: 1 }],
  slugRedirect: [{ model: 1, from: 1 }],
  hotel: [{ slug: 1 }, { order: 1 }],
  flightRoute: [{ slug: 1 }, { order: 1 }],
  transportRoute: [{ slug: 1 }, { order: 1 }],
  departureCity: [{ slug: 1 }, { order: 1 }],
  airport: [{ order: 1 }],
  airline: [{ order: 1 }],
  // The admin lists these newest-first and the spam guard reads by IP.
  enquiry: [{ createdAt: -1 }, { status: 1 }],
  booking: [{ createdAt: -1 }, { status: 1 }],
  hotelBooking: [{ createdAt: -1 }],
  flightBooking: [{ createdAt: -1 }],
  transportBooking: [{ createdAt: -1 }],
  formVisitor: [{ ip: 1 }, { updatedAt: -1 }],
};

const database = await getDb();
const existing = new Set((await database.listCollections().toArray()).map((c) => c.name));

let created = 0;

let skipped = 0;

for (const [collection, specs] of Object.entries(INDEXES)) {
  if (!existing.has(collection)) continue;

  // Some slugs already carry a unique index from the original schema.
  // Re-creating one with the same name but different options is an error,
  // so anything already covering the same keys is left alone.
  const already = new Set(
    (await database.collection(collection).indexes()).map((index) => JSON.stringify(index.key)),
  );

  for (const spec of specs) {
    if (already.has(JSON.stringify(spec))) {
      skipped += 1;
      continue;
    }

    const name = await database.collection(collection).createIndex(spec);
    created += 1;
    console.log(`created  ${collection}.${name}`);
  }
}

console.log(`\n${created} created, ${skipped} already present.`);
process.exit(0);
