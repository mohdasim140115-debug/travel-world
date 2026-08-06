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
  { keywords: ["ladakh", "leh"], image: "/darshan-chudasama-s5x1zFAuAbs-unsplash.jpg" },
  { keywords: ["kashmir", "srinagar", "gulmarg", "pahalgam", "sonmarg", "dal lake"], image: "/anuj-yadav-1KehhzFg_Q0-unsplash.jpg" },
  { keywords: ["himachal", "shimla", "manali", "dharamshala", "dalhousie"], image: "/praneet-kumar-H8dcf-v98mA-unsplash.jpg" },
  { keywords: ["sikkim", "darjeeling", "gangtok"], image: "/madhushree-narayan-6a3qRnmM5es-unsplash.jpg" },

  // India — Rajasthan
  { keywords: ["rajasthan", "jaipur", "udaipur", "jaisalmer", "jodhpur", "mandawa", "pushkar"], image: "/aditya-siva-6rDbvXzIVpQ-unsplash.jpg" },

  // India — Kerala / South
  { keywords: ["kerala", "munnar", "alleppey", "kochi", "cochin", "backwater"], image: "/abhishek-prasad-N3VzleBhOvk-unsplash.jpg" },
  { keywords: ["coorg", "mysore", "karnataka"], image: "/gaurav-kumar-lJgUTYYrCy4-unsplash.jpg" },
  { keywords: ["tamil nadu"], image: "/sreehari-devadas-Jf6swM8lR-I-unsplash.jpg" },

  // India — Goa / West
  { keywords: ["goa"], image: "/sarang-pande-IijeyJbmrec-unsplash.jpg" },
  { keywords: ["gujarat", "rann of kutch"], image: "/gaurav-sharma-lj3r0SZK7rQ-unsplash.jpg" },
  { keywords: ["maharashtra"], image: "/mithil-doshi-pQZBbuPgyW8-unsplash.jpg" },

  // India — Andaman
  { keywords: ["andaman", "port blair", "havelock", "neil island"], image: "/dileesh-kumar-KbirwZJIq7g-unsplash.jpg" },

  // India — North / cities
  { keywords: ["delhi", "agra", "mathura", "vrindavan", "taj mahal"], image: "/junaid-ahmad-ansari-9WP-NVh2d6U-unsplash.jpg" },
  { keywords: ["amritsar", "punjab"], image: "/laurentiu-morariu-8XZTZIfuNrM-unsplash.jpg" },
  { keywords: ["ayodhya", "lucknow", "uttar pradesh", "varanasi"], image: "/junaid-ahmad-ansari-9WP-NVh2d6U-unsplash.jpg" },
  { keywords: ["kolkata"], image: "/martin-jernberg-nE2gf1scItI-unsplash.jpg" },
  { keywords: ["mumbai"], image: "/previn-samuel-vr6nMSlyTJs-unsplash.jpg" },
  { keywords: ["nainital", "mussoorie", "corbett", "uttarakhand"], image: "/mohit-tomar-FM1eD_KtY7g-unsplash.jpg" },

  // World — Europe
  { keywords: ["switzerland", "zurich", "lucerne", "interlaken", "zermatt", "bern"], image: "/henrique-ferreira-6p-I-X-sPUY-unsplash.jpg" },
  { keywords: ["paris", "france"], image: "/anthony-delanoix-Q0-fOL2nqZc-unsplash.jpg" },
  { keywords: ["europe", "european"], image: "/alexander-kagan-t9Td0zfDTwI-unsplash.jpg" },

  // World — Thailand
  { keywords: ["thailand", "bangkok", "phuket", "krabi", "pattaya", "chiang mai", "phi phi"], image: "/aleksandra-b-00E3Q9-unMU-unsplash.jpg" },

  // World — Singapore / Malaysia
  { keywords: ["singapore"], image: "/jayjayli-WhXZIQEYfF4-unsplash.jpg" },
  { keywords: ["malaysia", "kuala lumpur"], image: "/ck-yeo-5J6VUR6r9Wc-unsplash.jpg" },

  // World — Japan / East Asia
  { keywords: ["japan", "tokyo", "korea"], image: "/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg" },

  // World — USA / Americas
  { keywords: ["usa", "america", "new york", "manhattan"], image: "/mike-chavarri-kZokA2VTKn4-unsplash.jpg" },
];

const FALLBACK_IMAGE = "/mark-olsen-K5j1KgecVC8-unsplash.jpg";

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
