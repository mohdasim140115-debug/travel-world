import { ChevronDown } from "lucide-react";

export default function SeoContent() {
  return (
    <section className="px-3 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-[28px] font-bold text-[#0F172A] sm:text-[32px]">
          Find the best travel packages at Travel World
        </h2>

        <div className="mt-6 space-y-4 text-[13px] leading-[1.8] text-[#4B5563]">
          <p>
            Discover premium India tour packages and international tour packages that cater to every traveler's needs. Whether you're looking for family tour packages, honeymoon packages, or group tours, Travel World offers carefully curated itineraries that ensure unforgettable memories. Our travel packages from India span across stunning destinations including Europe tours, Kashmir tours, Kerala tours, and Rajasthan tours, all designed with your comfort and convenience in mind.
          </p>
          <p>
            With years of experience in the travel industry, we specialize in customized holidays that match your preferences and budget. From Asia's tropical escapes to Europe's historic landmarks, our international tour packages provide seamless experiences with expert tour managers, comfortable accommodations, and inclusive amenities. Choose from our extensive portfolio of tour packages that combine adventure, culture, relaxation, and authentic experiences.
          </p>
          <p>
            At Travel World, we believe every traveler deserves a journey tailored to their dreams. Our commitment to excellence, competitive pricing, and personalized service has made us a trusted choice for thousands of families and groups planning their next adventure. Explore our complete range of tour packages and start your journey with us today.
          </p>
        </div>

        <button className="mt-6 flex items-center gap-2 text-[13px] font-semibold text-[#0F4C81]">
          Read More
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
