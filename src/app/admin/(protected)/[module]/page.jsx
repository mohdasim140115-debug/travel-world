import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getModule } from "@/lib/adminModules";
import AdminTable from "@/components/admin/AdminTable";

export default async function AdminModuleListPage({ params }) {
  const { module: moduleSlug } = await params;
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) notFound();

  const rows = await db[moduleConfig.model].findMany({ orderBy: { order: "asc" } });

  return <AdminTable moduleSlug={moduleSlug} moduleConfig={moduleConfig} rows={rows} />;
}
