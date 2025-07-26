import OrgStructureForm from "@/components/admin/OrgStructureForm";

export default function NewOrgStructurePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Tambah Struktur Organisasi Baru
        </h1>
      </div>

      <OrgStructureForm />
    </div>
  );
}
