import Link from "next/link";
import { MapPin, Plane, Globe2, Sparkles } from "lucide-react";

const quickLinks = [
  { label: "Flights", href: "/flights", icon: Plane, badge: "New", bg: "#E6F7F5", color: "#17BEBB" },
  { label: "India Tours", href: "/india", icon: MapPin, bg: "#FFEACB", color: "#F5871F" },
  { label: "World Tours", href: "/world", icon: Globe2, bg: "#E0F2FE", color: "#0F4C81" },
  { label: "Speciality Tours", href: "/womens-special", icon: Sparkles, bg: "#F3E8FF", color: "#7C3AED" },
];

export default function QuickLinksBar() {
  return (
    <section className="w-full lg:hidden">
      <div className="grid grid-cols-4 gap-2 py-3">
        {quickLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.label}
              href={link.href}
              className="relative flex flex-col items-center gap-1.5 text-center no-underline"
            >
              {link.badge ? (
                <span className="absolute -top-1 right-1 rounded-full bg-[#D62839] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  {link.badge}
                </span>
              ) : null}

              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: link.bg, color: link.color }}
              >
                <Icon className="h-6 w-6" />
              </div>

              <span className="text-[12px] font-semibold leading-tight text-[#0F172A]">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
