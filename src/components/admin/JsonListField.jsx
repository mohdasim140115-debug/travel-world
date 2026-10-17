"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

const clean = (items) => items.map((item) => item.trim()).filter(Boolean);

/* A one-line box was fine for "Gulmarg" and useless for an SEO paragraph —
   the text just scrolled out of sight. This grows to fit whatever is in it,
   so a short item still looks like a single line and a long one is readable
   in full. Enter is ignored: these are list items, not prose blocks. */
function GrowingInput({ value, placeholder, onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") event.preventDefault();
      }}
      className="w-full resize-none overflow-hidden rounded-[6px] border border-[#D1D5DB] px-3 py-1.5 text-[13px] leading-[1.55] outline-none focus:border-[#17BEBB]"
    />
  );
}

export default function JsonListField({ name, initialItems, placeholder, onItemsChange }) {
  const [items, setItems] = useState(initialItems?.length ? initialItems : [""]);

  // One setter for every edit, so the form above can mirror the list live
  // (the SEO preview shows keywords as they are typed).
  const apply = (next) => {
    setItems(next);
    onItemsChange?.(clean(next));
  };

  const updateItem = (index, value) => apply(items.map((item, i) => (i === index ? value : item)));
  const removeItem = (index) => apply(items.filter((_, i) => i !== index));
  const addItem = () => apply([...items, ""]);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <GrowingInput
            value={item}
            placeholder={placeholder}
            onChange={(value) => updateItem(index, value)}
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#94A3B8] hover:bg-red-50 hover:text-red-500"
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

      <input type="hidden" name={name} value={JSON.stringify(clean(items))} />
    </div>
  );
}
