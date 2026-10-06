"use client";

import { useState } from "react";

import { Cell, cellValue } from "./RowListField";

/* =========================================================
   OBJECT FIELD
   For a stored object with a fixed set of keys — "need to
   know", "tour details" — so the admin fills labelled boxes
   instead of typing braces and quotes.
========================================================= */

export default function ObjectField({ name, columns, initialValue }) {
  const [value, setValue] = useState(() => ({ ...(initialValue ?? {}) }));

  const setKey = (key, next) => setValue((prev) => ({ ...prev, [key]: next }));

  const stored = {};
  for (const column of columns) {
    const cleaned = cellValue(column, value[column.name]);
    if (cleaned !== undefined) stored[column.name] = cleaned;
  }

  return (
    <div className="rounded-[8px] border border-[#E5E7EB] bg-[#F9FAFB] p-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {columns.map((column) => {
          const wide = column.full || ["textarea", "list", "records"].includes(column.type);

          return (
            <label key={column.name} className={wide ? "sm:col-span-2" : ""}>
              <span className="mb-1 block text-[11.5px] font-medium text-[#475569]">
                {column.label}
              </span>
              <Cell
                column={column}
                value={value[column.name]}
                onChange={(next) => setKey(column.name, next)}
              />
            </label>
          );
        })}
      </div>

      <input
        type="hidden"
        name={name}
        value={Object.keys(stored).length ? JSON.stringify(stored) : ""}
      />
    </div>
  );
}
