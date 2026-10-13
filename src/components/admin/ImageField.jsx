"use client";

import { useRef, useState } from "react";
import { ImageUp, Loader2, Trash2, TriangleAlert } from "lucide-react";

/* =========================================================
   IMAGE FIELD
   Shows the picture the record is actually using and lets the
   admin replace it by clicking it and choosing a file from
   their computer. The file goes to /api/admin/upload, which
   stores it and hands back a URL; that URL is what the form
   submits, so nothing changes about how records are saved.

   The path stays editable underneath for the images that are
   checked into public/uploads.
========================================================= */

export default function ImageField({ name, initialValue, required, onChange }) {
  const [value, setValue] = useState(initialValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef(null);

  const update = (next) => {
    setValue(next);
    onChange?.({ target: { name, value: next } });
  };

  async function upload(file) {
    if (!file) return;

    setBusy(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json();

      if (!response.ok) throw new Error(result?.error || "Upload failed.");
      update(result.url);
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setBusy(false);
      // Lets the same file be picked again after a failure.
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
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
          upload(event.dataTransfer.files?.[0]);
        }}
        className={`group relative block h-[170px] w-full overflow-hidden rounded-[10px] border-2 border-dashed transition-colors ${
          dragging ? "border-[#17BEBB] bg-[#ECFEFF]" : "border-[#D1D5DB] bg-[#F9FAFB] hover:border-[#17BEBB]"
        }`}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-full w-full object-cover" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#0F172A]/55 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <ImageUp className="h-6 w-6" />
              <span className="text-[12.5px] font-semibold">Click to change image</span>
            </span>
          </>
        ) : (
          <span className="flex h-full flex-col items-center justify-center gap-1.5 text-[#94A3B8]">
            <ImageUp className="h-7 w-7" />
            <span className="text-[12.5px] font-semibold text-[#475569]">
              Click to upload, or drag an image here
            </span>
            <span className="text-[11px]">JPG, PNG or WebP · up to 12 MB</span>
          </span>
        )}

        {busy && (
          <span className="absolute inset-0 flex items-center justify-center gap-2 bg-white/80 text-[13px] font-semibold text-[#0F4C81]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading…
          </span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => upload(event.target.files?.[0])}
      />

      {error && (
        <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-red-600">
          <TriangleAlert className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          name={name}
          value={value}
          required={required}
          placeholder="/uploads/destinations/photo.jpg"
          onChange={(event) => update(event.target.value)}
          className="w-full rounded-[6px] border border-[#D1D5DB] px-3 py-2 text-[12px] text-[#64748B] outline-none focus:border-[#17BEBB]"
        />
        {value && (
          <button
            type="button"
            onClick={() => update("")}
            title="Remove image"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-[#E5E7EB] text-[#94A3B8] transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
