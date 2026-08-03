import { PenTool } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      <div className="flex flex-col gap-1 rounded-full border border-[#2563EB] bg-white px-4 py-2 text-center">
        <div className="text-[11px] font-bold text-[#2563EB]">Book Online</div>
        <div className="text-[9px] text-[#60646C]">365 days, 24*7</div>
      </div>
      <button className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] shadow-sm shadow-blue-900/20 transition-all duration-200 hover:from-[#1D4ED8] hover:to-[#1E40AF] hover:shadow-md hover:-translate-y-0.5 px-5 py-3 text-[13px] font-bold text-white shadow-lg hover:shadow-xl">
        <PenTool className="h-4 w-4" />
        <span className="hidden sm:inline">Quick Enquiry</span>
      </button>
    </div>
  );
}
