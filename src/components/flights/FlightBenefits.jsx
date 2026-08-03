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
        <h2 className="text-center text-[22px] font-bold text-[#0B1F3A] sm:text-[26px]">
          Why book your flights with Travel World?
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-[8px] border border-[#E5E7EB] bg-white p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DBEAFE] text-[#0B1F3A]">
                <Icon size={18} />
              </div>

              <h3 className="mt-3 text-[13px] font-semibold text-[#0B1F3A]">{title}</h3>
              <p className="mt-1 text-[11px] leading-[1.6] text-[#6B7280]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
