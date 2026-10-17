import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { customOptionFields, getModule } from "@/lib/adminModules";
import { createRecord } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";

export default async function AdminModuleNewPage({ params }) {
  const { module: moduleSlug } = await params;
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) notFound();

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

  // A column layout draws its own header, so the page skips the heading.
  const columns = Boolean(moduleConfig.form?.columns?.length);
  const wide = Boolean(moduleConfig.form);

  return (
    <div>
      {columns ? null : (
        <h1 className="text-[22px] font-bold text-[#0F172A]">Add {moduleConfig.label}</h1>
      )}

      <div className={wide ? (columns ? "" : "mt-5") : "mt-5 max-w-[1000px]"}>
        <AdminForm
          moduleSlug={moduleSlug}
          moduleConfig={moduleConfig}
          action={createRecord.bind(null, moduleSlug)}
          cancelHref={`/admin/${moduleSlug}`}
          optionsInUse={optionsInUse}
          recordTitle={`New ${moduleConfig.label}`}
        />
      </div>
    </div>
  );
}
