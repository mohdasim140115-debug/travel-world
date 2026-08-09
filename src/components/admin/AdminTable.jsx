import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { deleteRecord } from "@/app/admin/actions";
import DeleteButton from "./DeleteButton";

function formatCell(value) {
  if (value === null || value === undefined) return "—";
  if (Array.isArray(value)) return value.join(", ") || "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export default function AdminTable({ moduleSlug, moduleConfig, rows }) {
  const columns = moduleConfig.listColumns;

  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
        <div>
          <h2 className="text-[18px] font-bold text-[#0F172A]">{moduleConfig.label}</h2>
          <p className="text-[12px] text-[#64748B]">{rows.length} records</p>
        </div>

        <Link
          href={`/admin/${moduleSlug}/new`}
          className="flex items-center gap-1.5 rounded-[8px] bg-[#FF7A1A] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#E56A0F]"
        >
          <Plus className="h-4 w-4" />
          Add new
        </Link>
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
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-8 text-center text-[13px] text-[#94A3B8]">
                  No records yet.
                </td>
              </tr>
            )}

            {rows.map((row) => (
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
