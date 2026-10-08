"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Search, X } from "lucide-react";
import { deleteRecord } from "@/app/admin/actions";
import DeleteButton from "./DeleteButton";

function formatCell(value) {
  if (value === null || value === undefined) return "—";
  if (Array.isArray(value)) return value.join(", ") || "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

/** Everything a row shows, flattened once so filtering stays cheap. */
function haystack(row, columns) {
  return columns
    .map((col) => formatCell(row[col]))
    .join(" ")
    .toLowerCase();
}

export default function AdminTable({ moduleSlug, moduleConfig, rows }) {
  const columns = moduleConfig.listColumns;
  const [query, setQuery] = useState("");

  const indexed = useMemo(
    () => rows.map((row) => ({ row, text: haystack(row, columns) })),
    [rows, columns],
  );

  // Space-separated words must all appear, so "kashmir india" narrows down
  // rather than widening out.
  const visible = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return rows;
    return indexed.filter(({ text }) => words.every((word) => text.includes(word))).map((item) => item.row);
  }, [indexed, query, rows]);

  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] px-5 py-4">
        <div>
          <h2 className="text-[18px] font-bold text-[#0F172A]">{moduleConfig.label}</h2>
          <p className="text-[12px] text-[#64748B]">
            {query.trim() ? `${visible.length} of ${rows.length} records` : `${rows.length} records`}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${moduleConfig.label.toLowerCase()}…`}
              aria-label={`Search ${moduleConfig.label}`}
              className="w-[200px] rounded-[8px] border border-[#D1D5DB] py-2 pl-9 pr-8 text-[13px] outline-none transition focus:border-[#17BEBB] sm:w-[260px]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <Link
            href={`/admin/${moduleSlug}/new`}
            className="flex shrink-0 items-center gap-1.5 rounded-[8px] bg-[#FF7A1A] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#E56A0F]"
          >
            <Plus className="h-4 w-4" />
            Add new
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F7FAFC] text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
              {columns.map((col) => (
                <th key={col} className="px-5 py-3">
                  {col}
                </th>
              ))}
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-8 text-center text-[13px] text-[#94A3B8]">
                  {rows.length === 0 ? "No records yet." : `Nothing matches “${query}”.`}
                </td>
              </tr>
            )}

            {visible.map((row) => (
              <tr key={row.id} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F7FAFC]">
                {columns.map((col) => (
                  <td key={col} className="max-w-[260px] truncate px-5 py-3 text-[#334155]">
                    {formatCell(row[col])}
                  </td>
                ))}
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/${moduleSlug}/${row.id}/edit`}
                      className="flex items-center gap-1 text-[12px] font-semibold text-[#0F4C81] hover:underline"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                    <DeleteButton action={deleteRecord.bind(null, moduleSlug, row.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
