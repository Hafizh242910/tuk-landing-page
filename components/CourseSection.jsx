"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import CourseDetailModal from "./CourseDetailModal";

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          const activeCourses =
            data.data?.filter((course) => course.isActive) || [];
          setCourses(activeCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Fallback to default courses if API fails
        setCourses([
          {
            id: 1,
            title: "Operator Penyambungan Pipa Polyethylene",
            category: "penyambungan",
            competencies:
              "Menerapkan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat ukur\nMenyambung Pipa dengan metode Butt Fusion (BF)\nMenyambung Pipa dengan metode Electro Fusion (EF)",
          },
          {
            id: 2,
            title: "Operator Penyambungan Pipa Galvanis",
            category: "penyambungan",
            competencies:
              "Menerapkan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat ukur\nMenyambung Pipa Galvanis",
          },
          {
            id: 3,
            title: "Pemeriksa Mutu Kontruksi Pipa Polyethylene (PE)",
            category: "inspeksi",
            competencies:
              "Menerapakan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja\nMembaca Gambar Teknik\nMengukur Dengan Menggunakan Alat ukur\nMemeriksa Mutu Pemasangan Pipa Instalasi Gas Bumi Material Pipa Galvanis dan Pipa Multilayer\nMembuat Laporan Pemasangan Pipa",
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

  const filteredCourses =
    activeTab === "all"
      ? courses
      : courses.filter((course) => course.category === activeTab);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat program pelatihan...</p>
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
            Program Pelatihan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih program pelatihan yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Program Counter */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Menampilkan{" "}
            <span className="text-blue-600 font-semibold">
              {filteredCourses.length}
            </span>{" "}
            dari {courses.length} program pelatihan
          </p>
        </div>

        {/* Course Cards */}
        <div className="space-y-6">
          {filteredCourses.map((course) => {
            const competencies = course.competencies
              ? course.competencies.split("\n").filter((item) => item.trim())
              : [];

            return (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto"
              >
                {/* Course Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {course.title}
                </h2>

                {/* Competencies Section */}
                {competencies.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-base font-normal text-gray-800 mb-4">
                      Kompetensi yang Dicapai:
                    </h3>
                    <ul className="space-y-2">
                      {competencies.map((competency, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-3 text-gray-700"
                        >
                          <div className="w-[6px] h-[6px] bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{competency}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleViewDetail(course)}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
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
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada program pelatihan
            </h3>
            <p className="text-gray-600">
              Program pelatihan akan segera tersedia.
            </p>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CoursePage;
