import prisma from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  Calendar,
  Building,
  TrendingUp,
  Plus,
  Eye,
} from "lucide-react";
import Link from "next/link";
import DateText from "@/components/admin/DateText";

async function getStats() {
  try {
    // Test connection first
    await prisma.$connect();

    const [users, courses, schedules, structures] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.schedule.count(),
      prisma.organizationalStructure.count(),
    ]);

    await prisma.$disconnect();
    return { users, courses, schedules, structures };
  } catch (error) {
    console.error("Stats API Error:", error);

    // If it's a connection error, return default values
    if (
      error.message?.includes("Engine is not yet connected") ||
      error.message?.includes("connect")
    ) {
      return { users: 0, courses: 0, schedules: 0, structures: 0 };
    }

    throw error;
  }
}

async function getRecentData() {
  try {
    // Test connection first
    await prisma.$connect();

    const [recentUsers, recentCourses, recentSchedules] = await Promise.all([
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.course.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.schedule.findMany({
        take: 5,
        orderBy: { startDate: "asc" },
        include: { course: true },
      }),
    ]);

    await prisma.$disconnect();
    return { recentUsers, recentCourses, recentSchedules };
  } catch (error) {
    console.error("Recent Data API Error:", error);

    // If it's a connection error, return empty arrays
    if (
      error.message?.includes("Engine is not yet connected") ||
      error.message?.includes("connect")
    ) {
      return { recentUsers: [], recentCourses: [], recentSchedules: [] };
    }

    throw error;
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const { recentUsers, recentCourses, recentSchedules } = await getRecentData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <div className="flex space-x-2">
          <Button asChild>
            <Link href="/admin/courses/new">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kursus
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/schedules/new">
              <Calendar className="w-4 h-4 mr-2" />
              Tambah Jadwal
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pengguna
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kursus</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.courses}</div>
            <p className="text-xs text-muted-foreground">+12 kursus aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jadwal</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.schedules}</div>
            <p className="text-xs text-muted-foreground">+5 jadwal aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Struktur Organisasi
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.structures}</div>
            <p className="text-xs text-muted-foreground">+2 posisi baru</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Tambah Kursus</h3>
                <p className="text-sm text-gray-600">
                  Buat program pelatihan baru
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Atur Jadwal</h3>
                <p className="text-sm text-gray-600">Buat jadwal pelatihan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Kelola User</h3>
                <p className="text-sm text-gray-600">
                  Tambah atau edit pengguna
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Building className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Struktur</h3>
                <p className="text-sm text-gray-600">
                  Atur struktur organisasi
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Pengguna Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <Badge
                      variant={user.role === "ADMIN" ? "default" : "secondary"}
                    >
                      {user.role}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Tidak ada pengguna terbaru
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Kursus Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.length > 0 ? (
                recentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{course.title}</p>
                      <p className="text-sm text-gray-600">
                        {course.price
                          ? `Rp ${course.price.toLocaleString()}`
                          : "Gratis"}
                      </p>
                    </div>
                    <Badge variant={course.isActive ? "default" : "secondary"}>
                      {course.isActive ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Tidak ada kursus terbaru
                </p>
              )}
            </div>
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
              {recentSchedules.length > 0 ? (
                recentSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">
                        {schedule.course?.title || "Kursus"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {schedule.available}/{schedule.seats} kursi tersedia
                      </p>
                    </div>
                    <Badge variant="outline">{schedule.status}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Tidak ada jadwal terbaru
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
