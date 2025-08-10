import prisma from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Building,
  Users,
  Phone,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DateText from "@/components/admin/DateText";

async function getOrganizationalStructure(id) {
  const structure = await prisma.organizationalStructure.findUnique({
    where: { id },
  });

  if (!structure) {
    notFound();
  }

  return structure;
}

export default async function OrganizationalStructureDetailPage({ params }) {
  const { id } = await params;
  const structure = await getOrganizationalStructure(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/organizational-structure">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Detail Struktur Organisasi
          </h1>
        </div>
        <div className="flex space-x-2">
          <Button asChild>
            <Link href={`/admin/organizational-structure/${structure.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Struktur Organisasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                {structure.photo ? (
                  <img
                    src={structure.photo}
                    alt={structure.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {structure.name}
                  </h2>
                  <p className="text-gray-600 mt-1">{structure.position}</p>
                  {structure.department && (
                    <p className="text-sm text-gray-500 mt-1">
                      {structure.department}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Nama
                  </label>
                  <p className="text-sm mt-1">{structure.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Jabatan
                  </label>
                  <p className="text-sm mt-1">{structure.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Departemen
                  </label>
                  <p className="text-sm mt-1">{structure.department || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Level
                  </label>
                  <p className="text-sm mt-1">{structure.level}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-sm mt-1">{structure.email || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Telepon
                  </label>
                  <p className="text-sm mt-1">{structure.phone || "-"}</p>
                </div>
              </div>

              {structure.description && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Deskripsi
                  </label>
                  <p className="text-sm mt-1">{structure.description}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Status
                </label>
                <div className="mt-1">
                  <Badge variant={structure.isActive ? "default" : "secondary"}>
                    {structure.isActive ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Informasi Tambahan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Dibuat Pada
                </label>
                <p className="text-sm mt-1">
                  <DateText date={structure.createdAt} />
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Diperbarui Pada
                </label>
                <p className="text-sm mt-1">
                  <DateText date={structure.updatedAt} />
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Kontak
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {structure.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{structure.email}</span>
                </div>
              )}
              {structure.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{structure.phone}</span>
                </div>
              )}
              {!structure.email && !structure.phone && (
                <p className="text-sm text-gray-500">
                  Tidak ada informasi kontak
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
