"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ImageUp, Loader2, Trash2, TriangleAlert } from "lucide-react";

/* =========================================================
   GALLERY FIELD
   The extra photos a package shows beside its cover image.
   Several files can be picked at once; each one is uploaded,
   shrunk and added to the strip. Order is the order they are
   shown in, so the arrows matter.

   Each photo carries its own alt text and title, because an
   image with no alt is invisible to Google and to anyone
   using a screen reader.
========================================================= */

/** Older records stored plain URLs; both shapes are read here. */
const toPhoto = (item) =>
  typeof item === "string" ? { url: item, alt: "", title: "" } : { alt: "", title: "", ...item };

export default function GalleryField({ name, initialValue, max = 0, onChange }) {
  const [items, setItems] = useState(() => {
    const start = (Array.isArray(initialValue) ? initialValue : []).filter(Boolean).map(toPhoto);
    return max ? start.slice(0, max) : start;
  });

  const [busy, setBusy] = useState(0);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef(null);

  const apply = (next) => {
    setItems(next);
    onChange?.({ target: { name, value: next } });
  };

  const room = max ? Math.max(0, max - items.length) : Infinity;
  const full = room === 0;

  async function upload(fileList) {
    const picked = [...(fileList || [])];
    if (!picked.length) return;

    if (full) {
      setError(`You can add up to ${max} photos. Remove one first.`);
      return;
    }

    // Picking six files when two slots are left takes the first two and says so,
    // rather than silently dropping four.
    const files = picked.slice(0, room);
    setError(
      picked.length > files.length
        ? `Only ${files.length} of ${picked.length} photos added — the gallery holds ${max}.`
        : "",
    );
    setBusy(files.length);

    const added = [];

    for (const file of files) {
      try {
        const body = new FormData();
        body.append("file", file);

        const response = await fetch("/api/admin/upload", { method: "POST", body });
        const result = await response.json();

        if (!response.ok) throw new Error(result?.error || "Upload failed.");
        added.push({ url: result.url, alt: "", title: "" });
      } catch (uploadError) {
        setError(`${file.name}: ${uploadError.message}`);
      } finally {
        setBusy((count) => count - 1);
      }
    }

    // One state write for the whole batch, so the strip does not jump.
    if (added.length) apply([...items, ...added]);
    if (inputRef.current) inputRef.current.value = "";
  }

  const move = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;

    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    apply(next);
  };

  const setField = (index, key, value) =>
    apply(items.map((item, i) => (i === index ? { ...item, [key]: value } : item)));

  const iconButton =
    "flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#0F172A] transition hover:bg-white disabled:opacity-30";

  const textInput =
    "w-full rounded-[6px] border border-[#D1D5DB] px-2 py-1.5 text-[12px] outline-none focus:border-[#17BEBB]";

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <div key={`${item.url}-${index}`} className="flex flex-col gap-1.5">
            <div className="group relative h-[130px] overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-[#F9FAFB]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.alt || ""} className="h-full w-full object-cover" />

              <span className="absolute left-1.5 top-1.5 rounded-full bg-[#0F172A]/70 px-2 py-0.5 text-[10.5px] font-bold text-white">
                {index + 1}
              </span>

              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-[#0F172A]/80 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label="Move left"
                    className={iconButton}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    aria-label="Move right"
                    className={iconButton}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </span>

                <button
                  type="button"
                  onClick={() => apply(items.filter((_, i) => i !== index))}
                  aria-label="Remove photo"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-red-500 transition hover:bg-white"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </span>
            </div>

            <input
              type="text"
              value={item.alt}
              placeholder="Alt text"
              aria-label={`Alt text for photo ${index + 1}`}
              onChange={(event) => setField(index, "alt", event.target.value)}
              className={textInput}
            />
            <input
              type="text"
              value={item.title}
              placeholder="Title"
              aria-label={`Title for photo ${index + 1}`}
              onChange={(event) => setField(index, "title", event.target.value)}
              className={textInput}
            />
          </div>
        ))}

        {full ? null : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              upload(event.dataTransfer.files);
            }}
            className={`flex h-[130px] flex-col items-center justify-center gap-1.5 self-start rounded-[10px] border-2 border-dashed transition-colors ${
              dragging ? "border-[#17BEBB] bg-[#ECFEFF]" : "border-[#D1D5DB] bg-[#F9FAFB] hover:border-[#17BEBB]"
            }`}
          >
            {busy > 0 ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-[#0F4C81]" />
                <span className="text-[12px] font-semibold text-[#0F4C81]">Uploading {busy}…</span>
              </>
            ) : (
              <>
                <ImageUp className="h-6 w-6 text-[#94A3B8]" />
                <span className="text-[12px] font-semibold text-[#475569]">Add photos</span>
                <span className="text-[10.5px] text-[#94A3B8]">
                  {max ? `${room} of ${max} left` : "or drag them here"}
                </span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => upload(event.target.files)}
      />

      {error && (
        <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-red-600">
          <TriangleAlert className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}

      {max ? (
        <p className="text-[11.5px] text-[#94A3B8]">
          {items.length} of {max} photos
          {full && " — remove one to add another."}
        </p>
      ) : null}

      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  );
}
