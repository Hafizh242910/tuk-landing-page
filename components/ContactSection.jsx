"use client";

import { useState, useEffect } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          const activeCourses =
            data.data?.filter((course) => course.isActive) || [];
          setPrograms(activeCourses);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
        // Fallback to default programs if API fails
        setPrograms([
          "Gas Safety Level 1",
          "Gas Safety Level 2",
          "Gas Safety Level 3",
          "Process Plant Operations",
          "Pipeline Installation",
          "Gas Distribution System",
          "Safety Management System",
          "Emergency Response",
          "Welding & Fabrication",
          "Instrumentation & Control",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      program: "",
      message: "",
    });
  };

  return (
    <div className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Hubungi Kami
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Siap membantu Anda dalam meningkatkan kompetensi dan karir di
            industri gas
          </p>
        </div>

        {/* Contact Content - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 order-2 lg:order-1">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
              Informasi Kontak
            </h3>

            {/* Address */}
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 md:mr-4">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  Alamat
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Jl. Training Center No. 123
                  <br />
                  Jakarta Selatan, DKI Jakarta 12345
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 md:mr-4">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  Telepon
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  +62 21 1234 5678
                  <br />
                  +62 812 3456 7890
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start mb-6 md:mb-8">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 md:mr-4">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  Email
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  info@tukpgas.com
                  <br />
                  training@tukpgas.com
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
                Jam Operasional
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm md:text-base text-gray-600">
                    Senin - Jumat
                  </span>
                  <span className="text-sm md:text-base text-gray-900 font-medium">
                    08:00 - 17:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm md:text-base text-gray-600">
                    Sabtu - Minggu
                  </span>
                  <span className="text-sm md:text-base text-gray-900 font-medium">
                    Tutup
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 order-1 lg:order-2">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
              Kirim Pesan
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm md:text-base"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="nama@email.com"
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm md:text-base"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  No. Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="08123456789"
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm md:text-base"
                  required
                />
              </div>

              {/* Program */}
              <div>
                <label
                  htmlFor="program"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Program Pelatihan
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm md:text-base"
                  required
                  disabled={loading}
                >
                  <option value="">
                    {loading ? "Memuat program..." : "Pilih program pelatihan"}
                  </option>
                  {programs.map((program, index) => (
                    <option
                      key={index}
                      value={
                        typeof program === "string" ? program : program.title
                      }
                    >
                      {typeof program === "string" ? program : program.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tuliskan pesan atau pertanyaan Anda..."
                  rows={4}
                  className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical text-sm md:text-base"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-300 text-sm md:text-base"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
