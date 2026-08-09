"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function JsonListField({ name, initialItems }) {
  const [items, setItems] = useState(initialItems?.length ? initialItems : [""]);

  const updateItem = (index, value) => {
    setItems((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const addItem = () => setItems((prev) => [...prev, ""]);

  const cleaned = items.map((item) => item.trim()).filter(Boolean);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(event) => updateItem(index, event.target.value)}
            className="w-full rounded-[6px] border border-[#D1D5DB] px-3 py-1.5 text-[13px] outline-none focus:border-[#17BEBB]"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#94A3B8] hover:bg-red-50 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="flex w-fit items-center gap-1 rounded-[6px] border border-dashed border-[#94A3B8] px-3 py-1 text-[12px] font-semibold text-[#475569] hover:border-[#17BEBB] hover:text-[#0F4C81]"
      >
        <Plus className="h-3.5 w-3.5" />
        Add item
      </button>

      <input type="hidden" name={name} value={JSON.stringify(cleaned)} />
    </div>
  );
}
