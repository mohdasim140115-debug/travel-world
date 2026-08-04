import Link from "next/link";
import { Compass, MapPin, Plane, TentTree, Trees, Waves, MountainSnow, Landmark, ShipWheel, Sun, Sparkles } from "lucide-react";
import { homeData } from "@/data/homeData";
import { getDestinationHref } from "@/data/destinations";

const iconMap = {
  Compass,
  MapPin,
  Plane,
  TentTree,
  Trees,
  Waves,
  MountainSnow,
  Landmark,
  ShipWheel,
  Sun,
  Sparkles,
};

// Homepage copy for Kashmir differs slightly from the destination page name
const nameAliases = {
  "Jammu and Kashmir": "Jammu Kashmir",
};

export default function DestinationStrip() {
  return (
    <section className="mt-11 w-full">
      <div className="flex gap-4 overflow-x-auto px-1 pb-3 no-scrollbar">
        {homeData.destinations.map((destination) => {
          const Icon = iconMap[destination.icon] || Compass;
          const href = getDestinationHref(nameAliases[destination.name] || destination.name);

          const content = (
            <>
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#E2F5F2] text-[#007F86] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#008C95] group-hover:text-white">
                <Icon className="h-8 w-8" />
              </div>
              <div className="mt-3 max-w-[100px] text-[13px] font-semibold text-[#111827]">
                {destination.name}
              </div>
              <div className="mt-1 text-[12px] text-[#4B5563]">{destination.tourCount}</div>
            </>
          );

          if (href) {
            return (
              <Link
                key={destination.name}
                href={href}
                className="group flex min-w-[118px] cursor-pointer flex-col items-center text-center no-underline"
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={destination.name} className="flex min-w-[118px] flex-col items-center text-center">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
