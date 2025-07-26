import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import OrgStructureForm from "@/components/admin/OrgStructureForm";

async function getOrganizationalStructure(id) {
  const structure = await prisma.organizationalStructure.findUnique({
    where: { id },
  });

  if (!structure) {
    notFound();
  }

  return structure;
}

export default async function EditOrgStructurePage({ params }) {
  const structure = await getOrganizationalStructure(params.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Struktur Organisasi
        </h1>
      </div>

      <OrgStructureForm structure={structure} />
    </div>
  );
}
