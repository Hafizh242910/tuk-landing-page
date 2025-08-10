import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

async function getUser(id) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export default async function UserDetailPage({ params }) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Detail Pengguna</h1>
        <div className="flex space-x-4">
          <Link href={`/admin/users/${user.id}/edit`}>
            <Button>Edit Pengguna</Button>
          </Link>
          <Link href="/admin/users">
            <Button variant="outline">Kembali</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pengguna</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Nama</label>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Role</label>
              <div className="mt-1">
                <Badge
                  variant={user.role === "ADMIN" ? "default" : "secondary"}
                >
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Tanggal Dibuat
              </label>
              <p className="text-lg">
                {new Date(user.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Terakhir Diupdate
              </label>
              <p className="text-lg">
                {new Date(user.updatedAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Status Akun
              </label>
              <div className="mt-1">
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800"
                >
                  Aktif
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Link href={`/admin/users/${user.id}/edit`}>
              <Button>Edit Pengguna</Button>
            </Link>
            <Link href="/admin/users/new">
              <Button variant="outline">Tambah Pengguna Baru</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
