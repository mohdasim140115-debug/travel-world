import { Wallet, BadgeCheck, ShieldCheck, Layers } from "lucide-react";

const benefits = [
  {
    icon: Wallet,
    title: "Affordable Convenience",
    description: "Compare fares across airlines and pick options that fit your travel budget.",
  },
  {
    icon: BadgeCheck,
    title: "Expert Airline Ticket Booking",
    description: "Our travel experts help you choose the right flight, airline and timing.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Airline Ticket Booking",
    description: "Every booking request is handled securely from search through confirmation.",
  },
  {
    icon: Layers,
    title: "One Platform for Flight Booking and Holidays",
    description: "Book flights and holiday packages together for a seamless travel experience.",
  },
];

export default function FlightBenefits() {
  return (
    <section className="bg-[#F7F9FC] px-4 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-[26px] font-bold text-[#183B3D] sm:text-[30px]">
          Why book your flights with Travel World?
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-[8px] border border-[#D8E7E5] bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#20B8B5] hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2F5F2] text-[#007F86] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#008C95] group-hover:text-white">
                <Icon size={18} />
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
