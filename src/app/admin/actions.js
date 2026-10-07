"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { getModule } from "@/lib/adminModules";

function parseFieldValue(field, rawValue) {
  if (field.type === "number") {
    if (rawValue === "" || rawValue === null || rawValue === undefined) return null;
    return Number(rawValue);
  }

  if (field.type === "boolean") {
    return rawValue === "on" || rawValue === "true";
  }

  if (field.type === "string-list") {
    return JSON.parse(rawValue || "[]");
  }

  // Row lists post the same JSON the old textarea did.
  if (field.type === "rows") {
    return JSON.parse(rawValue || "[]");
  }

  if (field.type === "object") {
    if (!rawValue || !rawValue.trim()) return null;
    return JSON.parse(rawValue);
  }

  if (field.type === "json") {
    if (!rawValue || !rawValue.trim()) return field.required ? null : null;
    return JSON.parse(rawValue);
  }

  if (rawValue === "" && !field.required) return null;
  return rawValue;
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
  await db[moduleConfig.model].create({ data });

  revalidateModule(moduleConfig);
  redirect(`/admin/${moduleSlug}`);
}

export async function updateRecord(moduleSlug, id, formData) {
  await requireAdminSession();
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) throw new Error("Unknown module");

  const data = buildData(moduleConfig, formData);
  await db[moduleConfig.model].update({ where: { id }, data });

  revalidateModule(moduleConfig);
  redirect(`/admin/${moduleSlug}`);
}

export async function deleteRecord(moduleSlug, id) {
  await requireAdminSession();
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) throw new Error("Unknown module");

  await db[moduleConfig.model].delete({ where: { id } });

  revalidateModule(moduleConfig);
  revalidatePath(`/admin/${moduleSlug}`);
}
