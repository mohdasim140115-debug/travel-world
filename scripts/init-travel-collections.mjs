/* =========================================================
   INDEXES FOR THE BOOKING COLLECTIONS
   Safe to run repeatedly — createIndex is idempotent. Run it
   once per environment before taking live bookings.

     node scripts/init-travel-collections.mjs
========================================================= */

import "dotenv/config";
import { getDb, client } from "../src/lib/mongodb.js";

const INDEXES = [
  // The unique idempotency key is what stops a double-submit becoming two bookings.
  ["travelBooking", { idempotencyKey: 1 }, { unique: true, name: "idempotencyKey_unique" }],
  ["travelBooking", { bookingRef: 1 }, { unique: true, name: "bookingRef_unique" }],
  ["travelBooking", { "contact.email": 1, createdAt: -1 }, { name: "customer_history" }],
  ["travelBooking", { status: 1, createdAt: -1 }, { name: "status_recent" }],
  ["travelBooking", { productType: 1, createdAt: -1 }, { name: "product_recent" }],

  ["passenger", { bookingRef: 1 }, { name: "by_booking" }],

  // One gateway order per booking; a replayed callback updates, never duplicates.
  ["payment", { bookingRef: 1, orderId: 1 }, { unique: true, name: "booking_order_unique" }],
  ["payment", { status: 1, createdAt: -1 }, { name: "status_recent" }],

  ["supplierOrder", { bookingRef: 1, createdAt: -1 }, { name: "by_booking" }],
  ["supplierOrder", { status: 1, createdAt: -1 }, { name: "status_recent" }],

  ["user", { email: 1 }, { unique: true, name: "email_unique" }],
];

const db = await getDb();

for (const [collection, keys, options] of INDEXES) {
  try {
    const name = await db.collection(collection).createIndex(keys, options);
    console.log(`  ok    ${collection}.${name}`);
  } catch (error) {
    console.error(`  FAIL  ${collection}.${options.name}: ${error.message}`);
  }
}

console.log("\nDone.");
await client.close();
