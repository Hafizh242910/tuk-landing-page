import prisma from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "@/components/admin/DeleteButton";
import Link from "next/link";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { schedules: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Kursus</h1>
        <Link href="/admin/courses/new">
          <Button>Tambah Kursus</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kursus ({courses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Judul</th>
                  <th className="text-left py-3 px-4">Kategori</th>
                  <th className="text-left py-3 px-4">Harga</th>
                  <th className="text-left py-3 px-4">Jadwal</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{course.title}</div>
                        {course.shortTitle && (
                          <div className="text-sm text-gray-500">
                            {course.shortTitle}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{course.category}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      {course.price
                        ? `Rp ${course.price.toLocaleString()}`
                        : "Gratis"}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">
                        {course._count.schedules} jadwal
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={course.isActive ? "default" : "secondary"}
                      >
                        {course.isActive ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Link href={`/admin/courses/${course.id}`}>
                          <Button variant="outline" size="sm">
                            Lihat
                          </Button>
                        </Link>
                        <Link href={`/admin/courses/${course.id}/edit`}>
                          <Button size="sm">Edit</Button>
                        </Link>
                        <DeleteButton
                          id={course.id}
                          endpoint="courses"
                          redirectPath="/admin/courses"
                          itemName="kursus"
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
