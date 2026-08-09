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
    <section className="bg-[#F7F9FC] px-3 py-12 sm:px-6 lg:px-0">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-[26px] font-bold text-[#0F172A] sm:text-[30px]">
          Why book your flights with Honor Tour & Travels?
        </h2>

        {/* MOBILE: plain icon-left / text-right list */}
        <div className="mt-8 flex flex-col divide-y divide-[#E5E7EB] sm:hidden">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6F7F5] text-[#17BEBB]">
                <Icon size={18} />
              </div>

              <div>
                <h3 className="text-[14px] font-semibold text-[#0F172A]">{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#6B7280]">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* sm+: original card grid, unchanged */}
        <div className="mt-8 hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-[14px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#17BEBB] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F7F5] text-[#17BEBB] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0F4C81] group-hover:text-white">
                <Icon size={18} />
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
