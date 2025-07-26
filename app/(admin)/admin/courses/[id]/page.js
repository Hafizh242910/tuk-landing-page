import prisma from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DateText from "@/components/admin/DateText";

async function getCourse(id) {
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      schedules: {
        orderBy: { startDate: "asc" },
      },
      _count: {
        select: { schedules: true },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return course;
}

export default async function CourseDetailPage({ params }) {
  const course = await getCourse(params.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/courses">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Detail Kursus</h1>
        </div>
        <div className="flex space-x-2">
          <Button asChild>
            <Link href={`/admin/courses/${course.id}/edit`}>
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
              <CardTitle>Informasi Kursus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {course.title}
                </h2>
                <p className="text-gray-600 mt-1">{course.shortTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Kategori
                  </label>
                  <p className="text-sm mt-1">{course.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Durasi
                  </label>
                  <p className="text-sm mt-1">{course.duration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Harga
                  </label>
                  <p className="text-sm mt-1">
                    {course.price
                      ? `Rp ${course.price.toLocaleString()}`
                      : "Gratis"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <div className="mt-1">
                    <Badge
                      variant={course.isActive ? "default" : "destructive"}
                    >
                      {course.isActive ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    ID Kursus
                  </label>
                  <p className="text-sm mt-1">{course.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Dibuat
                  </label>
                  <p className="text-sm mt-1">
                    <DateText date={course.createdAt} />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jadwal Kursus</CardTitle>
            </CardHeader>
            <CardContent>
              {course.schedules.length > 0 ? (
                <div className="space-y-3">
                  {course.schedules.map((schedule) => (
                    <div key={schedule.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            <DateText date={schedule.startDate} /> -{" "}
                            {schedule.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            {schedule.location}
                          </p>
                          <p className="text-xs text-gray-500">
                            {schedule.available}/{schedule.seats} kursi tersedia
                          </p>
                        </div>
                        <Badge
                          variant={
                            schedule.status === "OPEN"
                              ? "default"
                              : schedule.status === "LIMITED"
                              ? "secondary"
                              : schedule.status === "FULL"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {schedule.status === "OPEN"
                            ? "Terbuka"
                            : schedule.status === "LIMITED"
                            ? "Terbatas"
                            : schedule.status === "FULL"
                            ? "Penuh"
                            : "Dibatalkan"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Belum ada jadwal untuk kursus ini
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">{course._count.schedules}</p>
                  <p className="text-sm text-gray-600">Total Jadwal</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">
                    {course.schedules.reduce(
                      (total, s) => total + (s.seats - s.available),
                      0
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Total Peserta</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium">
                    {course.price
                      ? `Rp ${course.price.toLocaleString()}`
                      : "Gratis"}
                  </p>
                  <p className="text-sm text-gray-600">Harga Kursus</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deskripsi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{course.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
