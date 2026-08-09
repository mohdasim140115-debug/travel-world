-- CreateTable
CREATE TABLE "TransportOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "capacity" INTEGER NOT NULL,
    "acType" TEXT NOT NULL DEFAULT 'AC',
    "pricePerKm" INTEGER NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);
