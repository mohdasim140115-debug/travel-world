import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { customOptionFields, getModule } from "@/lib/adminModules";
import { updateRecord } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";
import { recordWithDefaults } from "@/lib/adminDefaults";

export default async function AdminModuleEditPage({ params }) {
  const { module: moduleSlug, id } = await params;
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) notFound();

  const record = await db[moduleConfig.model].findUnique({ where: { id } });
  if (!record) notFound();

  // Whatever the public page falls back to is shown here as real, editable
  // text rather than an empty box.
  const values = recordWithDefaults(moduleSlug, record);

  // Whatever the other records already use, so a category typed once shows
  // up in the dropdown everywhere else.
  const customFields = customOptionFields(moduleConfig);
  const optionsInUse = {};

  if (customFields.length) {
    const rows = await db[moduleConfig.model].findMany({
      select: Object.fromEntries(customFields.map((name) => [name, true])),
    });

    for (const name of customFields) {
      optionsInUse[name] = [...new Set(rows.map((row) => row[name]).filter(Boolean))].sort();
    }
  }

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

      <div className={wide ? (columns ? "" : "mt-5") : "mt-5 max-w-[1000px]"}>
        <AdminForm
          moduleSlug={moduleSlug}
          moduleConfig={moduleConfig}
          action={updateRecord.bind(null, moduleSlug, id)}
          initialValues={values}
          cancelHref={`/admin/${moduleSlug}`}
          optionsInUse={optionsInUse}
          recordTitle={title}
        />
      </div>
    </div>
  );
}
