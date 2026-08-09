"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
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
    const items = JSON.parse(rawValue || "[]");
    return items.length ? items : field.required ? [] : null;
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
  await prisma[moduleConfig.model].create({ data });

  revalidateModule(moduleConfig);
  redirect(`/admin/${moduleSlug}`);
}

export async function updateRecord(moduleSlug, id, formData) {
  await requireAdminSession();
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) throw new Error("Unknown module");

  const data = buildData(moduleConfig, formData);
  await prisma[moduleConfig.model].update({ where: { id: Number(id) }, data });

  revalidateModule(moduleConfig);
  redirect(`/admin/${moduleSlug}`);
}

export async function deleteRecord(moduleSlug, id) {
  await requireAdminSession();
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) throw new Error("Unknown module");

  await prisma[moduleConfig.model].delete({ where: { id: Number(id) } });

  revalidateModule(moduleConfig);
  revalidatePath(`/admin/${moduleSlug}`);
}
