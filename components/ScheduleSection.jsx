"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Filter } from "lucide-react";
import FullCalendarSchedule from "./FullCalendarSchedule";
import { motion } from "framer-motion";

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
        console.log("Schedules API Response:", schedulesData);
        const activeSchedules = schedulesData.data || [];
        // console.log("Active Schedules:", activeSchedules);
        setSchedules(activeSchedules);
        setFilteredSchedules(activeSchedules);
      } else {
        console.log("Schedules API response not ok, using fallback data");
        // Fallback data jika API tidak tersedia
        const fallbackSchedules = [
          {
            id: 1,
            courseId: 1,
            course: {
              id: 1,
              title: "Operator Penyambungan Pipa Polyethylene",
              shortTitle: "Penyambungan PE",
            },
            startDate: "2024-03-15",
            endDate: "2024-03-20",
            location: "Jakarta",
            seats: 20,
            available: 15,
            status: "OPEN",
            price: 2500000,
            description:
              "Pelatihan operator penyambungan pipa polyethylene dengan metode butt fusion dan electro fusion.",
          },
          {
            id: 2,
            courseId: 2,
            course: {
              id: 2,
              title: "Operator Penyambungan Pipa Galvanis",
              shortTitle: "Penyambungan Galvanis",
            },
            startDate: "2024-03-25",
            endDate: "2024-03-30",
            location: "Bandung",
            seats: 15,
            available: 8,
            status: "LIMITED",
            price: 2000000,
            description:
              "Pelatihan operator penyambungan pipa galvanis untuk instalasi gas bumi.",
          },
          {
            id: 3,
            courseId: 3,
            course: {
              id: 3,
              title: "Pemeriksa Mutu Kontruksi Pipa Polyethylene (PE)",
              shortTitle: "Inspeksi PE",
            },
            startDate: "2024-04-05",
            endDate: "2024-04-10",
            location: "Surabaya",
            seats: 12,
            available: 0,
            status: "FULL",
            price: 3000000,
            description:
              "Pelatihan pemeriksa mutu konstruksi pipa polyethylene sesuai standar.",
          },
          {
            id: 4,
            courseId: 4,
            course: {
              id: 4,
              title: "Pengoperasian Peralatan SPBG",
              shortTitle: "Operasi SPBG",
            },
            startDate: "2024-04-15",
            endDate: "2024-04-20",
            location: "Semarang",
            seats: 18,
            available: 18,
            status: "OPEN",
            price: 1800000,
            description:
              "Pelatihan pengoperasian peralatan SPBG (Stasiun Pengisian Bahan Bakar Gas).",
          },
          {
            id: 5,
            courseId: 5,
            course: {
              id: 5,
              title: "Inspeksi Stasiun Penyaluran Gas Bumi",
              shortTitle: "Inspeksi Gas",
            },
            startDate: "2024-04-25",
            endDate: "2024-04-30",
            location: "Yogyakarta",
            seats: 10,
            available: 3,
            status: "LIMITED",
            price: 2800000,
            description:
              "Pelatihan inspeksi stasiun penyaluran gas bumi untuk quality control.",
          },
          {
            id: 6,
            courseId: 6,
            course: {
              id: 6,
              title: "Pelaksana Komersialisasi Gas Bumi",
              shortTitle: "Komersialisasi Gas",
            },
            startDate: "2024-05-05",
            endDate: "2024-05-10",
            location: "Jakarta",
            seats: 15,
            available: 15,
            status: "OPEN",
            price: 3500000,
            description:
              "Pelatihan pelaksana komersialisasi gas bumi untuk analisis bisnis.",
          },
          {
            id: 7,
            courseId: 7,
            course: {
              id: 7,
              title: "Operator Pemeliharaan Metering Regulating Station",
              shortTitle: "Pemeliharaan MRS",
            },
            startDate: "2024-05-15",
            endDate: "2024-05-20",
            location: "Medan",
            seats: 12,
            available: 0,
            status: "FULL",
            price: 3200000,
            description:
              "Pelatihan operator pemeliharaan metering regulating station.",
          },
          {
            id: 8,
            courseId: 8,
            course: {
              id: 8,
              title: "Operator Pemeliharaan Bak Valve dan Ball Valve",
              shortTitle: "Pemeliharaan Valve",
            },
            startDate: "2024-05-25",
            endDate: "2024-05-30",
            location: "Palembang",
            seats: 14,
            available: 14,
            status: "OPEN",
            price: 2200000,
            description:
              "Pelatihan operator pemeliharaan bak valve dan ball valve.",
          },
        ];
        setSchedules(fallbackSchedules);
        setFilteredSchedules(fallbackSchedules);
      }

      // Fetch courses for filter dropdown
      const coursesResponse = await fetch("/api/courses");
      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json();
        console.log("Courses API Response:", coursesData);
        setCourses(coursesData.data || []);
      } else {
        console.log("Courses API response not ok, using fallback courses");
        // Fallback courses untuk filter
        const fallbackCourses = [
          {
            id: 1,
            title: "Operator Penyambungan Pipa Polyethylene",
            isActive: true,
          },
          {
            id: 2,
            title: "Operator Penyambungan Pipa Galvanis",
            isActive: true,
          },
          {
            id: 3,
            title: "Pemeriksa Mutu Kontruksi Pipa Polyethylene (PE)",
            isActive: true,
          },
          {
            id: 4,
            title: "Pengoperasian Peralatan SPBG",
            isActive: true,
          },
          {
            id: 5,
            title: "Inspeksi Stasiun Penyaluran Gas Bumi",
            isActive: true,
          },
          {
            id: 6,
            title: "Pelaksana Komersialisasi Gas Bumi",
            isActive: true,
          },
          {
            id: 7,
            title: "Operator Pemeliharaan Metering Regulating Station",
            isActive: true,
          },
          {
            id: 8,
            title: "Operator Pemeliharaan Bak Valve dan Ball Valve",
            isActive: true,
          },
        ];
        setCourses(fallbackCourses);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback data jika terjadi error
      const fallbackSchedules = [
        {
          id: 1,
          courseId: 1,
          course: {
            id: 1,
            title: "Operator Penyambungan Pipa Polyethylene",
            shortTitle: "Penyambungan PE",
          },
          startDate: "2024-03-15",
          endDate: "2024-03-20",
          location: "Jakarta",
          seats: 20,
          available: 15,
          status: "OPEN",
          price: 2500000,
          description:
            "Pelatihan operator penyambungan pipa polyethylene dengan metode butt fusion dan electro fusion.",
        },
        {
          id: 2,
          courseId: 2,
          course: {
            id: 2,
            title: "Operator Penyambungan Pipa Galvanis",
            shortTitle: "Penyambungan Galvanis",
          },
          startDate: "2024-03-25",
          endDate: "2024-03-30",
          location: "Bandung",
          seats: 15,
          available: 8,
          status: "LIMITED",
          price: 2000000,
          description:
            "Pelatihan operator penyambungan pipa galvanis untuk instalasi gas bumi.",
        },
        {
          id: 3,
          courseId: 3,
          course: {
            id: 3,
            title: "Pemeriksa Mutu Kontruksi Pipa Polyethylene (PE)",
            shortTitle: "Inspeksi PE",
          },
          startDate: "2024-04-05",
          endDate: "2024-04-10",
          location: "Surabaya",
          seats: 12,
          available: 0,
          status: "FULL",
          price: 3000000,
          description:
            "Pelatihan pemeriksa mutu konstruksi pipa polyethylene sesuai standar.",
        },
        {
          id: 4,
          courseId: 4,
          course: {
            id: 4,
            title: "Pengoperasian Peralatan SPBG",
            shortTitle: "Operasi SPBG",
          },
          startDate: "2024-04-15",
          endDate: "2024-04-20",
          location: "Semarang",
          seats: 18,
          available: 18,
          status: "OPEN",
          price: 1800000,
          description:
            "Pelatihan pengoperasian peralatan SPBG (Stasiun Pengisian Bahan Bakar Gas).",
        },
        {
          id: 5,
          courseId: 5,
          course: {
            id: 5,
            title: "Inspeksi Stasiun Penyaluran Gas Bumi",
            shortTitle: "Inspeksi Gas",
          },
          startDate: "2024-04-25",
          endDate: "2024-04-30",
          location: "Yogyakarta",
          seats: 10,
          available: 3,
          status: "LIMITED",
          price: 2800000,
          description:
            "Pelatihan inspeksi stasiun penyaluran gas bumi untuk quality control.",
        },
        {
          id: 6,
          courseId: 6,
          course: {
            id: 6,
            title: "Pelaksana Komersialisasi Gas Bumi",
            shortTitle: "Komersialisasi Gas",
          },
          startDate: "2024-05-05",
          endDate: "2024-05-10",
          location: "Jakarta",
          seats: 15,
          available: 15,
          status: "OPEN",
          price: 3500000,
          description:
            "Pelatihan pelaksana komersialisasi gas bumi untuk analisis bisnis.",
        },
        {
          id: 7,
          courseId: 7,
          course: {
            id: 7,
            title: "Operator Pemeliharaan Metering Regulating Station",
            shortTitle: "Pemeliharaan MRS",
          },
          startDate: "2024-05-15",
          endDate: "2024-05-20",
          location: "Medan",
          seats: 12,
          available: 0,
          status: "FULL",
          price: 3200000,
          description:
            "Pelatihan operator pemeliharaan metering regulating station.",
        },
        {
          id: 8,
          courseId: 8,
          course: {
            id: 8,
            title: "Operator Pemeliharaan Bak Valve dan Ball Valve",
            shortTitle: "Pemeliharaan Valve",
          },
          startDate: "2024-05-25",
          endDate: "2024-05-30",
          location: "Palembang",
          seats: 14,
          available: 14,
          status: "OPEN",
          price: 2200000,
          description:
            "Pelatihan operator pemeliharaan bak valve dan ball valve.",
        },
      ];
      setSchedules(fallbackSchedules);
      setFilteredSchedules(fallbackSchedules);

      const fallbackCourses = [
        {
          id: 1,
          title: "Operator Penyambungan Pipa Polyethylene",
          isActive: true,
        },
        {
          id: 2,
          title: "Operator Penyambungan Pipa Galvanis",
          isActive: true,
        },
        {
          id: 3,
          title: "Pemeriksa Mutu Kontruksi Pipa Polyethylene (PE)",
          isActive: true,
        },
        {
          id: 4,
          title: "Pengoperasian Peralatan SPBG",
          isActive: true,
        },
        {
          id: 5,
          title: "Inspeksi Stasiun Penyaluran Gas Bumi",
          isActive: true,
        },
        {
          id: 6,
          title: "Pelaksana Komersialisasi Gas Bumi",
          isActive: true,
        },
        {
          id: 7,
          title: "Operator Pemeliharaan Metering Regulating Station",
          isActive: true,
        },
        {
          id: 8,
          title: "Operator Pemeliharaan Bak Valve dan Ball Valve",
          isActive: true,
        },
      ];
      setCourses(fallbackCourses);
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
            style={{ backgroundColor: "#fcf400", color: "#FFFFFF" }}
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
            style={{ backgroundColor: "#fc7a006", color: "#FFFFFF" }}
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const filterVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-gray-50 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
              className="mt-4 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Memuat jadwal pelatihan...
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Jadwal Pelatihan
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Lihat dan daftar program pelatihan yang tersedia. Pilih jadwal yang
            sesuai dengan kebutuhan Anda.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.01 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <motion.div
                className="flex items-center space-x-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Filter className="w-5 h-5" />
                </motion.div>
                <CardTitle>Filter & Pencarian</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <motion.div
                  className="space-y-2"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label htmlFor="search">Cari Program</Label>
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </motion.div>
                    <motion.input
                      id="search"
                      placeholder="Cari program atau lokasi..."
                      value={filters.search}
                      onChange={(e) =>
                        handleFilterChange("search", e.target.value)
                      }
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </motion.div>

                {/* Course Filter */}
                <motion.div
                  className="space-y-2"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Label htmlFor="course">Program Pelatihan</Label>
                  <motion.select
                    id="course"
                    value={filters.course}
                    onChange={(e) =>
                      handleFilterChange("course", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="">Semua Program</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </motion.select>
                </motion.div>

                {/* Status Filter */}
                <motion.div
                  className="space-y-2"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Label htmlFor="status">Status Ketersediaan</Label>
                  <motion.select
                    id="status"
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="">Semua Status</option>
                    <option value="available">Tersedia</option>
                    <option value="limited">Terbatas</option>
                    <option value="full">Penuh</option>
                    <option value="closed">Ditutup</option>
                    <option value="cancelled">Dibatalkan</option>
                  </motion.select>
                </motion.div>

                {/* Clear Filters */}
                <motion.div
                  className="space-y-2"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Label>&nbsp;</Label>
                  <motion.button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Bersihkan Filter
                  </motion.button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            Menampilkan{" "}
            <motion.span
              className="font-semibold"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              {filteredSchedules.length}
            </motion.span>{" "}
            jadwal pelatihan
            {filters.course || filters.status || filters.search
              ? " (difilter)"
              : ""}
          </motion.p>
        </motion.div>

        {/* FullCalendar Component */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.01 }}
        >
          {console.log(
            "Rendering FullCalendar with schedules:",
            filteredSchedules
          )}
          <FullCalendarSchedule schedules={filteredSchedules} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScheduleSection;
