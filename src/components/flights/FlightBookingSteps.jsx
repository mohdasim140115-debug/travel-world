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
    <section className="px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-[26px] font-bold text-[#183B3D] sm:text-[30px]">
          How flight booking works on Travel World group tours
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="rounded-[8px] border border-[#E5E7EB] bg-white p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#006D77] text-[11px] font-bold text-white">
                  {index + 1}
                </div>
                <Icon size={16} className="text-[#183B3D]" />
              </div>

              <h3 className="mt-3 text-[13px] font-semibold text-[#183B3D]">{title}</h3>
              <p className="mt-1 text-[11px] leading-[1.6] text-[#6B7280]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
