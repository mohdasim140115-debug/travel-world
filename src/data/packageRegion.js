/* =========================================================
   INDIA vs WORLD
   One package list serves both sides of the site, so this is
   the single rule that decides which side a tour belongs to.
   Used by the India listing page and by the admin catalogue,
   which keeps the two from drifting apart.
========================================================= */

export const WORLD_KEYWORDS = [
  "thailand", "bangkok", "pattaya", "phuket", "krabi", "chiang mai",
  "nepal", "kathmandu", "pokhara",
  "sri lanka", "colombo", "kandy", "nuwara eliya",
  "switzerland", "zurich", "interlaken", "zermatt", "lucerne",
  "italy", "milan", "venice", "rome",
  "paris", "france",
  "dubai", "abu dhabi",
  "singapore", "kuala lumpur", "genting",
  "vietnam", "hanoi", "halong bay", "ho chi minh", "danang",
  "cambodia", "siem reap", "phnom penh",
  "japan", "tokyo", "kyoto", "osaka", "hakone",
  "korea", "seoul",
  "australia", "sydney", "melbourne", "gold coast", "cairns",
  "new zealand", "auckland", "rotorua", "queenstown",
  "europe", "vienna", "budapest", "prague", "austria", "germany",
  "greece", "athens", "santorini", "mykonos",
  "scandinavia", "copenhagen", "oslo", "stockholm",
  "amsterdam", "brussels", "cologne", "netherlands",
  "london",
  "usa", "america", "new york", "washington", "las vegas", "los angeles",
  "philadelphia", "boston", "san francisco",
  "canada", "vancouver", "banff", "lake louise", "toronto", "niagara falls",
  "south africa", "cape town", "johannesburg", "kruger",
  "kenya", "nairobi", "maasai mara", "lake nakuru", "serengeti", "zanzibar",
  "egypt", "cairo", "luxor", "aswan",
  "china", "beijing", "xian", "xi'an", "shanghai", "suzhou", "chengdu", "guilin",
  "bali", "denpasar", "ubud", "nusa dua",
];

export function isIndiaPackage(pkg) {
  if (pkg.country) return false;
  if (pkg.state) return true;
  const haystack = `${pkg.title} ${pkg.location}`.toLowerCase();
  return !WORLD_KEYWORDS.some((keyword) => haystack.includes(keyword));
}
