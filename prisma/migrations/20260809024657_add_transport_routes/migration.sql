-- CreateTable
CREATE TABLE "TransportRoute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "distanceKm" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "TransportRoute_slug_key" ON "TransportRoute"("slug");
