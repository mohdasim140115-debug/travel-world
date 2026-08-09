-- CreateTable
CREATE TABLE "Hotel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "citySlug" TEXT NOT NULL,
    "starRating" INTEGER NOT NULL DEFAULT 4,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "pricePerNight" INTEGER NOT NULL,
    "amenities" JSONB NOT NULL,
    "rooms" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_slug_key" ON "Hotel"("slug");
