import {
  Wifi,
  Waves,
  UtensilsCrossed,
  Car,
  Sparkles,
  Mountain,
  Trees,
  ConciergeBell,
  Bath,
  Sofa,
  Coffee,
  Building2,
} from "lucide-react";

const KEYWORD_ICONS = [
  { keywords: ["wifi"], icon: Wifi },
  { keywords: ["pool"], icon: Waves },
  { keywords: ["restaurant", "breakfast"], icon: UtensilsCrossed },
  { keywords: ["parking"], icon: Car },
  { keywords: ["spa"], icon: Sparkles },
  { keywords: ["mountain", "valley"], icon: Mountain },
  { keywords: ["garden", "nature", "bonfire"], icon: Trees },
  { keywords: ["room service"], icon: ConciergeBell },
  { keywords: ["bathtub"], icon: Bath },
  { keywords: ["living area"], icon: Sofa },
  { keywords: ["bar"], icon: Coffee },
];

export function getAmenityIcon(label) {
  const lower = label.toLowerCase();
  const match = KEYWORD_ICONS.find((entry) => entry.keywords.some((word) => lower.includes(word)));
  return match?.icon || Building2;
}
