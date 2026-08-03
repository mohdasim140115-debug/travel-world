import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TourCategoryPage from "@/components/tours/TourCategoryPage";
import { packages } from "@/data/packages";

export const metadata = {
  title: "World Tour Packages | International Holiday Packages",
  description:
    "Explore World tour packages across Europe, South East Asia, Australia, Japan, Dubai and more with Travel World's curated international group holidays.",
};

const worldSlugs = [
  "highlights-of-thailand",
  "best-of-nepal",
  "highlights-of-sri-lanka",
  "european-highlights",
  "best-of-dubai",
  "singapore-malaysia",
  "best-of-vietnam",
  "japan-explorer",
  "australia-highlights",
  "swiss-paris-delight",
];

const worldPackages = worldSlugs
  .map((slug) => packages.find((item) => item.slug === slug))
  .filter(Boolean);

const config = {
  slug: "world",
  breadcrumbTrail: ["World Tour Packages"],
  heading: "World Tour Packages",
  hiddenSections: ["regions", "interests", "seasons", "durations", "blogs"],
  intro:
    "Step beyond borders with Travel World's international holiday packages, thoughtfully designed to cover the most loved destinations across the globe.",
  introExtra:
    "From the canals of Europe and the beaches of South East Asia to the deserts of the Middle East and the temples of Japan, our group departures combine comfortable stays, curated sightseeing and experienced tour managers so you can travel the world without the planning stress.",
  reviewsLabel: "8,412 Reviews",
  tabs: [
    "All of World (329)",
    "Europe",
    "South East Asia",
    "America",
    "Japan China Korea",
    "Australia New Zealand",
    "Africa",
    "Mauritius",
    "Bhutan",
    "Sri Lanka",
    "Nepal",
  ],
  listing: {
    countLine1: "329 World Holiday",
    countLine2: "Packages",
    showingLabel: "Showing 1-10 packages from 329 packages",
    liveBadgeLabel: "16 Tours Ongoing in World right now!",
  },
  filters: {
    priceMin: "60,000",
    priceMax: "3,50,000",
    priceRanges: ["₹60,000 - ₹1L", "₹1L - ₹1.6L", "₹1.6L - ₹2.4L", "₹2.4L above"],
    departureCities: [
      "Mumbai (184)",
      "Delhi (156)",
      "Ahmedabad (72)",
      "Hyderabad (64)",
      "Bangalore (58)",
      "Kolkata (41)",
      "Chennai (38)",
      "Pune (33)",
      "Cochin (14)",
      "Indore (11)",
    ],
    countries: [
      "Switzerland (24)",
      "France (22)",
      "Austria (14)",
      "Germany (12)",
      "Italy (19)",
      "Australia (11)",
      "China (9)",
      "Thailand (18)",
      "Vietnam (7)",
      "United States (10)",
      "Japan (8)",
      "Singapore (13)",
      "Malaysia (13)",
      "Indonesia (6)",
      "UAE (16)",
    ],
    cities: [
      "Bangkok (18)",
      "Paris (22)",
      "Zurich (14)",
      "Dubai (16)",
      "Singapore (13)",
      "Tokyo (8)",
      "Kathmandu (5)",
      "Colombo (6)",
      "Sydney (7)",
      "Kuala Lumpur (10)",
    ],
    durations: ["3 - 8 Days", "9 - 14 Days", "15 - 21 Days", "22+ Days"],
    packageTypes: ["Group Tour (241)", "Customized Holidays (61)", "Inbound (27)"],
    specialityTours: [
      "Family (94)",
      "Women's Special (27)",
      "Seniors' Special (22)",
      "Honeymoon Special (18)",
      "Short Trips (14)",
    ],
  },
  packages: worldPackages,
  regions: {
    title: "World Tour Packages By Region",
    items: [
      { name: "Europe", count: "94 tours" },
      { name: "South East Asia", count: "68 tours" },
      { name: "America", count: "32 tours" },
      { name: "Australia & New Zealand", count: "18 tours" },
      { name: "Africa", count: "11 tours" },
      { name: "Middle East", count: "24 tours" },
    ],
  },
  interests: {
    title: "World Tour Packages By Interest",
    items: ["Family", "Women's Special", "Seniors' Special", "Honeymoon", "Short Trips"],
  },
  seasons: {
    title: "World Tour Packages By Season",
    items: ["Summer", "Monsoon", "Winter", "Spring"],
  },
  durations: {
    title: "Explore World Packages By Duration",
    items: ["Less than 5 days", "6 to 8 days", "9 to 14 days", "More than 14 days"],
    packages: worldPackages.slice(0, 4),
  },
  blogs: [
    "Best places to visit in Europe",
    "South East Asia on a budget",
    "A first-timer's guide to Dubai",
    "Japan Travel Guide",
    "Top Australia Experiences",
  ],
  reviews: [
    {
      name: "Priya",
      tour: "European Highlights",
      category: "Family",
      review:
        "A beautifully organised European trip. Every city was covered comfortably and the tour manager was excellent throughout.",
    },
    {
      name: "Rohan",
      tour: "Best of Vietnam",
      category: "Group Tour",
      review:
        "Halong Bay cruise was the highlight of the trip. Hotels and transport were well planned across the entire itinerary.",
    },
    {
      name: "Meera",
      tour: "Best of Dubai",
      category: "Family",
      review:
        "Loved the desert safari and city tour. Everything was smooth from arrival to departure.",
    },
  ],
  faqHeading: "World Frequently Asked Questions",
  faqSubheading: "We help you prepare for your international trip and answer commonly asked questions.",
  faqs: [
    {
      question: "What World tour packages does Travel World offer?",
      answer:
        "Travel World offers international group tours, customized holidays and speciality departures across Europe, South East Asia, America, Australia, Japan, the Middle East and more.",
    },
    {
      question: "Is a visa required for World tour packages?",
      answer:
        "Visa requirements depend on the destination and nationality of the traveller. Our tour team shares detailed visa guidance once you select a package.",
    },
    {
      question: "What is included in World tour packages?",
      answer:
        "Inclusions vary by itinerary but generally cover accommodation, selected meals, sightseeing, on-tour transport and tour manager services as mentioned in the package.",
    },
    {
      question: "Can I join a World tour from any Indian city?",
      answer:
        "Departure cities vary by tour. Many international packages also offer joining and leaving options for travellers arranging their own flights.",
    },
    {
      question: "What is the best season to travel internationally?",
      answer:
        "This depends on the destination — Europe is popular in summer, South East Asia works well most of the year, while destinations like Japan have distinct seasonal highlights.",
    },
  ],
  seo: {
    heading: "Get to know more about World Destinations before booking your tour packages",
    paragraphs: [
      "The world is full of extraordinary destinations, from the historic streets of Europe to the tropical islands of South East Asia, the deserts of the Middle East and the modern cities of East Asia. Every region offers travellers a distinct experience shaped by its culture, landscape and heritage.",
      "Our World tour packages are designed to make international holiday planning simple, with thoughtfully curated itineraries covering iconic landmarks, comfortable stays and well-organised sightseeing across popular global destinations.",
    ],
    extraParagraphs: [
      "Whether you are planning a family holiday, a group getaway or a speciality tour, choosing the right international itinerary helps you make the most of your time abroad. Consider your preferred season, travel duration and destination while selecting a package.",
      "Explore the available World packages above, compare regions and select a holiday that matches your travel plans and budget.",
    ],
  },
};

export default function WorldPage() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <TourCategoryPage config={config} />
      </main>

      <Footer />
    </>
  );
}
