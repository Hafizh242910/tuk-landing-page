"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Filter } from "lucide-react";
import FullCalendarSchedule from "./FullCalendarSchedule";

const ScheduleSection = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    course: "",
    status: "",
    search: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch schedules with course data
      const schedulesResponse = await fetch("/api/schedules");
      if (schedulesResponse.ok) {
        const schedulesData = await schedulesResponse.json();
        setSchedules(schedulesData.data || []);
        setFilteredSchedules(schedulesData.data || []);
      }

      // Fetch courses for filter dropdown
      const coursesResponse = await fetch("/api/courses");
      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json();
        setCourses(coursesData.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...schedules];

    // Filter by course
    if (filters.course) {
      filtered = filtered.filter(
        (schedule) => schedule.courseId === filters.course
      );
    }

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter((schedule) => {
        const status = schedule.status || "OPEN";
        if (filters.status === "available") {
          return status === "OPEN";
        } else if (filters.status === "limited") {
          return status === "LIMITED";
        } else if (filters.status === "full") {
          return status === "FULL";
        } else if (filters.status === "closed") {
          return status === "CLOSED";
        } else if (filters.status === "cancelled") {
          return status === "CANCELLED";
        }
        return true;
      });
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((schedule) => {
        const courseTitle = schedule.course?.title?.toLowerCase() || "";
        const courseShortTitle =
          schedule.course?.shortTitle?.toLowerCase() || "";
        const location = schedule.location?.toLowerCase() || "";

        return (
          courseTitle.includes(searchLower) ||
          courseShortTitle.includes(searchLower) ||
          location.includes(searchLower)
        );
      });
    }

    setFilteredSchedules(filtered);
  }, [schedules, filters]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      course: "",
      status: "",
      search: "",
    });
  };

  const getStatusBadge = (schedule) => {
    // Use status from backend, fallback to calculated status if not set
    const status = schedule.status || "OPEN";

    switch (status) {
      case "OPEN":
        return (
          <Badge
            variant="default"
            style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
          >
            Tersedia
          </Badge>
        );
      case "LIMITED":
        return (
          <Badge
            variant="secondary"
            style={{ backgroundColor: "#F97316", color: "#FFFFFF" }}
          >
            Terbatas
          </Badge>
        );
      case "FULL":
        return (
          <Badge
            variant="destructive"
            style={{ backgroundColor: "#EF4444", color: "#FFFFFF" }}
          >
            Penuh
          </Badge>
        );
      case "CLOSED":
        return (
          <Badge
            variant="outline"
            style={{ backgroundColor: "#6B7280", color: "#FFFFFF" }}
          >
            Ditutup
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge
            variant="destructive"
            style={{ backgroundColor: "#DC2626", color: "#FFFFFF" }}
          >
            Dibatalkan
          </Badge>
        );
      default:
        // Fallback to calculated status based on availability
        const available = schedule.available;
        const total = schedule.seats;
        const percentage = (available / total) * 100;

        if (percentage === 0) {
          return (
            <Badge
              variant="destructive"
              style={{ backgroundColor: "#EF4444", color: "#FFFFFF" }}
            >
              Penuh
            </Badge>
          );
        } else if (percentage <= 30) {
          return (
            <Badge
              variant="secondary"
              style={{ backgroundColor: "#F97316", color: "#FFFFFF" }}
            >
              Terbatas
            </Badge>
          );
        } else {
          return (
            <Badge
              variant="default"
              style={{ backgroundColor: "#22C55E", color: "#FFFFFF" }}
            >
              Tersedia
            </Badge>
          );
        }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat jadwal pelatihan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Jadwal Pelatihan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lihat dan daftar program pelatihan yang tersedia. Pilih jadwal yang
            sesuai dengan kebutuhan Anda.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter & Pencarian</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <Label htmlFor="search">Cari Program</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Cari program atau lokasi..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Course Filter */}
              <div className="space-y-2">
                <Label htmlFor="course">Program Pelatihan</Label>
                <select
                  id="course"
                  value={filters.course}
                  onChange={(e) => handleFilterChange("course", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Program</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label htmlFor="status">Status Ketersediaan</Label>
                <select
                  id="status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Status</option>
                  <option value="available">Tersedia</option>
                  <option value="limited">Terbatas</option>
                  <option value="full">Penuh</option>
                  <option value="closed">Ditutup</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Bersihkan Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan{" "}
            <span className="font-semibold">{filteredSchedules.length}</span>{" "}
            jadwal pelatihan
            {filters.course || filters.status || filters.search
              ? " (difilter)"
              : ""}
          </p>
        </div>

        {/* FullCalendar Component */}
        <FullCalendarSchedule schedules={filteredSchedules} />
      </div>
    </div>
  );
};

export default ScheduleSection;
