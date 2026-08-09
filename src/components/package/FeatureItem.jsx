/* Small icon + label + value item, used in the package summary strip. */
export default function FeatureItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6F7F5]">
        <Icon size={16} className="text-[#0F4C81]" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-[#94A3B8]">{label}</p>
        <p className="truncate text-[13px] font-semibold text-[#0F172A]">{value}</p>
      </div>
    </div>
  );
}
