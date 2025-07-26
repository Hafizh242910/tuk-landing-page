"use client";
import { useState, useEffect } from "react";

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
            objectives: [
              "Menerapkan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja",
              "Membaca Gambar Teknik",
              "Mengukur Dengan Menggunakan Alat ukur",
              "Menyambung Pipa dengan metode Butt Fusion (BF)",
              "Menyambung Pipa dengan metode Electro Fusion (EF)",
            ],
          },
          {
            id: 2,
            title: "Operator Penyambungan Pipa Galvanis",
            category: "penyambungan",
            objectives: [
              "Menerapkan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja",
              "Membaca Gambar Teknik",
              "Mengukur Dengan Menggunakan Alat ukur",
              "Menyambung Pipa Galvanis",
            ],
          },
          {
            id: 3,
            title: "Pemeriksa Mutu Kontruksi Pipa Polyethylene (PE)",
            category: "inspeksi",
            objectives: [
              "Menerapakan Keselamatan dan Kesehatan Kerja dan Lingkungan di Tempat Kerja",
              "Membaca Gambar Teknik",
              "Mengukur Dengan Menggunakan Alat ukur",
              "Memeriksa Mutu Pemasangan Pipa Instalasi Gas Bumi Material Pipa Galvanis dan Pipa Multilayer",
              "Membuat Laporan Pemasangan Pipa",
            ],
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat program pelatihan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              KEGIATAN PELATIHAN DAN SERTIFIKASI BIDANG GAS BUMI
            </h1>
            <p className="text-base md:text-lg text-blue-100 max-w-3xl mx-auto px-4">
              Program sertifikasi kompetensi sesuai standar (SKKNI) untuk
              mengembangkan SDM profesional di bidang gas bumi Indonesia
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="py-4 md:py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 md:px-6 md:py-3 rounded-lg font-medium text-xs md:text-base transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="block md:inline">{tab.name}</span>
                <span className="ml-1 md:ml-2 px-1.5 py-0.5 md:px-2 md:py-1 text-xs rounded-full bg-white/20">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Results Count */}
            <div className="mb-6 md:mb-8 text-center">
              <p className="text-gray-600 text-sm md:text-base">
                Menampilkan{" "}
                <span className="font-semibold text-blue-600">
                  {filteredCourses.length}
                </span>{" "}
                dari <span className="font-semibold">{courses.length}</span>{" "}
                program pelatihan
              </p>
            </div>

            {filteredCourses.length > 0 ? (
              <div className="space-y-6 md:space-y-8">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 leading-tight flex-1">
                        {course.title}
                      </h3>
                      <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {course.category}
                      </span>
                    </div>

                    {course.shortTitle && (
                      <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                        {course.shortTitle}
                      </p>
                    )}

                    {course.description && (
                      <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                        {course.description}
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-6">
                      {course.duration && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Durasi:</span>
                          <span>{course.duration}</span>
                        </div>
                      )}
                      {course.price && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium mr-2">Biaya:</span>
                          <span>Rp {course.price.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 text-sm md:text-base">
                        Lihat Detail
                      </button>
                      <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-300 text-sm md:text-base">
                        Daftar Sekarang
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada program yang ditemukan
                </h3>
                <p className="text-gray-500">
                  Coba pilih kategori lain atau hubungi kami untuk informasi
                  lebih lanjut.
                </p>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-8 md:mt-16 text-center bg-blue-50 rounded-lg p-6 md:p-8">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                Tidak Menemukan Program yang Sesuai?
              </h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base max-w-2xl mx-auto">
                Hubungi kami untuk konsultasi program pelatihan yang sesuai
                dengan kebutuhan Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-sm md:text-base">
                  Konsultasi Gratis
                </button>
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-sm md:text-base">
                  Download Brosur
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
