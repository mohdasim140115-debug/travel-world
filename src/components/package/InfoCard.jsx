/* Small icon + heading + body card, reused for Need to Know / Upgrades style sections. */
export default function InfoCard({ icon: Icon, title, children, action }) {
  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-6">
      {Icon ? (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F7F5]">
          <Icon size={18} className="text-[#0F4C81]" />
        </div>
      ) : null}

      <h3 className={`${Icon ? "mt-3" : ""} text-[15px] font-semibold text-[#0F172A] sm:text-[16px]`}>
        {title}
      </h3>

      <div className="mt-2 text-[13px] leading-[1.6] text-[#64748B] sm:text-[14px]">{children}</div>

      {action}
    </div>
  );
}
