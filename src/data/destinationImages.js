/* =========================================================
   DESTINATION IMAGE MATCHER
   Real Unsplash photos live in /public. Since we have no
   per-package photography, this scans a tour's title/location
   text for a destination keyword and returns a matching real
   photo. Order matters — more specific keywords are checked
   first so "Leh Ladakh" doesn't accidentally match "India".
   A neutral travel photo is used as the last-resort fallback
   so every card still gets a real photo instead of a plain
   gradient, without mislabeling an unmatched destination.
========================================================= */

const KEYWORD_IMAGES = [
  // India — hill / mountain regions
  { keywords: ["ladakh", "leh"], image: "/uploads/destinations/darshan-chudasama-s5x1zFAuAbs-unsplash.jpg" },
  { keywords: ["kashmir", "srinagar", "gulmarg", "pahalgam", "sonmarg", "dal lake"], image: "/uploads/destinations/anuj-yadav-1KehhzFg_Q0-unsplash.jpg" },
  { keywords: ["himachal", "shimla", "manali", "dharamshala", "dalhousie"], image: "/uploads/destinations/praneet-kumar-H8dcf-v98mA-unsplash.jpg" },
  { keywords: ["sikkim", "darjeeling", "gangtok"], image: "/uploads/destinations/madhushree-narayan-6a3qRnmM5es-unsplash.jpg" },

  // India — Rajasthan
  { keywords: ["rajasthan", "jaipur", "udaipur", "jaisalmer", "jodhpur", "mandawa", "pushkar"], image: "/uploads/destinations/aditya-siva-6rDbvXzIVpQ-unsplash.jpg" },

  // India — Kerala / South
  { keywords: ["kerala", "munnar", "alleppey", "kochi", "cochin", "backwater"], image: "/uploads/destinations/abhishek-prasad-N3VzleBhOvk-unsplash.jpg" },
  { keywords: ["coorg", "mysore", "karnataka"], image: "/uploads/destinations/gaurav-kumar-lJgUTYYrCy4-unsplash.jpg" },
  { keywords: ["tamil nadu"], image: "/uploads/destinations/sreehari-devadas-Jf6swM8lR-I-unsplash.jpg" },

  // India — Goa / West
  { keywords: ["goa"], image: "/uploads/destinations/sarang-pande-IijeyJbmrec-unsplash.jpg" },
  { keywords: ["gujarat", "rann of kutch"], image: "/uploads/destinations/gaurav-sharma-lj3r0SZK7rQ-unsplash.jpg" },
  { keywords: ["maharashtra"], image: "/uploads/destinations/mithil-doshi-pQZBbuPgyW8-unsplash.jpg" },

  // India — Andaman
  { keywords: ["andaman", "port blair", "havelock", "neil island"], image: "/uploads/destinations/dileesh-kumar-KbirwZJIq7g-unsplash.jpg" },

  // India — North / cities
  { keywords: ["delhi", "agra", "mathura", "vrindavan", "taj mahal"], image: "/uploads/destinations/junaid-ahmad-ansari-9WP-NVh2d6U-unsplash.jpg" },
  { keywords: ["amritsar", "punjab"], image: "/uploads/destinations/laurentiu-morariu-8XZTZIfuNrM-unsplash.jpg" },
  { keywords: ["ayodhya", "lucknow", "uttar pradesh", "varanasi"], image: "/uploads/destinations/junaid-ahmad-ansari-9WP-NVh2d6U-unsplash.jpg" },
  { keywords: ["kolkata"], image: "/uploads/destinations/martin-jernberg-nE2gf1scItI-unsplash.jpg" },
  { keywords: ["mumbai"], image: "/uploads/destinations/previn-samuel-vr6nMSlyTJs-unsplash.jpg" },
  { keywords: ["nainital", "mussoorie", "corbett", "uttarakhand"], image: "/uploads/destinations/mohit-tomar-FM1eD_KtY7g-unsplash.jpg" },

  // World — Europe
  { keywords: ["switzerland", "zurich", "lucerne", "interlaken", "zermatt", "bern"], image: "/uploads/destinations/henrique-ferreira-6p-I-X-sPUY-unsplash.jpg" },
  { keywords: ["paris", "france"], image: "/uploads/destinations/anthony-delanoix-Q0-fOL2nqZc-unsplash.jpg" },
  { keywords: ["europe", "european"], image: "/uploads/destinations/alexander-kagan-t9Td0zfDTwI-unsplash.jpg" },

  // World — Thailand
  { keywords: ["thailand", "bangkok", "phuket", "krabi", "pattaya", "chiang mai", "phi phi"], image: "/uploads/destinations/aleksandra-b-00E3Q9-unMU-unsplash.jpg" },

  // World — Singapore / Malaysia
  { keywords: ["singapore"], image: "/uploads/destinations/jayjayli-WhXZIQEYfF4-unsplash.jpg" },
  { keywords: ["malaysia", "kuala lumpur"], image: "/uploads/destinations/ck-yeo-5J6VUR6r9Wc-unsplash.jpg" },

  // World — Japan / East Asia
  { keywords: ["japan", "tokyo", "korea"], image: "/uploads/destinations/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg" },

  // World — USA / Americas
  { keywords: ["usa", "america", "new york", "manhattan"], image: "/uploads/destinations/mike-chavarri-kZokA2VTKn4-unsplash.jpg" },
  // World — South East Asia / Oceania / Africa
  { keywords: ["south east asia", "southeast asia"], image: "/uploads/destinations/evan-krause-BU6lABNbTpA-unsplash.jpg" },
  { keywords: ["australia", "new zealand", "oceania"], image: "/uploads/destinations/ricardo-gomez-angel-58uZCE8zrdk-unsplash.jpg" },
  { keywords: ["africa", "kenya", "mauritius", "zanzibar", "egypt"], image: "/uploads/destinations/alexey-turenkov-bWJiSZjIgTM-unsplash.jpg" },
  // India — departure cities that had no photo of their own
  { keywords: ["pune"], image: "/uploads/destinations/mithil-doshi-pQZBbuPgyW8-unsplash.jpg" },
  { keywords: ["ahmedabad"], image: "/uploads/destinations/gaurav-sharma-lj3r0SZK7rQ-unsplash.jpg" },
  { keywords: ["bangalore", "bengaluru"], image: "/uploads/destinations/hardik-joshi-niUei6OnuiA-unsplash.jpg" },
  { keywords: ["hyderabad"], image: "/uploads/destinations/andreas-brucker-g5Uh7nP60FA-unsplash.jpg" },
  { keywords: ["indore", "madhya pradesh"], image: "/uploads/destinations/shikhar-bhatnagar-wQJ1DfRB2io-unsplash.jpg" },
];

const FALLBACK_IMAGE = "/uploads/destinations/mark-olsen-K5j1KgecVC8-unsplash.jpg";

export function getDestinationImage(text) {
  if (!text) return FALLBACK_IMAGE;

  const lower = text.toLowerCase();

  for (const entry of KEYWORD_IMAGES) {
    if (entry.keywords.some((word) => lower.includes(word))) {
      return entry.image;
    }
  }

  return FALLBACK_IMAGE;
}

// Every package carries a single photo, so the gallery is padded with other
// photos from the same pool — deterministically, so a package always shows the
// same set — rather than repeating one image six times.
export function getDestinationImages(text, count = 6) {
  const first = getDestinationImage(text);
  const pool = KEYWORD_IMAGES.map((entry) => entry.image).filter(
    (image, index, all) => image !== first && all.indexOf(image) === index,
  );

  let seed = 0;
  for (const char of String(text || "")) seed = (seed * 31 + char.charCodeAt(0)) % 100000;

  const picked = [first];
  for (let i = 0; picked.length < count && i < pool.length; i += 1) {
    picked.push(pool[(seed + i * 7) % pool.length]);
  }
  return picked.filter((image, index, all) => all.indexOf(image) === index);
}
