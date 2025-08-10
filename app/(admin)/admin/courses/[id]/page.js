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
  Target,
  FileText,
  Download,
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
  const { id } = await params;
  const course = await getCourse(id);
  const competencies = course.competencies
    ? course.competencies.split("\n").filter((item) => item.trim())
    : [];

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
                {course.shortTitle && (
                  <p className="text-gray-600 mt-1">{course.shortTitle}</p>
                )}
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
                  <p className="text-sm mt-1">{course.duration || "-"}</p>
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
                    <Badge variant={course.isActive ? "default" : "secondary"}>
                      {course.isActive ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </div>
                </div>
              </div>

              {course.description && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Deskripsi
                  </label>
                  <p className="text-sm mt-1 text-gray-700">
                    {course.description}
                  </p>
                </div>
              )}

              {competencies.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Kompetensi yang Dicapai
                  </label>
                  <div className="mt-2">
                    <ul className="space-y-2">
                      {competencies.map((competency, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-3 text-sm text-gray-700"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{competency}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {course.brochure && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Brosur
                  </label>
                  <div className="mt-2 flex items-center space-x-4">
                    <img
                      src={course.brochure}
                      alt="Course Brochure"
                      className="w-24 h-32 object-cover rounded-lg border"
                    />
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Brosur kursus tersedia
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = course.brochure;
                          link.download = `brosur-${course.title
                            .replace(/\s+/g, "-")
                            .toLowerCase()}.jpg`;
                          link.click();
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Brosur
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Schedules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Jadwal Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.schedules.length > 0 ? (
                  course.schedules.slice(0, 5).map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">
                          <DateText date={schedule.startDate} />
                        </p>
                        <p className="text-xs text-gray-600">
                          {schedule.location} • {schedule.available}/
                          {schedule.seats} kursi tersedia
                        </p>
                      </div>
                      <Badge variant="outline">{schedule.status}</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Tidak ada jadwal tersedia
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Statistik
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Jadwal</span>
                <Badge variant="secondary">{course._count.schedules}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Kompetensi</span>
                <Badge variant="outline">{competencies.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Brosur</span>
                <Badge variant={course.brochure ? "default" : "secondary"}>
                  {course.brochure ? "Tersedia" : "Tidak ada"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Informasi Tambahan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Dibuat Pada
                </label>
                <p className="text-sm mt-1">
                  <DateText date={course.createdAt} />
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Diperbarui Pada
                </label>
                <p className="text-sm mt-1">
                  <DateText date={course.updatedAt} />
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Aksi Cepat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full justify-start">
                <Link href={`/admin/courses/${course.id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Kursus
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/admin/schedules/new">
                  <Calendar className="w-4 h-4 mr-2" />
                  Tambah Jadwal
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href="/admin/courses">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Lihat Semua
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
