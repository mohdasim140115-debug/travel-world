import { notFound } from "next/navigation";
import { getModule } from "@/lib/adminModules";
import { createRecord } from "@/app/admin/actions";
import AdminForm from "@/components/admin/AdminForm";

export default async function AdminModuleNewPage({ params }) {
  const { module: moduleSlug } = await params;
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) notFound();

  return (
    <div>
      <h1 className="text-[22px] font-bold text-[#0F172A]">Add {moduleConfig.label}</h1>

      <div className="mt-5 max-w-[720px]">
        <AdminForm
          moduleSlug={moduleSlug}
          moduleConfig={moduleConfig}
          action={createRecord.bind(null, moduleSlug)}
          cancelHref={`/admin/${moduleSlug}`}
        />
      </div>
    </div>
  );
}
