import { Bed, Utensils, Bus, Users, Map, Plane } from "lucide-react";
import { homeData } from "@/data/homeData";

const iconMap = {
  Bed,
  Utensils,
  Bus,
  Users,
  Map,
  Plane,
};

export default function TourInclusions() {
  const { tourInclusions } = homeData;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="text-center">
          <h2 className="text-[28px] font-bold text-[#183B3D] sm:text-[32px]">
            All inclusive tours, Chalo Bag Bharo Nikal Pado!
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-[#008C95] mx-auto" />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tourInclusions.features.map((feature) => {
            const Icon = iconMap[feature.icon] || Users;
            return (
              <div key={feature.title} className="text-center">
                <div className="flex justify-center">
                  <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#F0F4F8]">
                    <Icon className="h-8 w-8 text-[#008C95]" />
                  </div>
                </div>
                <h3 className="mt-4 text-[15px] font-bold text-[#183B3D]">{feature.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.5] text-[#60646C]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
