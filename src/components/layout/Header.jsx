import { ChevronDown, LogIn, Mic, Phone, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-slate-700/70 bg-[#071426] text-white">
      <div className="mx-auto flex h-[76px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-0">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white">
            ✦
          </div>
          <div className="text-[18px] font-semibold tracking-[0.2em] text-white sm:text-[20px]">
            TRAVEL WORLD
          </div>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex w-[570px] items-center rounded-full border border-slate-300/30 bg-white px-4 py-2 shadow-sm">
            <Search className="mr-3 h-4 w-4 text-slate-500" />
            <input
              aria-label="Search tours"
              className="w-full border-0 bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
              placeholder='Search "Rann of Kutch"'
            />
            <button className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#071426] text-white">
              <Mic className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-slate-400/40 bg-slate-800/50 px-3 py-2 sm:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB] text-white">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Call us</div>
              <div className="text-[13px] font-semibold text-white">1800 313 5555</div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-300" />
          </div>

          <button className="hidden items-center gap-2 rounded-full border border-slate-400/40 bg-white/10 px-3 py-2 text-sm font-medium text-white sm:flex">
            <LogIn className="h-4 w-4" />
            Login
          </button>

          <button className="flex items-center gap-2 rounded-full border border-slate-400/40 bg-white px-3 py-2 text-sm font-medium text-[#0B1F3A]">
            <span className="text-base">🇮🇳</span>
            <span className="hidden sm:inline">India</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
