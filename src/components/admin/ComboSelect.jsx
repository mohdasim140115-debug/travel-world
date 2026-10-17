"use client";

import { useState } from "react";
import { ListChecks, Plus } from "lucide-react";

/* =========================================================
   COMBO SELECT
   A dropdown you can also type into.

   Two problems it solves. A value already in the database but
   no longer in the list — "South East Asia" on 39 packages,
   left over from when categories doubled as regions — used to
   render as an empty box, so opening a package and saving it
   quietly wiped the category. And there was no way to add a
   category of your own without editing code.

   Whatever is typed is saved as-is, and the edit page feeds
   back every value already in use, so a new one appears in
   the list for every other record from then on.
========================================================= */

export default function ComboSelect({ name, options = [], initialValue, required, onChange }) {
  const current = initialValue ?? "";

  // The stored value always belongs in the list, even when the config has
  // since dropped it.
  const choices = [...new Set([current, ...options].filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );

  const [value, setValue] = useState(current);
  const [typing, setTyping] = useState(false);

  const update = (next) => {
    setValue(next);
    onChange?.({ target: { name, value: next } });
  };

  const field =
    "w-full rounded-[6px] border border-[#D1D5DB] px-3 py-2 text-[13px] outline-none focus:border-[#17BEBB]";

  if (typing) {
    return (
      <div className="flex flex-col gap-1.5">
        <input
          type="text"
          name={name}
          value={value}
          required={required}
          autoFocus
          placeholder="Type a new one"
          onChange={(event) => update(event.target.value)}
          className={field}
        />
        <button
          type="button"
          onClick={() => {
            setTyping(false);
            update(current);
          }}
          className="flex w-fit items-center gap-1.5 text-[11.5px] font-semibold text-[#0F4C81] hover:underline"
        >
          <ListChecks className="h-3.5 w-3.5" />
          Choose from the list instead
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <select
        name={name}
        value={value}
        required={required}
        onChange={(event) => update(event.target.value)}
        className={field}
      >
        <option value="" disabled>
          Select...
        </option>
        {choices.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => {
          setTyping(true);
          update("");
        }}
        className="flex w-fit items-center gap-1.5 text-[11.5px] font-semibold text-[#0F4C81] hover:underline"
      >
        <Plus className="h-3.5 w-3.5" />
        Add a new one
      </button>
    </div>
  );
}
