-- CreateTable
CREATE TABLE "Package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tourType" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "nights" INTEGER NOT NULL,
    "cities" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "emi" INTEGER NOT NULL,
    "rating" REAL NOT NULL DEFAULT 5,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "country" TEXT,
    "state" TEXT,
    "relatedGroup" TEXT,
    "departureCities" JSONB,
    "highlights" JSONB NOT NULL,
    "inclusions" JSONB NOT NULL,
    "exclusions" JSONB,
    "itinerary" JSONB NOT NULL,
    "departures" JSONB NOT NULL,
    "needToKnow" JSONB,
    "cancellationPolicy" JSONB,
    "paymentTerms" JSONB,
    "upgrades" JSONB,
    "tourDetails" JSONB,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "parent" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "metaTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "breadcrumbTrail" JSONB NOT NULL,
    "packageCount" INTEGER NOT NULL DEFAULT 0,
    "liveTourCount" INTEGER NOT NULL DEFAULT 0,
    "reviewsLabel" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "introExtra" TEXT NOT NULL,
    "tabs" JSONB NOT NULL,
    "countries" JSONB,
    "cities" JSONB,
    "packageSlugs" JSONB NOT NULL,
    "joiningLeavingCities" JSONB,
    "related" JSONB,
    "regions" JSONB,
    "faqHeading" TEXT,
    "faqSubheading" TEXT,
    "faqs" JSONB,
    "seoParagraphs" JSONB,
    "seoExtraParagraphs" JSONB,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "DepartureCity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departures" INTEGER NOT NULL,
    "startingPrice" INTEGER NOT NULL,
    "packageCount" INTEGER NOT NULL,
    "reviewsLabel" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "introExtra" TEXT NOT NULL,
    "packageSlugs" JSONB NOT NULL,
    "linkCloudTargets" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FlightRoute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "fromCode" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "toCode" TEXT NOT NULL,
    "international" BOOLEAN NOT NULL DEFAULT false,
    "baseDuration" INTEGER NOT NULL,
    "minPrice" INTEGER NOT NULL,
    "maxPrice" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "allowStops" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "relatedTours" JSONB NOT NULL,
    "otherRoutes" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Airport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "IndiaZoneCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tours" TEXT NOT NULL,
    "visual" TEXT NOT NULL,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "IndiaListingPackage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tags" JSONB NOT NULL,
    "days" TEXT NOT NULL,
    "cities" TEXT NOT NULL,
    "dates" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "emi" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "IndiaExploreInterest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isDestinationLink" BOOLEAN NOT NULL DEFAULT false,
    "tag" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "cities" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "emi" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "IndiaExploreDuration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "cities" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "IndiaReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tour" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "IndiaFaq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "HeroCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "HomeDestination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tourCount" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "LiveTourCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "destination" TEXT NOT NULL,
    "liveTourCount" TEXT NOT NULL,
    "color1" TEXT NOT NULL,
    "color2" TEXT NOT NULL,
    "color3" TEXT NOT NULL,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ChinaPromoPackage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "days" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "MostLovedPromoDestination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "MostLovedDestination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "guests" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "TrustStat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "TrustReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "guest" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "FeaturedTourSlide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "region" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "locations" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ContinueTravelTour" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "cta" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "TourInclusionFeature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "FaqItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "PromoSlide" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "title" TEXT,
    "subtitle" TEXT,
    "ctaLabel" TEXT,
    "price" TEXT,
    "gradientFrom" TEXT,
    "gradientVia" TEXT,
    "gradientTo" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "AdminSetting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DepartureCity_slug_key" ON "DepartureCity"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "FlightRoute_slug_key" ON "FlightRoute"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_code_key" ON "Airport"("code");

-- CreateIndex
CREATE UNIQUE INDEX "IndiaListingPackage_slug_key" ON "IndiaListingPackage"("slug");
