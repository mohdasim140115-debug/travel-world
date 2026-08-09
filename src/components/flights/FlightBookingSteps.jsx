import { Plane, MapPin, Users, CircleCheck } from "lucide-react";

const steps = [
  {
    icon: Plane,
    title: "Group Tours with Flights",
    description: "Many of our group tours include return airfare as part of the package price.",
  },
  {
    icon: MapPin,
    title: "Choosing your departure city",
    description: "Select the departure city that works best for you from our list of tours.",
  },
  {
    icon: Users,
    title: "Customized Holidays & Joining/Leaving",
    description: "Prefer flexibility? Book your own flights and join the group at the destination.",
  },
  {
    icon: CircleCheck,
    title: "How these flight bookings work",
    description: "Our team shares flight details, timings and assistance once your tour is booked.",
  },
];

export default function FlightBookingSteps() {
  return (
    <section className="px-3 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-[26px] font-bold text-[#0F172A] sm:text-[30px]">
          How flight booking works on Honor Tour & Travels group tours
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="rounded-[14px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B3B63] text-[12px] font-bold text-white">
                  {index + 1}
                </div>
                <Icon size={16} className="text-[#0F172A]" />
              </div>

              <h3 className="mt-3 text-[14px] font-semibold text-[#0F172A]">{title}</h3>
              <p className="mt-1 text-[13px] leading-[1.6] text-[#6B7280]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
