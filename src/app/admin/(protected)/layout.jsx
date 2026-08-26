import Link from "next/link";
import { LogOut, Plane } from "lucide-react";
import { adminModules, adminModuleGroups } from "@/lib/adminModules";
import { logoutAction } from "../login/actions";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Honor Tour & Travels — Admin",
  robots: { index: false, follow: false },
};

/** [{ group, modules: [{ slug, label }] }] in the order adminModuleGroups lists. */
function groupedModules() {
  const groups = new Map(adminModuleGroups.map((group) => [group, []]));

  for (const [slug, config] of Object.entries(adminModules)) {
    if (!groups.has(config.group)) groups.set(config.group, []);
    groups.get(config.group).push({ slug, label: config.label });
  }

  return [...groups]
    .filter(([, modules]) => modules.length > 0)
    .map(([group, modules]) => ({ group, modules }));
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

        <AdminSidebar groups={groups} />


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
