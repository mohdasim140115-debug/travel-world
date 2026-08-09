import { getAmenityIcon } from "./amenityIcons";

export default function HotelAmenities({ amenities }) {
  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 sm:p-6">
      <h2 className="text-[19px] font-bold text-[#0F172A] sm:text-[22px]">Hotel Amenities</h2>
      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
        {amenities.map((amenity) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <div key={amenity} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6F7F5]">
                <Icon size={18} className="text-[#0F4C81]" />
              </div>
              <p className="text-[14px] font-medium text-[#374151]">{amenity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
