"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import CourseDetailModal from "./CourseDetailModal";
import { motion } from "framer-motion";

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data);
          const activeCourses =
            data.data?.filter((course) => course.isActive) || [];
          console.log("Active Courses:", activeCourses);
          setCourses(activeCourses);
        } else {
          console.log("API response not ok, using fallback data");
          // Fallback data jika API tidak tersedia
          setCourses([
            {
              id: 1,
              title: "Operator Penyambungan Pipa Polyethylene",
              category: "penyambungan",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat ukur\nMenyambung Pipa dengan metode Butt Fusion (BF)\nMenyambung Pipa dengan metode Electro Fusion (EF)",
            },
            {
              id: 2,
              title: "Operator Penyambungan Pipa Galvanis",
              category: "penyambungan",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat ukur\nMenyambung Pipa Galvanis",
            },
            {
              id: 3,
              title: "Pemeriksa Mutu Kontruksi Pipa Polyethylene (PE)",
              category: "inspeksi",
              isActive: true,
              competencies:
                "Menerapakan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat ukur\nMemeriksa Mutu Pemasangan Pipa Instalasi Gas Bumi Material Pipa Galvanis dan Pipa Multilayer\nMembuat Laporan Pemasangan Pipa",
            },
            {
              id: 4,
              title: "Pengoperasian Peralatan SPBG",
              category: "operasional",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan dan Kesehatan Kerja\nMengoperasikan Peralatan SPBG\nMelakukan Pemeriksaan dan Pemeliharaan\nMengatasi Gangguan Operasional",
            },
            {
              id: 5,
              title: "Inspeksi Stasiun Penyaluran Gas Bumi",
              category: "inspeksi",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan dan Kesehatan Kerja\nMelakukan Inspeksi Visual\nMenggunakan Alat Ukur dan Testing\nMembuat Laporan Inspeksi",
            },
            {
              id: 6,
              title: "Pelaksana Komersialisasi Gas Bumi",
              category: "operasional",
              isActive: true,
              competencies:
                "Memahami Regulasi Gas Bumi\nMelakukan Analisis Komersial\nMengelola Kontrak Gas Bumi\nMelakukan Negosiasi Komersial",
            },
            {
              id: 7,
              title: "Operator Pemeliharaan Metering Regulating Station",
              category: "operasional",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan Kerja\nMelakukan Pemeliharaan Preventif\nMengoperasikan Sistem Metering\nMengatasi Gangguan Sistem",
            },
            {
              id: 8,
              title: "Operator Pemeliharaan Bak Valve dan Ball Valve",
              category: "operasional",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan Kerja\nMelakukan Pemeliharaan Valve\nMenggunakan Alat Ukur Tekanan\nMembuat Laporan Pemeliharaan",
            },
            {
              id: 9,
              title: "Operator Penyambungan Pipa Multilayer",
              category: "penyambungan",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan Kerja\nMembaca Gambar Teknik\nMenyambung Pipa Multilayer\nMelakukan Quality Control",
            },
            {
              id: 10,
              title: "Perancang Design Pipa Instalasi Gas Bumi",
              category: "design",
              isActive: true,
              competencies:
                "Membaca dan Membuat Gambar Teknik\nMenghitung Tekanan dan Aliran\nMerancang Sistem Pipa\nMembuat Dokumentasi Teknis",
            },
            {
              id: 11,
              title: "Operator Monitoring Sistem Proteksi Katodik",
              category: "monitoring",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan Kerja\nMengoperasikan Sistem Proteksi Katodik\nMelakukan Monitoring Parameter\nMengatasi Gangguan Sistem",
            },
            {
              id: 12,
              title: "Pemeriksa Sistem Alat Ukur Serah Terima (SAUST)",
              category: "inspeksi",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan Kerja\nMelakukan Kalibrasi Alat Ukur\nMembaca dan Menganalisis Data\nMembuat Laporan Pemeriksaan",
            },
            {
              id: 13,
              title: "Operator Patroli dan Leak Survey",
              category: "monitoring",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan Kerja\nMelakukan Patroli Rutin\nMenggunakan Alat Deteksi Kebocoran\nMembuat Laporan Patroli",
            },
            {
              id: 14,
              title: "Floor Warden",
              category: "lainnya",
              isActive: true,
              competencies:
                "Menerapkan Keselamatan Kerja\nMelakukan Evakuasi Darurat\nMengkoordinasikan Tim Tanggap Darurat\nMelakukan Pelatihan Keselamatan",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Fallback data jika terjadi error
        setCourses([
          {
            id: 1,
            title: "Operator Penyambungan Pipa Polyethylene",
            category: "penyambungan",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat ukur\nMenyambung Pipa dengan metode Butt Fusion (BF)\nMenyambung Pipa dengan metode Electro Fusion (EF)",
          },
          {
            id: 2,
            title: "Operator Penyambungan Pipa Galvanis",
            category: "penyambungan",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat ukur\nMenyambung Pipa Galvanis",
          },
          {
            id: 3,
            title: "Pemeriksa Mutu Kontruksi Pipa Polyethylene (PE)",
            category: "inspeksi",
            isActive: true,
            competencies:
              "Menerapakan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat ukur\nMemeriksa Mutu Pemasangan Pipa Instalasi Gas Bumi Material Pipa Galvanis dan Pipa Multilayer\nMembuat Laporan Pemasangan Pipa",
          },
          {
            id: 4,
            title: "Pengoperasian Peralatan SPBG",
            category: "operasional",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan dan Kesehatan Kerja\nMengoperasikan Peralatan SPBG\nMelakukan Pemeriksaan dan Pemeliharaan\nMengatasi Gangguan Operasional",
          },
          {
            id: 5,
            title: "Inspeksi Stasiun Penyaluran Gas Bumi",
            category: "inspeksi",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan dan Kesehatan Kerja\nMelakukan Inspeksi Visual\nMenggunakan Alat Ukur dan Testing\nMembuat Laporan Inspeksi",
          },
          {
            id: 6,
            title: "Pelaksana Komersialisasi Gas Bumi",
            category: "operasional",
            isActive: true,
            competencies:
              "Memahami Regulasi Gas Bumi\nMelakukan Analisis Komersial\nMengelola Kontrak Gas Bumi\nMelakukan Negosiasi Komersial",
          },
          {
            id: 7,
            title: "Operator Pemeliharaan Metering Regulating Station",
            category: "operasional",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan Kerja\nMelakukan Pemeliharaan Preventif\nMengoperasikan Sistem Metering\nMengatasi Gangguan Sistem",
          },
          {
            id: 8,
            title: "Operator Pemeliharaan Bak Valve dan Ball Valve",
            category: "operasional",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan Kerja\nMelakukan Pemeliharaan Valve\nMenggunakan Alat Ukur Tekanan\nMembuat Laporan Pemeliharaan",
          },
          {
            id: 9,
            title: "Operator Penyambungan Pipa Multilayer",
            category: "penyambungan",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan Kerja\nMembaca Gambar Teknik\nMenyambung Pipa Multilayer\nMelakukan Quality Control",
          },
          {
            id: 10,
            title: "Perancang Design Pipa Instalasi Gas Bumi",
            category: "design",
            isActive: true,
            competencies:
              "Membaca dan Membuat Gambar Teknik\nMenghitung Tekanan dan Aliran\nMerancang Sistem Pipa\nMembuat Dokumentasi Teknis",
          },
          {
            id: 11,
            title: "Operator Monitoring Sistem Proteksi Katodik",
            category: "monitoring",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan Kerja\nMengoperasikan Sistem Proteksi Katodik\nMelakukan Monitoring Parameter\nMengatasi Gangguan Sistem",
          },
          {
            id: 12,
            title: "Pemeriksa Sistem Alat Ukur Serah Terima (SAUST)",
            category: "inspeksi",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan Kerja\nMelakukan Kalibrasi Alat Ukur\nMembaca dan Menganalisis Data\nMembuat Laporan Pemeriksaan",
          },
          {
            id: 13,
            title: "Operator Patroli dan Leak Survey",
            category: "monitoring",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan Kerja\nMelakukan Patroli Rutin\nMenggunakan Alat Deteksi Kebocoran\nMembuat Laporan Patroli",
          },
          {
            id: 14,
            title: "Floor Warden",
            category: "lainnya",
            isActive: true,
            competencies:
              "Menerapkan Keselamatan Kerja\nMelakukan Evakuasi Darurat\nMengkoordinasikan Tim Tanggap Darurat\nMelakukan Pelatihan Keselamatan",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Create tabs based on available categories
  const getTabs = () => {
    const categories = [...new Set(courses.map((course) => course.category))];
    const tabs = [{ id: "all", name: "Semua Program", count: courses.length }];

    categories.forEach((category) => {
      const count = courses.filter((c) => c.category === category).length;
      const categoryNames = {
        penyambungan: "Penyambungan Pipa",
        inspeksi: "Inspeksi & Quality Control",
        operasional: "Operasional & Pemeliharaan",
        monitoring: "Monitoring & Proteksi",
        design: "Design & Engineering",
        lainnya: "Lainnya",
      };

      tabs.push({
        id: category,
        name: categoryNames[category] || category,
        count: count,
      });
    });

    return tabs;
  };

  const tabs = getTabs();

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeTab === "all" || course.category === activeTab;
    const matchesSearch =
      searchTerm === "" ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.competencies &&
        course.competencies.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleDownloadBrochure = (brochureUrl, courseTitle) => {
    if (brochureUrl) {
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = `brosur-${courseTitle
        .replace(/\s+/g, "-")
        .toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleViewDetail = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const competencyVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.05,
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
              Memuat program pelatihan...
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
            Program Pelatihan
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Pilih program pelatihan yang sesuai dengan kebutuhan Anda
          </motion.p>
        </motion.div>

        {/* Program Counter */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Menampilkan{" "}
            <motion.span
              className="text-blue-600 font-semibold"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {filteredCourses.length}
            </motion.span>{" "}
            dari {courses.length} program pelatihan
          </motion.p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Search Bar */}
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari program pelatihan..."
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-300"
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.9 + index * 0.1,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.name}
                <span className="ml-2 text-xs opacity-75">({tab.count})</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Clear Filters */}
          {(activeTab !== "all" || searchTerm) && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => {
                  setActiveTab("all");
                  setSearchTerm("");
                }}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Bersihkan Filter
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Course Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredCourses.map((course, index) => {
            const competencies = course.competencies
              ? course.competencies
                  .split("\n")
                  .filter((item) => item.trim())
                  .slice(0, 3)
              : [];

            return (
              <motion.div
                key={course.id}
                className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.7 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* Course Title */}
                <motion.h2
                  className="text-xl font-bold text-gray-900 mb-4 flex-grow"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  {course.title}
                </motion.h2>

                {/* Category Badge */}
                <motion.div
                  className="mb-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      course.category === "penyambungan"
                        ? "bg-blue-100 text-blue-800"
                        : course.category === "inspeksi"
                        ? "bg-green-100 text-green-800"
                        : course.category === "operasional"
                        ? "bg-purple-100 text-purple-800"
                        : course.category === "monitoring"
                        ? "bg-orange-100 text-orange-800"
                        : course.category === "design"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {course.category === "penyambungan"
                      ? "Penyambungan"
                      : course.category === "inspeksi"
                      ? "Inspeksi"
                      : course.category === "operasional"
                      ? "Operasional"
                      : course.category === "monitoring"
                      ? "Monitoring"
                      : course.category === "design"
                      ? "Design"
                      : "Lainnya"}
                  </span>
                </motion.div>

                {/* Competencies Section */}
                {competencies.length > 0 && (
                  <motion.div
                    className="mb-4 flex-grow"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  >
                    <motion.h3
                      className="text-sm font-medium text-gray-800 mb-3"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
                    >
                      Kompetensi Utama:
                    </motion.h3>
                    <motion.ul className="space-y-1">
                      {competencies.map((competency, compIndex) => (
                        <motion.li
                          key={compIndex}
                          className="flex items-start space-x-2 text-gray-600 text-sm"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 1.1 + index * 0.1 + compIndex * 0.05,
                          }}
                        >
                          <motion.div
                            className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              duration: 0.2,
                              delay: 1.2 + index * 0.1 + compIndex * 0.05,
                            }}
                          />
                          <span className="line-clamp-2">{competency}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                    {course.competencies &&
                      course.competencies.split("\n").length > 3 && (
                        <motion.p
                          className="text-xs text-blue-600 mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 1.3 + index * 0.1,
                          }}
                        >
                          +{course.competencies.split("\n").length - 3}{" "}
                          kompetensi lainnya
                        </motion.p>
                      )}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  className="mt-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                >
                  <motion.button
                    onClick={() => handleViewDetail(course)}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    Lihat Detail
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-gray-400 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </motion.svg>
            </motion.div>
            <motion.h3
              className="text-lg font-medium text-gray-900 mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Tidak ada program pelatihan
            </motion.h3>
            <motion.p
              className="text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Program pelatihan akan segera tersedia.
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </motion.div>
  );
};

export default CoursePage;
