"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
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

  const handleWhatsAppClick = () => {
    const phoneNumber = "6281287992089"; // Ganti dengan nomor WhatsApp yang benar
    const message =
      "Halo, saya tertarik dengan program pelatihan TUK PGAS SOLUTION. Mohon informasi lebih lanjut.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
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

  const contactInfoVariants = {
    hidden: { x: 30, opacity: 0 },
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

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
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

  return (
    <motion.div
      className="py-8 md:py-16 bg-gray-50"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Hubungi Kami
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4"
            variants={itemVariants}
          >
            Siap membantu Anda dalam meningkatkan kompetensi dan karir di
            industri gas
          </motion.p>
        </motion.div>

        {/* Contact Content - Single Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp Contact Card */}

          {/* Contact Information */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 md:p-8"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8"
              variants={contactInfoVariants}
              custom={0}
            >
              Informasi Kontak Lengkap
            </motion.h3>

            {/* Address */}
            <motion.div
              className="flex items-start mb-6"
              variants={contactInfoVariants}
              custom={1}
            >
              <motion.div
                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 md:mr-4"
                variants={iconVariants}
                whileHover="hover"
              >
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
              </motion.div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  Alamat
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Jl. Swadaya PLN No.6, RT 09/ RW 02, Jatinegara
                  <br />
                  Cakung, Jakarta Timur 13930
                </p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              className="flex items-start mb-6"
              variants={contactInfoVariants}
              custom={2}
            >
              <motion.div
                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 md:mr-4"
                variants={iconVariants}
                whileHover="hover"
              >
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
              </motion.div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  Telepon
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  +62 812 8799 2089
                </p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              className="flex items-start mb-6 md:mb-8"
              variants={contactInfoVariants}
              custom={3}
            >
              <motion.div
                className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3 md:mr-4"
                variants={iconVariants}
                whileHover="hover"
              >
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
              </motion.div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  Email
                </h4>
                <p className="text-sm md:text-base text-gray-600">
                  info.tuk@pgnsolution.co.id
                </p>
              </div>
            </motion.div>

            {/* Operating Hours */}
            <motion.div variants={contactInfoVariants} custom={4}>
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
                Jam Operasional
              </h4>
              <div className="space-y-2">
                <motion.div
                  className="flex justify-between"
                  variants={contactInfoVariants}
                  custom={5}
                >
                  <span className="text-sm md:text-base text-gray-600">
                    Senin - Jumat
                  </span>
                  <span className="text-sm md:text-base text-gray-900 font-medium">
                    08:00 - 17:00
                  </span>
                </motion.div>
                <motion.div
                  className="flex justify-between"
                  variants={contactInfoVariants}
                  custom={6}
                >
                  <span className="text-sm md:text-base text-gray-600">
                    Sabtu - Minggu
                  </span>
                  <span className="text-sm md:text-base text-gray-900 font-medium">
                    Tutup
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg h-full p-6 md:p-8 mb-8"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                variants={iconVariants}
                whileHover="hover"
              >
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </motion.div>

              <motion.h3
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Hubungi Kami via WhatsApp
              </motion.h3>

              <motion.p
                className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Dapatkan informasi lengkap tentang program pelatihan, jadwal,
                dan pendaftaran langsung melalui WhatsApp kami. Tim kami siap
                membantu Anda 24/7.
              </motion.p>

              <motion.button
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-300 text-lg flex items-center justify-center mx-auto space-x-3"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span>Chat WhatsApp Sekarang</span>
              </motion.button>

              <motion.p
                className="text-sm text-gray-500 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Respon cepat dalam 5 menit
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactSection;
