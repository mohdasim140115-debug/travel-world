-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "citySlug" TEXT NOT NULL,
    "starRating" INTEGER NOT NULL DEFAULT 4,
    "rating" REAL NOT NULL DEFAULT 4.5,
    "reviewCount" INTEGER NOT NULL DEFAULT 120,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "pricePerNight" INTEGER NOT NULL,
    "amenities" JSONB NOT NULL,
    "rooms" JSONB NOT NULL,
    "checkInTime" TEXT NOT NULL DEFAULT '2:00 PM',
    "checkOutTime" TEXT NOT NULL DEFAULT '11:00 AM',
    "nearbyAttractions" JSONB,
    "order" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Hotel" ("address", "amenities", "city", "citySlug", "description", "id", "image", "name", "order", "pricePerNight", "rooms", "slug", "starRating") SELECT "address", "amenities", "city", "citySlug", "description", "id", "image", "name", "order", "pricePerNight", "rooms", "slug", "starRating" FROM "Hotel";
DROP TABLE "Hotel";
ALTER TABLE "new_Hotel" RENAME TO "Hotel";
CREATE UNIQUE INDEX "Hotel_slug_key" ON "Hotel"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
