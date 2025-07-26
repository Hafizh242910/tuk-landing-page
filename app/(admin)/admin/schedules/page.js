import prisma from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "@/components/admin/DeleteButton";
import Link from "next/link";
import DateText from "@/components/admin/DateText";

export default async function SchedulesPage() {
  const schedules = await prisma.schedule.findMany({
    orderBy: { startDate: "desc" },
    include: {
      course: {
        select: {
          title: true,
        },
      },
    },
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      OPEN: { label: "Terbuka", variant: "default" },
      LIMITED: { label: "Terbatas", variant: "secondary" },
      FULL: { label: "Penuh", variant: "destructive" },
      CLOSED: { label: "Ditutup", variant: "outline" },
      CANCELLED: { label: "Dibatalkan", variant: "destructive" },
    };
    const config = statusConfig[status] || statusConfig.OPEN;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Jadwal</h1>
        <Link href="/admin/schedules/new">
          <Button>Tambah Jadwal</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Jadwal ({schedules.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Kursus</th>
                  <th className="text-left py-3 px-4">Tanggal</th>
                  <th className="text-left py-3 px-4">Waktu</th>
                  <th className="text-left py-3 px-4">Lokasi</th>
                  <th className="text-left py-3 px-4">Kursi</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{schedule.course.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">
                          <DateText date={schedule.startDate} />
                        </div>
                        {schedule.endDate &&
                          schedule.endDate !== schedule.startDate && (
                            <div className="text-sm text-gray-500">
                              s/d <DateText date={schedule.endDate} />
                            </div>
                          )}
                      </div>
                    </td>
                    <td className="py-3 px-4">{schedule.time || "-"}</td>
                    <td className="py-3 px-4">{schedule.location || "-"}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>
                          {schedule.available}/{schedule.seats}
                        </div>
                        <div className="text-gray-500">tersedia</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(schedule.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Link href={`/admin/schedules/${schedule.id}`}>
                          <Button variant="outline" size="sm">
                            Lihat
                          </Button>
                        </Link>
                        <Link href={`/admin/schedules/${schedule.id}/edit`}>
                          <Button size="sm">Edit</Button>
                        </Link>
                        <DeleteButton
                          id={schedule.id}
                          endpoint="schedules"
                          redirectPath="/admin/schedules"
                          itemName="jadwal"
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
