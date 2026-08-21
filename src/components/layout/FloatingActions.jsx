import { PenTool } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2 lg:bottom-6 lg:right-6">
      {/* Informational only — it would just crowd a phone screen, so it starts at sm. */}
      <div className="hidden flex-col gap-0.5 rounded-full border border-[#0F4C81] bg-white px-4 py-2 text-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] sm:flex">
        <div className="text-[12px] font-bold text-[#0F4C81]">Book Online</div>
        <div className="text-[12px] text-[#475569]">365 days, 24*7</div>
      </div>

      {/* A round icon button on phones, a labelled pill from sm up. */}
      <button
        type="button"
        aria-label="Quick Enquiry"
        className="flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-[#FF7A1A] text-[12px] font-bold text-white shadow-lg shadow-orange-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E56A0F] hover:shadow-xl sm:h-auto sm:w-auto sm:px-4 sm:py-2.5"
      >
        <PenTool className="h-5 w-5 sm:h-3.5 sm:w-3.5" />
        <span className="hidden sm:inline">Quick Enquiry</span>
      </button>
    </div>
  );
}
