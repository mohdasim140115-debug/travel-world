import "dotenv/config";
import { db } from "../src/lib/db.js";
import { client, getDb } from "../src/lib/mongodb.js";

import { packages } from "../src/data/packages.js";
import { rawDestinations } from "../src/data/destinations.js";
import { rawCities } from "../src/data/departureCities.js";
import { flightRoutes } from "../src/data/flightRoutes.js";
import { airports } from "../src/data/airports.js";
import { homeData } from "../src/data/homeData.js";

/* =========================================================
   Data that lives inline inside components (not in src/data/)
   — copied here once so the DB becomes the single source of
   truth going forward. Kept local to the seed script since
   it is only needed for this one-time migration.
========================================================= */

const indiaListingPackages = [
  { slug: "delhi-agra-tour-package", title: "Delhi Agra", image: "/window.svg", tags: ["GROUP TOUR", "SALE", "Short Trips"], days: "5 Days", cities: "5 Cities", dates: "9 Dates", price: "₹28,000", emi: "₹2,776/month", highlights: "Fatehpur Sikri, Taj Mahal, Mathura, Agra Fort" },
  { slug: "jaipur-mandawa-tour-package", title: "Jaipur Mandawa", image: "/globe.svg", tags: ["GROUP TOUR", "SALE", "Family"], days: "4 Days", cities: "3 Cities", dates: "2 Dates", price: "₹30,000", emi: "₹2,921/month", highlights: "Mandawa Fort, Mandawa Haveli, Podar Haveli Museum" },
  { slug: "delhi-agra-short-tour", title: "Delhi Agra", image: "/window.svg", tags: ["GROUP TOUR", "SALE", "Short Trips"], days: "4 Days", cities: "3 Cities", dates: "5 Dates", price: "₹31,000", emi: "₹3,018/month", highlights: "Raj Ghat, Lotus Temple, Qutub Minar, Red Fort" },
  { slug: "womens-special-mathura-vrindavan-gokul-govardhan", title: "Women's Special Mathura Vrindavan Gokul Govardhan", image: "/globe.svg", tags: ["GROUP TOUR", "SALE", "Women's Special"], days: "4 Days", cities: "4 Cities", dates: "2 Dates", price: "₹31,000", emi: "₹3,018/month", highlights: "Govardhan Hill, Barsana cable car, Radha Rani Temple" },
  { slug: "mathura-vrindavan-gokul-govardhan", title: "Mathura Vrindavan Gokul Govardhan", image: "/window.svg", tags: ["GROUP TOUR", "SALE", "Family"], days: "4 Days", cities: "4 Cities", dates: "13 Dates", price: "₹31,000", emi: "₹3,018/month", highlights: "Govardhan Hill, Barsana cable car, Radha Rani Temple" },
  { slug: "ayodhya-lucknow-tour-package", title: "Ayodhya Lucknow", image: "/window.svg", tags: ["GROUP TOUR", "SALE", "Short Trips"], days: "5 Days", cities: "2 Cities", dates: "7 Dates", price: "₹34,000", emi: "₹3,311/month", highlights: "Ambedkar Park, Rumi Darwaza, Bada Imambara, British Residency" },
  { slug: "best-of-shimla", title: "Best of Shimla", image: "/globe.svg", tags: ["GROUP TOUR", "SALE", "Short Trips"], days: "5 Days", cities: "4 Cities", dates: "1 Date", price: "₹35,000", emi: "₹3,408/month", highlights: "Shimla Mall Road, Chail Palace, Kali Ka Tibba, Kufri Hills" },
  { slug: "jaipur-udaipur-tour-package", title: "Jaipur Udaipur", image: "/window.svg", tags: ["GROUP TOUR", "SALE", "Family"], days: "5 Days", cities: "2 Cities", dates: "5 Dates", price: "₹35,000", emi: "₹3,408/month", highlights: "Hawa Mahal, Jantar Mantar, City Palace, Panna Meena Ka Kund" },
];

const indiaZoneData = {
  North: [
    { name: "Himachal Pradesh Tour Packages", tours: "21 tours", visual: "from-sky-300 via-slate-100 to-emerald-500" },
    { name: "Jammu And Kashmir Tour Packages", tours: "16 tours", visual: "from-blue-300 via-cyan-100 to-emerald-600", image: "/yasser-mir-Ctd--w6W-bw-unsplash.jpg" },
    { name: "Leh Ladakh Tour Packages", tours: "14 tours", visual: "from-cyan-300 via-blue-100 to-cyan-300", image: "/darshan-chudasama-s5x1zFAuAbs-unsplash.jpg" },
    { name: "Amritsar Tour Packages", tours: "13 tours", visual: "from-teal-300 via-orange-300 to-rose-700" },
    { name: "Agra Tour Packages", tours: "15 tours", visual: "from-orange-100 via-stone-200 to-sky-300" },
    { name: "Delhi Tour Packages", tours: "35 tours", visual: "from-orange-300 via-indigo-200 to-slate-700", image: "/junaid-ahmad-ansari-9WP-NVh2d6U-unsplash.jpg" },
    { name: "Nainital Mussoorie Corbett Tour Packages", tours: "16 tours", visual: "from-emerald-700 via-lime-500 to-indigo-200" },
  ],
  South: [
    { name: "Kerala Tour Packages", tours: "20 tours", visual: "from-emerald-400 via-green-200 to-cyan-500", image: "/philip-liju-srvtMQSWDhE-unsplash.jpg" },
    { name: "Tamil Nadu Tour Packages", tours: "15 tours", visual: "from-orange-300 via-indigo-100 to-stone-500", image: "/sreehari-devadas-Jf6swM8lR-I-unsplash.jpg" },
    { name: "Karnataka Tour Packages", tours: "18 tours", visual: "from-green-400 via-emerald-200 to-blue-400" },
    { name: "Hyderabad Tour Packages", tours: "12 tours", visual: "from-sky-300 via-stone-200 to-indigo-400" },
    { name: "Andaman Tour Packages", tours: "9 tours", visual: "from-cyan-300 via-blue-400 to-emerald-300", image: "/dileesh-kumar-KbirwZJIq7g-unsplash.jpg" },
  ],
  "West & Central": [
    { name: "Rajasthan Tour Packages", tours: "36 tours", visual: "from-orange-300 via-teal-200 to-teal-500", image: "/aditya-siva-6rDbvXzIVpQ-unsplash.jpg" },
    { name: "Gujarat Tour Packages", tours: "17 tours", visual: "from-indigo-200 via-orange-100 to-blue-400" },
    { name: "Maharashtra Tour Packages", tours: "28 tours", visual: "from-green-400 via-slate-300 to-blue-500", image: "/mithil-doshi-pQZBbuPgyW8-unsplash.jpg" },
    { name: "Madhya Pradesh Tour Packages", tours: "16 tours", visual: "from-emerald-400 via-teal-100 to-orange-400" },
  ],
  "East & North East": [
    { name: "Sikkim Tour Packages", tours: "14 tours", visual: "from-blue-300 via-slate-100 to-green-500" },
    { name: "Assam Tour Packages", tours: "13 tours", visual: "from-green-500 via-lime-300 to-sky-400" },
    { name: "Meghalaya Tour Packages", tours: "12 tours", visual: "from-cyan-400 via-green-300 to-slate-600" },
    { name: "Darjeeling Tour Packages", tours: "11 tours", visual: "from-green-500 via-emerald-200 to-blue-300" },
  ],
};

const cityData = {
  city: [
    { name: "Jaipur", tours: "31 tours", style: "from-orange-300 via-rose-500 to-orange-900" },
    { name: "Munnar", tours: "15 tours", style: "from-green-300 via-green-600 to-emerald-900", image: "/vivek-kumar-JS_ohjocm00-unsplash.jpg" },
    { name: "Shimla", tours: "15 tours", style: "from-slate-300 via-slate-500 to-slate-900" },
    { name: "Darjeeling", tours: "11 tours", style: "from-lime-300 via-green-500 to-green-900" },
    { name: "Varanasi", tours: "16 tours", style: "from-orange-300 via-orange-600 to-stone-900" },
    { name: "Mysore", tours: "11 tours", style: "from-teal-200 via-stone-400 to-slate-800" },
  ],
  state: [
    { name: "Rajasthan", tours: "32 tours", style: "from-orange-300 via-rose-500 to-blue-900" },
    { name: "Kerala", tours: "17 tours", style: "from-green-300 via-emerald-600 to-green-900", image: "/gaurav-kumar-lJgUTYYrCy4-unsplash.jpg" },
    { name: "Himachal Pradesh", tours: "11 tours", style: "from-blue-200 via-slate-500 to-blue-900" },
    { name: "Gujarat", tours: "17 tours", style: "from-teal-300 via-orange-500 to-blue-900" },
    { name: "Uttar Pradesh", tours: "24 tours", style: "from-orange-200 via-stone-500 to-slate-900" },
    { name: "Maharashtra", tours: "28 tours", style: "from-green-300 via-slate-600 to-slate-900" },
  ],
};

const seasonData = {
  "March to June": [
    { name: "Srinagar", tours: "4 tours", style: "from-blue-300 via-emerald-500 to-green-900", image: "/anuj-yadav-1KehhzFg_Q0-unsplash.jpg" },
    { name: "Dharamshala", tours: "8 tours", style: "from-slate-300 via-stone-500 to-slate-900" },
    { name: "Sikkim Darjeeling", tours: "14 tours", style: "from-blue-200 via-slate-500 to-blue-900" },
    { name: "Gangtok", tours: "10 tours", style: "from-orange-200 via-green-500 to-slate-900" },
    { name: "Shimla", tours: "15 tours", style: "from-slate-200 via-slate-600 to-slate-900" },
    { name: "Dalhousie", tours: "7 tours", style: "from-blue-200 via-emerald-600 to-slate-900" },
  ],
  "July to October": [
    { name: "Ladakh", tours: "14 tours", style: "from-blue-300 via-indigo-400 to-stone-900", image: "/darshan-chudasama-uWitPuPAzPA-unsplash.jpg" },
    { name: "Kerala", tours: "17 tours", style: "from-green-300 via-emerald-500 to-green-900" },
    { name: "Udaipur", tours: "22 tours", style: "from-blue-200 via-orange-400 to-slate-900" },
    { name: "Coorg", tours: "9 tours", style: "from-green-200 via-green-600 to-slate-900" },
    { name: "Meghalaya", tours: "12 tours", style: "from-cyan-200 via-green-500 to-slate-900" },
    { name: "Goa", tours: "10 tours", style: "from-sky-200 via-cyan-500 to-blue-900", image: "/sarang-pande-IijeyJbmrec-unsplash.jpg" },
  ],
  "November to February": [
    { name: "Jaipur", tours: "31 tours", style: "from-orange-200 via-orange-500 to-blue-900" },
    { name: "Jaisalmer", tours: "10 tours", style: "from-teal-200 via-rose-600 to-orange-900" },
    { name: "Rann of Kutch", tours: "8 tours", style: "from-slate-100 via-slate-400 to-slate-800" },
    { name: "Andaman", tours: "9 tours", style: "from-cyan-200 via-blue-500 to-blue-900" },
    { name: "Varanasi", tours: "16 tours", style: "from-orange-200 via-orange-500 to-stone-900" },
    { name: "Rajasthan", tours: "32 tours", style: "from-teal-200 via-teal-500 to-blue-900" },
  ],
};

const interestTours = [
  { title: "Women's Special Delhi Agra", slug: "womens-special-delhi-agra", tag: "Women's Special", days: "5 Days", cities: "5 Cities", price: "₹34,000", emi: "₹3,311" },
  { title: "Honeymoon Special Kashmir", slug: "jammu-kashmir-tour-packages", isDestinationLink: true, tag: "Honeymoon Special", days: "6 Days", cities: "5 Cities", price: "₹51,000", emi: "₹4,963" },
];

const durationPackages = [
  { title: "Women's Special Delhi Agra", slug: "womens-special-delhi-agra", category: "Women's Special", days: 4, cities: 3, price: "34,000" },
  { title: "Best of Shimla", slug: "best-of-shimla", category: "Short Trips", days: 5, cities: 4, price: "35,000" },
  { title: "Jaipur Mandawa", slug: "jaipur-mandawa-tour-package", category: "Family", days: 4, cities: 3, price: "30,000" },
  { title: "Jaipur Udaipur", slug: "jaipur-udaipur-tour-package", category: "Family", days: 5, cities: 2, price: "35,000" },
];

const blogs = [
  { title: "Best places to visit in India", style: "from-blue-200 via-green-500 to-slate-800" },
  { title: "Rajasthan", style: "from-orange-200 via-orange-600 to-blue-900" },
  { title: "Varanasi Travel Guide", style: "from-orange-200 via-teal-500 to-blue-900" },
  { title: "Travel Stories", style: "from-blue-200 via-slate-500 to-slate-900" },
  { title: "The Greatest Travel Film Ever Made", style: "from-cyan-200 via-blue-500 to-blue-900" },
];

const indiaReviews = [
  { name: "Anil", tour: "Dalhousie Dharamshala Amritsar", category: "Family", review: "Wonderful experience with excellent arrangements. The tour was comfortable, well planned and our tour manager was very helpful throughout the journey.", manager: "Tejas Dnyane" },
  { name: "Nilesh", tour: "Best of Kashmir", category: "Family", review: "Tour manager is amazing. Everything was properly managed and we enjoyed every destination. Hotels, food and sightseeing arrangements were excellent.", manager: "Jayesh Pawar" },
  { name: "Sitaram", tour: "Highlights of Ladakh", category: "Family", review: "We had a wonderful experience during our conducted tour to Ladakh. All arrangements were very professional including transport and accommodation.", manager: "Amol Patil" },
];

const indiaFaqs = [
  { question: "What India tour packages does Honor Tour & Travels offer?", answer: "Honor Tour & Travels offers a wide range of India tour packages including family tours, group tours, women's special tours, seniors' tours, honeymoon packages, short trips and customized holidays across popular destinations in India." },
  { question: "What is included in Honor Tour & Travels India tour packages?", answer: "Package inclusions vary by itinerary, but may include accommodation, sightseeing, selected meals, tour transportation, tour manager services and other experiences mentioned in the selected package." },
  { question: "What is the best time to travel within India with Honor Tour & Travels?", answer: "India can be explored throughout the year. Hill destinations are popular during summer, Rajasthan and several heritage destinations during winter, while many southern and coastal destinations can be visited across multiple seasons." },
  { question: "Does Honor Tour & Travels offer group tours within India for seniors?", answer: "Yes. Seniors can choose from selected group tours and special itineraries designed around comfortable travel, planned sightseeing and assisted tour experiences." },
  { question: "Can I travel to India destinations with Honor Tour & Travels from any Indian city?", answer: "Departure options depend on the selected tour. Joining and leaving options may also be available, allowing travellers to arrange their own journey and join the group at the specified destination." },
];

const promoSlides = [
  { type: "welcome" },
  { type: "poster", title: "BIG TRAVEL DAYS ARE HERE!", subtitle: "Grab the best deals of the season", ctaLabel: "Explore Offers", gradientFrom: "#082C4B", gradientVia: "#0F4C81", gradientTo: "#17BEBB" },
  { type: "poster", title: "EUROPE", subtitle: "Switzerland • Paris • Italy • more", price: "₹1,45,000", gradientFrom: "#0F4C81", gradientVia: "#4DA8DA", gradientTo: "#A9D8F0" },
  { type: "poster", title: "CHINA", subtitle: "From the Great Wall to the Great Leap", ctaLabel: "7 Days, All Inclusive", price: "Just ₹1,59,000", gradientFrom: "#7A2E10", gradientVia: "#D62839", gradientTo: "#FBB627" },
];

async function seedInOrder(model, rows) {
  let order = 0;
  for (const row of rows) {
    await model.create({ data: { ...row, order: order++ } });
  }
}

/** Empties every collection so a re-seed does not duplicate rows. */
async function wipe() {
  const database = await getDb();
  const collections = await database.listCollections().toArray();
  for (const { name } of collections) {
    await database.collection(name).deleteMany({});
  }
  console.log(`Cleared ${collections.length} collections.`);
}

async function main() {
  console.log("Seeding MongoDB from static data...");
  await wipe();

  // Core catalog
  await seedInOrder(db.package, packages);

  await seedInOrder(
    db.destination,
    rawDestinations.map((d) => ({
      slug: d.slug,
      parent: d.parent,
      name: d.name,
      heading: d.heading,
      metaTitle: d.metaTitle,
      metaDescription: d.metaDescription,
      breadcrumbTrail: d.breadcrumbTrail,
      packageCount: d.packageCount,
      liveTourCount: d.liveTourCount,
      reviewsLabel: d.reviewsLabel,
      intro: d.intro,
      introExtra: d.introExtra,
      tabs: d.tabs,
      countries: d.countries ?? null,
      cities: d.cities ?? null,
      packageSlugs: d.packageSlugs,
      joiningLeavingCities: d.joiningLeavingCities ?? null,
      related: d.related ?? null,
      regions: d.regions ?? null,
      faqHeading: d.faqHeading ?? null,
      faqSubheading: d.faqSubheading ?? null,
      faqs: d.faqs ?? null,
      seoParagraphs: d.seoParagraphs ?? null,
      seoExtraParagraphs: d.seoExtraParagraphs ?? null,
    }))
  );

  await seedInOrder(
    db.departureCity,
    rawCities.map((c) => ({
      slug: c.slug,
      name: c.name,
      departures: c.departures,
      startingPrice: c.startingPrice,
      packageCount: c.packageCount,
      reviewsLabel: c.reviewsLabel,
      intro: c.intro,
      introExtra: c.introExtra,
      packageSlugs: c.packageSlugs,
      linkCloudTargets: c.linkCloudTargets,
    }))
  );

  await seedInOrder(
    db.flightRoute,
    flightRoutes.map((r) => ({
      slug: r.slug,
      from: r.from,
      fromCode: r.fromCode,
      to: r.to,
      toCode: r.toCode,
      international: r.international,
      baseDuration: r.baseDuration,
      minPrice: r.minPrice,
      maxPrice: r.maxPrice,
      count: r.count,
      allowStops: r.allowStops,
      description: r.description,
      relatedTours: r.relatedTours,
      otherRoutes: r.otherRoutes,
    }))
  );

  await seedInOrder(db.airport, airports);

  // India page (independently curated content)
  await seedInOrder(db.indiaListingPackage, indiaListingPackages);

  let zoneOrder = 0;
  for (const [region, tours] of Object.entries(indiaZoneData)) {
    for (const tour of tours) {
      await db.indiaZoneCard.create({ data: { region, ...tour, order: zoneOrder++ } });
    }
  }

  let exploreOrder = 0;
  const seedExploreTiles = async (grouped) => {
    for (const [group, tiles] of Object.entries(grouped)) {
      for (const tile of tiles) {
        const { style, ...rest } = tile;
        await db.indiaExploreTile.create({ data: { group, ...rest, visual: style, order: exploreOrder++ } });
      }
    }
  };
  await seedExploreTiles(cityData);
  await seedExploreTiles(seasonData);

  await seedInOrder(db.indiaExploreInterest, interestTours);
  await seedInOrder(db.indiaExploreDuration, durationPackages);
  await seedInOrder(db.indiaBlog, blogs);
  await seedInOrder(db.indiaReview, indiaReviews);
  await seedInOrder(db.indiaFaq, indiaFaqs);

  // Home page sections
  await seedInOrder(db.heroCard, homeData.hero.cards);
  await seedInOrder(db.homeDestination, homeData.destinations);
  await seedInOrder(db.liveTourCard, homeData.liveTours.cards);
  await seedInOrder(db.chinaPromoPackage, homeData.chinaPromo.packages);
  await seedInOrder(db.mostLovedPromoDestination, homeData.mostLovedTours.promoDestinations);
  await seedInOrder(db.mostLovedDestination, homeData.mostLovedTours.destinations);
  await seedInOrder(db.trustStat, homeData.trustReviews.stats);
  await seedInOrder(db.trustReview, homeData.trustReviews.reviews);
  await seedInOrder(db.featuredTourSlide, homeData.featuredTour);
  await seedInOrder(db.continueTravelTour, homeData.continueTravel.tours);
  await seedInOrder(db.tourInclusionFeature, homeData.tourInclusions.features);
  await seedInOrder(
    db.faqItem,
    homeData.faq.questions.map((q, i) => ({ ...q, category: homeData.faq.categories[i] ?? null }))
  );
  await seedInOrder(db.promoSlide, promoSlides);

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.close();
  });
