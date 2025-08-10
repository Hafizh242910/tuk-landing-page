import prisma from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DateText from "@/components/admin/DateText";

async function getSchedule(id) {
  const schedule = await prisma.schedule.findUnique({
    where: { id },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          competencies: true,
          brochure: true,
          category: true,
        },
      },
    },
  });

  if (!schedule) {
    notFound();
  }

  return schedule;
}

function getStatusBadge(status) {
  const statusConfig = {
    OPEN: { label: "Terbuka", variant: "default" },
    LIMITED: { label: "Terbatas", variant: "secondary" },
    FULL: { label: "Penuh", variant: "destructive" },
    CLOSED: { label: "Ditutup", variant: "outline" },
    CANCELLED: { label: "Dibatalkan", variant: "destructive" },
  };
  const config = statusConfig[status] || statusConfig.OPEN;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export default async function ScheduleDetailPage({ params }) {
  const { id } = await params;
  const schedule = await getSchedule(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Detail Jadwal</h1>
        <div className="flex space-x-4">
          <Link href={`/admin/schedules/${schedule.id}/edit`}>
            <Button>Edit Jadwal</Button>
          </Link>
          <Link href="/admin/schedules">
            <Button variant="outline">Kembali</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Jadwal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {schedule.course.title}
                </h2>
                <p className="text-gray-600 mt-1">{schedule.course.category}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Tanggal Mulai
                  </label>
                  <p className="text-sm mt-1">
                    <DateText date={schedule.startDate} />
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Tanggal Selesai
                  </label>
                  <p className="text-sm mt-1">
                    <DateText date={schedule.endDate} />
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Waktu
                  </label>
                  <p className="text-sm mt-1">{schedule.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Lokasi
                  </label>
                  <p className="text-sm mt-1">{schedule.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Total Kursi
                  </label>
                  <p className="text-sm mt-1">{schedule.seats}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Kursi Tersedia
                  </label>
                  <p className="text-sm mt-1">{schedule.available}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <div className="mt-1">{getStatusBadge(schedule.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    ID Jadwal
                  </label>
                  <p className="text-sm mt-1">{schedule.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Dibuat
                  </label>
                  <p className="text-sm mt-1">
                    <DateText date={schedule.createdAt} />
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Terakhir Update
                  </label>
                  <p className="text-sm mt-1">
                    <DateText date={schedule.updatedAt} />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Kursus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Judul Kursus
                  </label>
                  <p className="text-sm mt-1">{schedule.course.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Kategori
                  </label>
                  <p className="text-sm mt-1">{schedule.course.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Kompetensi
                  </label>
                  <p className="text-sm mt-1">
                    {schedule.course.competencies
                      ? schedule.course.competencies
                          .split("\n")
                          .slice(0, 2)
                          .join(", ") +
                        (schedule.course.competencies.split("\n").length > 2
                          ? "..."
                          : "")
                      : "Tidak ada"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Brosur
                  </label>
                  <p className="text-sm mt-1">
                    {schedule.course.brochure ? "Tersedia" : "Tidak ada"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full justify-start">
                <Link href={`/admin/courses/${schedule.course.id}`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Lihat Kursus
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link href={`/admin/schedules/${schedule.id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Jadwal
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lokasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="text-sm">{schedule.location}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
