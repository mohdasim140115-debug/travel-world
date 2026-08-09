"use client";

import { useActionState } from "react";
import Link from "next/link";
import JsonListField from "./JsonListField";

function Field({ field, initialValue }) {
  const commonClasses =
    "w-full rounded-[6px] border border-[#D1D5DB] px-3 py-2 text-[13px] outline-none focus:border-[#17BEBB]";

  if (field.type === "textarea") {
    return (
      <textarea
        name={field.name}
        defaultValue={initialValue ?? ""}
        required={field.required}
        rows={4}
        className={commonClasses}
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <input
        type="checkbox"
        name={field.name}
        defaultChecked={Boolean(initialValue)}
        className="h-4 w-4 rounded border-[#D1D5DB] text-[#17BEBB]"
      />
    );
  }

  if (field.type === "select") {
    return (
      <select name={field.name} defaultValue={initialValue ?? ""} required={field.required} className={commonClasses}>
        <option value="" disabled>
          Select...
        </option>
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "string-list") {
    return <JsonListField name={field.name} initialItems={Array.isArray(initialValue) ? initialValue : []} />;
  }

  if (field.type === "json") {
    return (
      <textarea
        name={field.name}
        defaultValue={initialValue ? JSON.stringify(initialValue, null, 2) : ""}
        required={field.required}
        rows={8}
        spellCheck={false}
        className={`${commonClasses} font-mono text-[12px]`}
      />
    );
  }

  if (field.type === "image") {
    return (
      <div className="flex items-center gap-3">
        <input
          type="text"
          name={field.name}
          defaultValue={initialValue ?? ""}
          required={field.required}
          placeholder="/example-photo.jpg"
          className={commonClasses}
        />
        {initialValue && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={initialValue}
            alt=""
            className="h-10 w-10 shrink-0 rounded-[6px] border border-[#E5E7EB] object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <input
      type={field.type === "number" ? "number" : "text"}
      name={field.name}
      step={field.step}
      defaultValue={initialValue ?? ""}
      required={field.required}
      className={commonClasses}
    />
  );
}

export default function AdminForm({ moduleSlug, moduleConfig, action, initialValues = {}, cancelHref }) {
  const [state, formAction, isPending] = useActionState(async (_prev, formData) => {
    try {
      await action(formData);
      return null;
    } catch (error) {
      if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
      return { error: error?.message || "Something went wrong." };
    }
  }, null);

  return (
    <form action={formAction} className="flex flex-col gap-5 rounded-[14px] border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {moduleConfig.fields.map((field) => (
        <div key={field.name} className={field.type === "boolean" ? "flex items-center gap-2" : ""}>
          <label className="mb-1 block text-[12px] font-semibold text-[#475569]">
            {field.label}
            {field.required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
          <Field field={field} initialValue={initialValues[field.name]} />
        </div>
      ))}

      {state?.error && (
        <p className="rounded-[8px] bg-red-50 px-3 py-2 text-[12px] font-medium text-red-600">{state.error}</p>
      )}

      <div className="flex items-center gap-3 border-t border-[#E5E7EB] pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex h-[42px] items-center justify-center rounded-[8px] bg-[#FF7A1A] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#E56A0F] disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
        <Link
          href={cancelHref}
          className="flex h-[42px] items-center justify-center rounded-[8px] border border-[#D1D5DB] px-6 text-[14px] font-semibold text-[#475569] hover:border-[#94A3B8]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
