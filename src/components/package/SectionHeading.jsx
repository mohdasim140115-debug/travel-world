/* Consistent section heading used throughout the package detail page. */
export default function SectionHeading({ title, subtitle, id }) {
  return (
    <div id={id} className="scroll-mt-[110px]">
      <h2 className="text-[20px] font-bold text-[#0F172A] sm:text-[26px]">{title}</h2>
      {subtitle ? (
        <p className="mt-1.5 text-[13px] text-[#64748B] sm:text-[14px]">{subtitle}</p>
      ) : null}
    </div>
  );
}
