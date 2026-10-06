"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";

/* =========================================================
   ROW LIST FIELD
   Lists like an itinerary or a departure table used to be
   edited as raw JSON, which meant a stray comma could break
   a page. This renders one labelled box per entry instead
   and writes the JSON back in a hidden input, so the server
   action and the stored shape are unchanged.

   Columns come from the module config:
     columns: [{ name, label, type, placeholder, options }]
   where type is text | textarea | number | select | list |
   records (one record per line, fields separated by "|").
========================================================= */

const INPUT =
  "w-full rounded-[6px] border border-[#D1D5DB] px-2.5 py-1.5 text-[13px] outline-none focus:border-[#17BEBB]";

/** [{ name: "Paris", count: "8 tours" }] <-> "Paris | 8 tours" lines */
function recordsToText(value, keys) {
  if (!Array.isArray(value)) return typeof value === "string" ? value : "";
  return value
    .map((item) =>
      keys
        .map((key) => item?.[key] ?? "")
        .join(" | ")
        .replace(/(\s*\|\s*)+$/, ""),
    )
    .join("\n");
}

function textToRecords(value, keys) {
  if (Array.isArray(value)) return value;
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      const record = {};
      keys.forEach((key, index) => {
        if (parts[index]) record[key] = parts[index];
      });
      return record;
    })
    .filter((record) => Object.keys(record).length > 0);
}

/** One labelled input. Shared with the object editor. */
export function Cell({ column, value, onChange }) {
  if (column.type === "textarea") {
    return (
      <textarea
        rows={column.rows ?? 3}
        value={value ?? ""}
        placeholder={column.placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={INPUT}
      />
    );
  }

  if (column.type === "list") {
    return (
      <textarea
        rows={column.rows ?? 2}
        value={Array.isArray(value) ? value.join("\n") : (value ?? "")}
        placeholder={column.placeholder || "One per line"}
        onChange={(event) => onChange(event.target.value)}
        className={INPUT}
      />
    );
  }

  if (column.type === "records") {
    return (
      <textarea
        rows={column.rows ?? 3}
        value={recordsToText(value, column.keys)}
        placeholder={column.placeholder || `${column.keys.join(" | ")} — one per line`}
        onChange={(event) => onChange(event.target.value)}
        className={INPUT}
      />
    );
  }

  if (column.type === "select") {
    return (
      <select value={value ?? ""} onChange={(event) => onChange(event.target.value)} className={INPUT}>
        <option value="">Select…</option>
        {(column.options ?? []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={column.type === "number" ? "number" : "text"}
      value={value ?? ""}
      placeholder={column.placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={INPUT}
    />
  );
}

/** An editor value -> the shape that gets stored; undefined means "leave it out". */
export function cellValue(column, value) {
  if (column.type === "list") {
    const items = (Array.isArray(value) ? value.join("\n") : String(value ?? ""))
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
    return items.length ? items : undefined;
  }

  if (column.type === "records") {
    const records = textToRecords(value, column.keys);
    return records.length ? records : undefined;
  }

  if (value === "" || value === null || value === undefined) return undefined;
  return column.type === "number" ? Number(value) : value;
}

export function blankRow(columns) {
  const row = {};
  for (const column of columns) {
    row[column.name] = column.type === "list" || column.type === "records" ? [] : "";
  }
  return row;
}

function clean(rows, columns) {
  return rows
    .map((row) => {
      const out = {};
      for (const column of columns) {
        const value = cellValue(column, row[column.name]);
        if (value !== undefined) out[column.name] = value;
      }
      return out;
    })
    .filter((row) => Object.keys(row).length > 0);
}

export default function RowListField({ name, columns, initialRows, addLabel = "Add row" }) {
  const [rows, setRows] = useState(() =>
    Array.isArray(initialRows) && initialRows.length ? initialRows : [blankRow(columns)],
  );

  const setCell = (index, key, value) =>
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));

  const addRow = () => setRows((prev) => [...prev, blankRow(columns)]);
  const removeRow = (index) => setRows((prev) => prev.filter((_, i) => i !== index));

  const move = (index, by) =>
    setRows((prev) => {
      const next = [...prev];
      const target = index + by;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((row, index) => (
        <div key={index} className="rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#94A3B8]">
              {index + 1}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
                className="flex h-6 w-6 items-center justify-center rounded text-[#94A3B8] hover:bg-white hover:text-[#0F4C81] disabled:opacity-30"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === rows.length - 1}
                aria-label="Move down"
                className="flex h-6 w-6 items-center justify-center rounded text-[#94A3B8] hover:bg-white hover:text-[#0F4C81] disabled:opacity-30"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => removeRow(index)}
                aria-label="Remove"
                className="flex h-6 w-6 items-center justify-center rounded text-[#94A3B8] hover:bg-red-50 hover:text-red-500"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {columns.map((column) => {
              const wide =
                column.full || ["textarea", "list", "records"].includes(column.type);

              return (
                <label key={column.name} className={wide ? "sm:col-span-2" : ""}>
                  <span className="mb-1 block text-[11.5px] font-medium text-[#475569]">
                    {column.label}
                  </span>
                  <Cell
                    column={column}
                    value={row[column.name]}
                    onChange={(value) => setCell(index, column.name, value)}
                  />
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="flex w-fit items-center gap-1 rounded-[6px] border border-dashed border-[#94A3B8] px-3 py-1.5 text-[12px] font-semibold text-[#475569] hover:border-[#17BEBB] hover:text-[#0F4C81]"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>

      <input type="hidden" name={name} value={JSON.stringify(clean(rows, columns))} />
    </div>
  );
}
