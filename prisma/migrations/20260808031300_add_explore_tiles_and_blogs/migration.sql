-- CreateTable
CREATE TABLE "IndiaExploreTile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "group" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tours" TEXT NOT NULL,
    "visual" TEXT NOT NULL,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "IndiaBlog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);
