import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getModule } from "@/lib/adminModules";
import AdminTable from "@/components/admin/AdminTable";

export default async function AdminModuleListPage({ params }) {
  const { module: moduleSlug } = await params;
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) notFound();

  const rows = await prisma[moduleConfig.model].findMany({ orderBy: { order: "asc" } });

  return <AdminTable moduleSlug={moduleSlug} moduleConfig={moduleConfig} rows={rows} />;
}
