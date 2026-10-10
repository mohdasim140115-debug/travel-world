import { notFound } from "next/navigation";
import { getModule } from "@/lib/adminModules";
import { createRecord } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";

export default async function AdminModuleNewPage({ params }) {
  const { module: moduleSlug } = await params;
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) notFound();

  // A column layout draws its own header, so the page skips the heading.
  const columns = Boolean(moduleConfig.form?.columns?.length);
  const wide = Boolean(moduleConfig.form);

  return (
    <div>
      {columns ? null : (
        <h1 className="text-[22px] font-bold text-[#0F172A]">Add {moduleConfig.label}</h1>
      )}

      <div className={wide ? (columns ? "" : "mt-5") : "mt-5 max-w-[720px]"}>
        <AdminForm
          moduleSlug={moduleSlug}
          moduleConfig={moduleConfig}
          action={createRecord.bind(null, moduleSlug)}
          cancelHref={`/admin/${moduleSlug}`}
          recordTitle={`New ${moduleConfig.label}`}
        />
      </div>
    </div>
  );
}
