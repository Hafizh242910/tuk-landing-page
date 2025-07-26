"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, Filter } from "lucide-react";

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    course: "",
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedulesResponse, coursesResponse] = await Promise.all([
          fetch("/api/schedules"),
          fetch("/api/courses"),
        ]);

        if (schedulesResponse.ok && coursesResponse.ok) {
          const schedulesData = await schedulesResponse.json();
          const coursesData = await coursesResponse.json();

          setSchedules(schedulesData.data || []);
          setCourses(coursesData.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      OPEN: { label: "Terbuka", className: "bg-green-100 text-green-800" },
      LIMITED: {
        label: "Terbatas",
        className: "bg-yellow-100 text-yellow-800",
      },
      FULL: { label: "Penuh", className: "bg-red-100 text-red-800" },
      CLOSED: { label: "Ditutup", className: "bg-gray-100 text-gray-800" },
      CANCELLED: { label: "Dibatalkan", className: "bg-red-100 text-red-800" },
    };
    const config = statusConfig[status] || statusConfig.OPEN;
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredSchedules = schedules.filter((schedule) => {
    const courseMatch = !filters.course || schedule.courseId === filters.course;
    const statusMatch = !filters.status || schedule.status === filters.status;
    return courseMatch && statusMatch;
  });

  const uniqueCourses = courses.filter((course) =>
    schedules.some((schedule) => schedule.courseId === course.id)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat jadwal pelatihan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-900 to-green-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              JADWAL PELATIHAN DAN SERTIFIKASI
            </h1>
            <p className="text-base md:text-lg text-green-100 max-w-3xl mx-auto px-4">
              Pilih jadwal yang sesuai dengan kebutuhan Anda untuk mengikuti
              program pelatihan dan sertifikasi
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="py-6 md:py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <select
                value={filters.course}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, course: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Semua Program</option>
                {uniqueCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Semua Status</option>
                <option value="OPEN">Terbuka</option>
                <option value="LIMITED">Terbatas</option>
                <option value="FULL">Penuh</option>
                <option value="CLOSED">Ditutup</option>
                <option value="CANCELLED">Dibatalkan</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule List */}
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Results Count */}
            <div className="mb-6 md:mb-8 text-center">
              <p className="text-gray-600 text-sm md:text-base">
                Menampilkan{" "}
                <span className="font-semibold text-green-600">
                  {filteredSchedules.length}
                </span>{" "}
                dari <span className="font-semibold">{schedules.length}</span>{" "}
                jadwal pelatihan
              </p>
            </div>

            {filteredSchedules.length > 0 ? (
              <div className="space-y-6 md:space-y-8">
                {filteredSchedules.map((schedule) => {
                  const course = courses.find(
                    (c) => c.id === schedule.courseId
                  );

                  return (
                    <div
                      key={schedule.id}
                      className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">
                                {course?.title || "Program Pelatihan"}
                              </h3>
                              {course?.shortTitle && (
                                <p className="text-sm text-gray-600 mb-2">
                                  {course.shortTitle}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(schedule.status)}
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {course?.category || "Umum"}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-green-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Tanggal
                                </p>
                                <p className="text-sm text-gray-600">
                                  {formatDate(schedule.startDate)}
                                </p>
                              </div>
                            </div>

                            {schedule.time && (
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Waktu
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {schedule.time}
                                  </p>
                                </div>
                              </div>
                            )}

                            {schedule.location && (
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-red-600" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Lokasi
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {schedule.location}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-purple-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Kursi
                                </p>
                                <p className="text-sm text-gray-600">
                                  {schedule.available}/{schedule.seats} tersedia
                                </p>
                              </div>
                            </div>
                          </div>

                          {schedule.description && (
                            <p className="text-gray-700 mb-4 text-sm md:text-base">
                              {schedule.description}
                            </p>
                          )}

                          {course?.description && (
                            <p className="text-gray-600 mb-4 text-sm md:text-base">
                              <strong>Deskripsi Program:</strong>{" "}
                              {course.description}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2 lg:ml-6 lg:w-48 mt-4 lg:mt-0">
                          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 text-sm md:text-base">
                            Lihat Detail
                          </button>
                          <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 text-sm md:text-base">
                            Lihat Program
                          </button>
                          {(schedule.status === "OPEN" ||
                            schedule.status === "LIMITED") && (
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 text-sm md:text-base">
                              Daftar Sekarang
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Calendar className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada jadwal yang ditemukan
                </h3>
                <p className="text-gray-500">
                  Coba ubah filter atau hubungi kami untuk informasi jadwal
                  terbaru.
                </p>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-8 md:mt-16 text-center bg-green-50 rounded-lg p-6 md:p-8">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                Butuh Jadwal Khusus?
              </h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base max-w-2xl mx-auto">
                Hubungi kami untuk mengatur jadwal pelatihan khusus sesuai
                dengan kebutuhan perusahaan Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-sm md:text-base">
                  Konsultasi Jadwal
                </button>
                <button className="border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-sm md:text-base">
                  Download Kalender
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
