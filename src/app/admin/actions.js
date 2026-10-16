"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { getModule } from "@/lib/adminModules";
import { recordSlugChange } from "@/lib/slugHistory";

/* A slug becomes part of a URL, so it cannot carry anything a URL would
   mangle. A trailing space is the one that bit: the row saved fine, the page
   was built at "/package/my-tour%20" and every real link 404'd. */
function toSlug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const trimmed = (value) => (typeof value === "string" ? value.trim() : value);

/** Trims the strings inside a parsed list or object, one level deep. */
function trimDeep(value) {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map(trimDeep);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, trimDeep(item)]));
  }
  return value;
}

function parseFieldValue(field, rawValue) {
  if (field.type === "number") {
    if (rawValue === "" || rawValue === null || rawValue === undefined) return null;
    return Number(rawValue);
  }

  if (field.type === "boolean") {
    return rawValue === "on" || rawValue === "true";
  }

  if (field.type === "string-list" || field.type === "images") {
    const list = trimDeep(JSON.parse(rawValue || "[]"));
    return field.max ? list.slice(0, field.max) : list;
  }

  // Row lists post the same JSON the old textarea did.
  if (field.type === "rows") {
    return trimDeep(JSON.parse(rawValue || "[]"));
  }

  if (field.type === "object") {
    if (!rawValue || !rawValue.trim()) return null;
    return trimDeep(JSON.parse(rawValue));
  }

  if (field.type === "json") {
    if (!rawValue || !rawValue.trim()) return field.required ? null : null;
    return JSON.parse(rawValue);
  }

  // Everything else is text. Stray whitespace is never wanted and silently
  // breaks slugs, lookups and matching, so it goes here rather than at every
  // call site that reads the value back.
  const value = trimmed(rawValue);

  if (field.name === "slug") return value ? toSlug(value) : value;

  if (value === "" && !field.required) return null;
  return value;
}

function buildData(moduleConfig, formData) {
  const data = {};
  for (const field of moduleConfig.fields) {
    const raw = formData.get(field.name);
    data[field.name] = parseFieldValue(field, raw);
  }
  return data;
}

function revalidateModule(moduleConfig) {
  // Every detail page lives on a dynamic route — /package/[slug],
  // /india/[destination], /hotels/[city]/[hotel] and so on. A literal path
  // like "/package" never matches those, so an edit saved to the database
  // but the public page kept serving its cached copy. Invalidating the root
  // layout clears every page beneath it, which is what an admin expects
  // after pressing Save.
  revalidatePath("/", "layout");

  for (const path of moduleConfig.revalidate ?? []) {
    revalidatePath(path);
  }

  revalidatePath("/admin", "layout");
}

export async function createRecord(moduleSlug, formData) {
  await requireAdminSession();
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) throw new Error("Unknown module");

  const data = buildData(moduleConfig, formData);
  const created = await db[moduleConfig.model].create({ data });

  revalidateModule(moduleConfig);

  // Land on the new record rather than the list, so the next edit continues
  // where the admin already is.
  redirect(`/admin/${moduleSlug}/${created.id}/edit`);
}

export async function updateRecord(moduleSlug, id, formData) {
  await requireAdminSession();
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) throw new Error("Unknown module");

  const data = buildData(moduleConfig, formData);

  // A rename retires a URL that may be indexed or shared, so the old one is
  // written down before it is lost and keeps working as a redirect.
  if (data.slug !== undefined) {
    const current = await db[moduleConfig.model].findUnique({ where: { id }, select: { slug: true } });
    if (current?.slug && current.slug !== data.slug) {
      await recordSlugChange(moduleConfig.model, current.slug, data.slug);
    }
  }

  await db[moduleConfig.model].update({ where: { id }, data });

  revalidateModule(moduleConfig);

  // No redirect: saving should leave the admin on the page they were editing.
  return { saved: true };
}

export async function deleteRecord(moduleSlug, id) {
  await requireAdminSession();
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) throw new Error("Unknown module");

  await db[moduleConfig.model].delete({ where: { id } });

  revalidateModule(moduleConfig);
  revalidatePath(`/admin/${moduleSlug}`);
}
