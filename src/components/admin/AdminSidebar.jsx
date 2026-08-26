"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LayoutDashboard, Settings } from "lucide-react";

/* =========================================================
   ADMIN SIDEBAR
   Dashboard and Bookings stay at the top because they are
   the day-to-day screens. Everything that edits website
   content sits under Settings, one collapsible section per
   group, so the sidebar is a short list instead of thirty
   links. The section holding the open module expands on its
   own.
========================================================= */

export default function AdminSidebar({ groups }) {
  const pathname = usePathname();

  const isCurrent = (slug) => pathname === `/admin/${slug}` || pathname.startsWith(`/admin/${slug}/`);
  const currentGroup = groups.find((g) => g.modules.some((m) => isCurrent(m.slug)))?.group ?? null;

  const [openGroup, setOpenGroup] = useState(currentGroup);

  const bookings = groups.find((g) => g.group === "Bookings");
  const settingsGroups = groups.filter((g) => g.group !== "Bookings");

  const linkClass = (active) =>
    `flex items-center gap-2 rounded-[8px] px-3 py-2 text-[13px] transition ${
      active ? "bg-white text-[#0B3B63] font-semibold" : "text-white/85 hover:bg-white/10"
    }`;

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      <Link href="/admin" className={`${linkClass(pathname === "/admin")} mb-1 font-semibold`}>
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>

      {bookings?.modules.map((m) => (
        <Link key={m.slug} href={`/admin/${m.slug}`} className={linkClass(isCurrent(m.slug))}>
          {m.label}
        </Link>
      ))}

      <div className="mt-5 flex items-center gap-2 px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-white/40">
        <Settings className="h-3.5 w-3.5" />
        Website Settings
      </div>

      {settingsGroups.map(({ group, modules }) => {
        const isOpen = openGroup === group;
        const hasCurrent = modules.some((m) => isCurrent(m.slug));

        return (
          <div key={group} className="mt-0.5">
            <button
              type="button"
              onClick={() => setOpenGroup(isOpen ? null : group)}
              className={`flex w-full items-center justify-between rounded-[8px] px-3 py-2 text-[13px] transition ${
                hasCurrent ? "text-white font-semibold" : "text-white/85"
              } hover:bg-white/10`}
            >
              <span className="flex items-center gap-2">
                {group}
                <span className="rounded-full bg-white/10 px-1.5 text-[10px] font-semibold text-white/60">
                  {modules.length}
                </span>
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="mb-1 ml-3 flex flex-col gap-0.5 border-l border-white/10 pl-2">
                {modules.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/admin/${m.slug}`}
                    className={`rounded-[8px] px-3 py-1.5 text-[13px] transition ${
                      isCurrent(m.slug)
                        ? "bg-white text-[#0B3B63] font-semibold"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {m.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
