import Link from "next/link";
import { LayoutDashboard, LogOut, Plane } from "lucide-react";
import { adminModules, adminModuleGroups } from "@/lib/adminModules";
import { logoutAction } from "../login/actions";

export const metadata = {
  title: "Honor Tour & Travels — Admin",
  robots: { index: false, follow: false },
};

function groupedModules() {
  const groups = {};
  for (const group of adminModuleGroups) groups[group] = [];
  for (const [slug, config] of Object.entries(adminModules)) {
    groups[config.group] = groups[config.group] || [];
    groups[config.group].push({ slug, ...config });
  }
  return groups;
}

export default function AdminLayout({ children }) {
  const groups = groupedModules();

  return (
    <div className="flex min-h-screen bg-[#F7FAFC]">
      <aside className="flex w-[240px] shrink-0 flex-col bg-[#0B3B63] text-white">
        <Link href="/admin" className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF7A1A]">
            <Plane className="h-4 w-4 text-white" />
          </div>
          <span className="text-[15px] font-bold">Honor Tour & Travels Admin</span>
        </Link>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <Link
            href="/admin"
            className="mb-3 flex items-center gap-2 rounded-[8px] px-3 py-2 text-[13px] font-semibold text-white/90 hover:bg-white/10"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          {Object.entries(groups).map(([group, modules]) => (
            <div key={group} className="mb-4">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wide text-white/40">{group}</p>
              <div className="mt-1 flex flex-col gap-0.5">
                {modules.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/admin/${m.slug}`}
                    className="rounded-[8px] px-3 py-1.5 text-[13px] text-white/85 hover:bg-white/10"
                  >
                    {m.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <form action={logoutAction} className="border-t border-white/10 p-3">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-[13px] font-semibold text-white/80 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </form>
      </aside>

      <main className="flex-1 overflow-x-hidden px-8 py-8">{children}</main>
    </div>
  );
}
