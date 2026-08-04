import { PenTool } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      <div className="flex flex-col gap-0.5 rounded-full border border-[#008C95] bg-white px-3 py-1.5 text-center">
        <div className="text-[10px] font-bold text-[#008C95]">Book Online</div>
        <div className="text-[8px] text-[#667A7B]">365 days, 24*7</div>
      </div>
      <button className="flex items-center gap-2 rounded-full bg-[#FF7A3D] shadow-sm shadow-orange-900/20 transition-all duration-200 hover:bg-[#EA642C] hover:shadow-md hover:-translate-y-0.5 px-4 py-2.5 text-[12px] font-bold text-white">
        <PenTool className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Quick Enquiry</span>
      </button>
    </div>
  );
}
