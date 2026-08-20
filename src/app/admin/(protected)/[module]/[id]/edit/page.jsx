import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getModule } from "@/lib/adminModules";
import { updateRecord } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";

export default async function AdminModuleEditPage({ params }) {
  const { module: moduleSlug, id } = await params;
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) notFound();

  const record = await db[moduleConfig.model].findUnique({ where: { id } });
  if (!record) notFound();

  return (
    <div>
      <h1 className="text-[22px] font-bold text-[#0F172A]">
        Edit {moduleConfig.label} — {record[moduleConfig.titleField]}
      </h1>

      <div className="mt-5 max-w-[720px]">
        <AdminForm
          moduleSlug={moduleSlug}
          moduleConfig={moduleConfig}
          action={updateRecord.bind(null, moduleSlug, id)}
          initialValues={record}
          cancelHref={`/admin/${moduleSlug}`}
        />
      </div>
    </div>
  );
}
