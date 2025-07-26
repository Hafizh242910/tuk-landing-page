import prisma from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "@/components/admin/DeleteButton";
import Link from "next/link";
import { User } from "lucide-react";

export default async function OrganizationalStructurePage() {
  const structures = await prisma.organizationalStructure.findMany({
    orderBy: { level: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Struktur Organisasi
        </h1>
        <Link href="/admin/organizational-structure/new">
          <Button>Tambah Struktur</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Daftar Struktur Organisasi ({structures.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Foto</th>
                  <th className="text-left py-3 px-4">Nama</th>
                  <th className="text-left py-3 px-4">Jabatan</th>
                  <th className="text-left py-3 px-4">Departemen</th>
                  <th className="text-left py-3 px-4">Level</th>
                  <th className="text-left py-3 px-4">Kontak</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {structures.map((structure) => (
                  <tr key={structure.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {structure.photo ? (
                        <img
                          src={structure.photo}
                          alt={structure.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{structure.name}</div>
                    </td>
                    <td className="py-3 px-4">{structure.position}</td>
                    <td className="py-3 px-4">{structure.department || "-"}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">Level {structure.level}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        {structure.email && <div>{structure.email}</div>}
                        {structure.phone && (
                          <div className="text-gray-500">{structure.phone}</div>
                        )}
                        {!structure.email && !structure.phone && (
                          <div className="text-gray-400">-</div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={structure.isActive ? "default" : "secondary"}
                      >
                        {structure.isActive ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/organizational-structure/${structure.id}`}
                        >
                          <Button variant="outline" size="sm">
                            Lihat
                          </Button>
                        </Link>
                        <Link
                          href={`/admin/organizational-structure/${structure.id}/edit`}
                        >
                          <Button size="sm">Edit</Button>
                        </Link>
                        <DeleteButton
                          id={structure.id}
                          endpoint="organizational-structure"
                          redirectPath="/admin/organizational-structure"
                          itemName="struktur organisasi"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
