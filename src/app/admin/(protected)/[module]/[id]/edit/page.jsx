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

  const title = record[moduleConfig.titleField];
  // A column layout draws its own header, so the page skips the heading and
  // gives the form the whole width instead of a 720px reading column.
  const columns = Boolean(moduleConfig.form?.columns?.length);
  const wide = Boolean(moduleConfig.form);

  return (
    <div>
      {columns ? null : (
        <h1 className="text-[22px] font-bold text-[#0F172A]">
          Edit {moduleConfig.label} — {title}
        </h1>
      )}

      <div className={wide ? (columns ? "" : "mt-5") : "mt-5 max-w-[720px]"}>
        <AdminForm
          moduleSlug={moduleSlug}
          moduleConfig={moduleConfig}
          action={updateRecord.bind(null, moduleSlug, id)}
          initialValues={record}
          cancelHref={`/admin/${moduleSlug}`}
          recordTitle={title}
        />
      </div>
    </div>
  );
}
