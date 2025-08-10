"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AboutSeciton = () => {
  const pathname = usePathname();
  const [orgStructure, setOrgStructure] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrgStructure = async () => {
      try {
        const response = await fetch("/api/organizational-structure");
        if (response.ok) {
          const data = await response.json();
          setOrgStructure(data.data || []);
        } else {
          console.log("API response not ok, using fallback data");
          // Fallback data jika API tidak tersedia
          setOrgStructure([
            {
              id: 1,
              name: "Sabaruddin",
              position: "Direktur Utama PT PGAS Solution",
              department: "Direksi",
              photo: null,
            },
            {
              id: 2,
              name: "Ariadi",
              position: "Direktur Keuangan & Dukungan Bisnis",
              department: "Direksi",
              photo: null,
            },
            {
              id: 3,
              name: "Honiyana",
              position: "Division Head HCM",
              department: "Manajemen",
              photo: null,
            },
            {
              id: 4,
              name: "Samuel Endrico",
              position: "Ketua TUK",
              department: "Manajemen",
              photo: null,
            },
            {
              id: 5,
              name: "Octavia Permatasari",
              position: "Fungsi Pemasaran",
              department: "Fungsi",
              photo: null,
            },
            {
              id: 6,
              name: "Nurhani Dwi Ningsih",
              position: "Fungsi Mutu",
              department: "Fungsi",
              photo: null,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching organizational structure:", error);
        // Fallback data jika terjadi error
        setOrgStructure([
          {
            id: 1,
            name: "Sabaruddin",
            position: "Direktur Utama PT PGAS Solution",
            department: "Direksi",
            photo: null,
          },
          {
            id: 2,
            name: "Ariadi",
            position: "Direktur Keuangan & Dukungan Bisnis",
            department: "Direksi",
            photo: null,
          },
          {
            id: 3,
            name: "Honiyana",
            position: "Division Head HCM",
            department: "Manajemen",
            photo: null,
          },
          {
            id: 4,
            name: "Samuel Endrico",
            position: "Ketua TUK",
            department: "Manajemen",
            photo: null,
          },
          {
            id: 5,
            name: "Octavia Permatasari",
            position: "Fungsi Pemasaran",
            department: "Fungsi",
            photo: null,
          },
          {
            id: 6,
            name: "Nurhani Dwi Ningsih",
            position: "Fungsi Mutu",
            department: "Fungsi",
            photo: null,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgStructure();
  }, []);

  const lspLogos = [
    { name: "LSP Pertamina", logo: "/lsp-pertamina.png" },
    { name: "LSP Pelatinas", logo: "/lsp-pelatinas.png" },
    { name: "LSP Energi", logo: "/lsp-energi.png" },
    { name: "LSP K3 ICCOSH", logo: "/lsp-lsk-k3-iccosh.png" },
    { name: "LSP PGN", logo: "/lsp-pgn.png" },
  ];

  const clientLogos = [
    { name: "PIJ", logo: "/client/PIJ.png" },
    { name: "Pelindo", logo: "/client/pelindo.jpeg" },
    { name: "Kian Santang", logo: "/client/kian santang.png" },
    { name: "Perta Daya Gas", logo: "/client/perta daya gas.png" },
    {
      name: "Energi Trada Nusantara",
      logo: "/client/energi trada nusantara.jpeg",
    },
    { name: "WAP", logo: "/client/wap.jpeg" },
    { name: "Yogyakarta", logo: "/client/yogyakarta.png" },
    {
      name: "PT Mandiri Berkat Abadi",
      logo: "/client/pt mandiri berkat abadi.png",
    },
    {
      name: "Pemerintahan Daerah Kulon Progo",
      logo: "/client/permerintahan daerah kulon probo.png",
    },
    { name: "PGN LNG", logo: "/client/PGN LNG.png" },
    { name: "Sena", logo: "/client/Sena.png" },
    {
      name: "Pertamina Nusantara Regas",
      logo: "/client/pertamina nusantara regas.jpeg",
    },
    { name: "Pertamina Retail", logo: "/client/Pertamina Retail.png" },
    { name: "DKI Jakarta", logo: "/client/dki.png" },
    { name: "PGN GAGAS", logo: "/client/PGN GAGAS.png" },
    { name: "Prabhu", logo: "/client/Prabhu.jpeg" },
    {
      name: "Pertamina Kilang Pertamina Internasional",
      logo: "/client/Pertamina Kilang Pertamina Internasional.png",
    },
    { name: "Pertamina Gas", logo: "/client/PertaminaGas.jpeg" },
    { name: "Perkasa", logo: "/client/Perkasa.jpeg" },
  ];

  const testimonials = [
    {
      name: "Hendrati Heni Kenyati, S.P., M.M.",
      position: "Kasie Pelatihan Kerja BLKPP DIY",
      message:
        "Pelatihan Penyambungan Pipa Polyethylene dan Penyambungan Pipa Galvanis Kolaborasi antara Disnakertrans DIY dengan PT PGAS Solution sangat diminati oleh masyarakat DIY, terbukti di batch 1 terdapat 297 pendaftar dan batch 2 terdapat 174 pendaftar, sedangkan kuota peserta hanya 30 orang di setiap batch. Pelatihan yang singkat dengan materi yang sangat padat serta dilanjutkan dengan uji kompetensi, sangat menguras tenaga para peserta, namun selama 5 hari peserta dapat menyelesaikan dengan baik. Total 60 orang peserta yang telah melaksanakan pelatihan dan sertifikasi, semoga segera terserap di dunia kerja sehingga dapat mengurangi angka pengguran di DIY",
      photo: null,
    },
    {
      name: "Pidhekso Pria Pityantoko",
      position:
        "Peserta Pelatihan & Sertifikasi Operator Penyambungan Pipa Polyethylene Batch 2 di BLKPP DIY",
      message:
        "Saya mengucapkan terima kasih kepada PT PGAS Solution untuk penyelenggaraan pelatihan dan sertifikasi operator penyambungan pipa Polyethylene, semoga proyek jangka di daerah Yogyakarta dapat terlaksana serta dapat menambah ilmu bagi warga Yogyakarta",
      photo: null, // Will use placeholder avatar
    },
  ];

  const partnerships = [
    {
      type: "Universitas",
      items: [
        "Universitas Indonesia",
        "Institut Teknologi Bandung",
        "Universitas Gadjah Mada",
        "Institut Teknologi Sepuluh Nopember",
      ],
    },
    {
      type: "Lembaga Sertifikasi",
      items: ["BNSP", "TUV Rheinland", "SGS", "Bureau Veritas"],
    },
    {
      type: "Asosiasi Industri",
      items: ["IATMI", "IAGI", "PERHAPI", "Asosiasi Migas Indonesia"],
    },
  ];

  const organizationStructure = {
    executives: [
      { position: "Direktur Utama PT PGAS Solution", name: "Sabaruddin" },
      { position: "Direktur Keuangan & Dukungan Bisnis", name: "Ariadi" },
    ],
    management: [
      { position: "Division Head HCM", name: "Honiyana" },
      { position: "Ketua TUK", name: "Samuel Endrico" },
    ],
    functions: [
      { position: "Fungsi Operasional", name: "" },
      { position: "Fungsi Pemasaran", name: "Octavia Permatasari" },
      { position: "Fungsi Mutu", name: "Nurhani Dwi Ningsih" },
      { position: "Fungsi Administrasi", name: "Sani Maulina Rahman" },
      { position: "Fungsi Keuangan", name: "Chriyo Hatyanto" },
    ],
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.05,
        ease: "easeOut",
      },
    }),
  };

  const testimonialVariants = {
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

  return (
    <motion.div
      className="py-8 md:py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Tentang Kami
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            PGAS Training Center adalah lembaga pelatihan terkemuka di bidang
            Oil & Gas dengan pengalaman lebih dari 15 tahun
          </motion.p>
        </motion.div>

        {/* Profil Section */}
        <motion.div
          className="mb-12 md:mb-20"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ x: 10 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                Profil Perusahaan
              </h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
                <motion.p
                  className="text-justify"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  PGAS Training Center didirikan pertama kali pada tanggal 1
                  November 2016 dengan mendapatkan Lisensi dari Badan Nasional
                  Sertifikasi Profesi (BNSP).
                </motion.p>
                <motion.p
                  className="text-justify"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Merupakan Lembaga yang memberikan fasilitas pelaksanaan Uji
                  Kompetensi, yang dilakukan oleh LSP dan dibentuk oleh PT PGAS
                  Solution sebagai salah satu anak perusahaan PT Perusahaan Gas
                  Negara (Tbk), serta menyediakan fasilitas pelatihan untuk
                  persiapan Uji Kompetensi.
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              className="relative order-first lg:order-last"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-blue-600 rounded-lg p-6 md:p-8 text-white">
                <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                  Lini Bisnis Utama
                </h4>
                <div className="space-y-3 md:space-y-4">
                  <ul className="list-disc list-outside space-y-2 md:space-y-3 pl-4">
                    <li className="text-blue-100 text-sm md:text-base leading-relaxed text-justify">
                      Memberikan fasilitas pelaksanaan Uji Kompetensi yang valid
                      dan sesuai dengan konteks lingkungan serta sarana
                      prasarana di tempat kerja sesuai skema sertifikasi yang
                      telah ditentukan.
                    </li>
                    <li className="text-blue-100 text-sm md:text-base leading-relaxed text-justify">
                      Menyediakan fasilitas pelatihan yang memadai untuk
                      persiapan Uji Kompetensi.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Struktur Organisasi - Sekarang muncul di semua halaman */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Struktur Organisasi TUK LSP PGN
          </motion.h3>
          <motion.p
            className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base px-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Sesuai Pedoman Persyaratan Umum Tempat Uji Kompetensi BNSP 206 Tahun
            2014
          </motion.p>

          {/* Loading State */}
          {loading && (
            <motion.div
              className="flex justify-center items-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="ml-3 text-gray-600">
                Memuat struktur organisasi...
              </span>
            </motion.div>
          )}

          {/* Dynamic Organizational Structure from API */}
          {!loading && orgStructure.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {orgStructure.map((structure, index) => (
                <motion.div
                  key={structure.id}
                  className="bg-white rounded-lg p-6 text-center shadow-lg"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {/* Photo */}
                  <div className="mb-4">
                    {structure.photo ? (
                      <Image
                        src={structure.photo}
                        alt={structure.name || structure.title}
                        width={120}
                        height={120}
                        className="rounded-md object-cover mx-auto"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-2 border-gray-200">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Name and Position */}
                  <div className="mb-3">
                    <h4 className="font-bold text-lg text-gray-900 mb-1">
                      {structure.name}
                    </h4>
                    <p className="text-sm text-gray-600 font-medium">
                      {structure.position}
                    </p>
                  </div>

                  {/* Department */}
                  {structure.department && (
                    <div className="text-xs text-gray-500">
                      {structure.department}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Fallback Image if no data */}
          {!loading && orgStructure.length === 0 && (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full max-w-4xl">
                <Image
                  src={"/struktur-organisasi.png"}
                  alt="struktur organisasi"
                  width={1000}
                  height={1000}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* LSP Partners */}
        <motion.div
          className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md mb-12 md:mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
        >
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Kerja Sama Lembaga
            </motion.h2>
            <div className="rounded-lg">
              <motion.p
                className="text-center text-gray-600 mb-8 md:mb-16 text-sm md:text-base px-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Bekerja sama dengan Lembaga Sertifikasi Profesi (LSP) terpercaya
              </motion.p>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 items-center justify-items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                {lspLogos.map((lsp, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="relative w-24 h-16 md:w-32 md:h-24 mx-auto mb-3 md:mb-4 rounded-lg p-2 md:p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={lsp.logo}
                        alt={lsp.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-gray-700 text-xs md:text-sm font-medium">
                      {lsp.name}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Our Client */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
            >
              Our Client
            </motion.h3>
            <div className="rounded-lg">
              <motion.p
                className="text-center text-gray-600 mb-8 md:mb-16 text-sm md:text-base px-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                viewport={{ once: true }}
              >
                Telah dipercaya oleh berbagai perusahaan dan institusi terkemuka
              </motion.p>

              {/* Marquee Container */}
              <motion.div
                className="relative overflow-hidden rounded-lg py-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                viewport={{ once: true }}
              >
                {/* First Marquee Row */}
                <motion.div
                  className="flex items-center space-x-8 md:space-x-12 lg:space-x-16"
                  animate={{
                    x: [0, -50 * clientLogos.length],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0,
                  }}
                >
                  {clientLogos.map((client, index) => (
                    <motion.div
                      key={`first-${index}`}
                      className="flex-shrink-0"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.2 + index * 0.02 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="relative w-20 h-16 md:w-28 md:h-20 rounded-lg p-2 md:p-3 flex items-center justify-center hover:shadow-lg transition-all duration-300">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Second Marquee Row (Reverse Direction) */}
                <motion.div
                  className="flex items-center space-x-8 md:space-x-12 lg:space-x-16 mt-8"
                  animate={{
                    x: [-50 * clientLogos.length, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                  }}
                >
                  {clientLogos
                    .slice()
                    .reverse()
                    .map((client, index) => (
                      <motion.div
                        key={`second-${index}`}
                        className="flex-shrink-0"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 1.4 + index * 0.02,
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="relative w-20 h-16 md:w-28 md:h-20 rounded-lg p-2 md:p-3 flex items-center justify-center hover:shadow-lg transition-all duration-300">
                          <Image
                            src={client.logo}
                            alt={client.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </motion.div>
                    ))}
                </motion.div>

                {/* Gradient Overlays for Smooth Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
              </motion.div>

              {/* Client Count Display */}
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-gray-600">
                  Lebih dari{" "}
                  <span className="font-semibold text-blue-600">
                    {clientLogos.length}
                  </span>{" "}
                  perusahaan terkemuka telah mempercayai kami
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-12 md:mb-20"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <motion.div
              className="text-center mb-8 md:mb-12"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Testimoni
              </motion.h3>
              <motion.p
                className="text-gray-600 text-sm md:text-base px-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                Apa kata mereka tentang PGAS Training Center
              </motion.p>
            </motion.div>

            {/* Testimonial Cards */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 md:p-8"
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="flex items-start mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-blue-600 font-bold text-lg md:text-xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-xs md:text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic text-sm md:text-base leading-relaxed">
                    "{testimonial.message}"
                  </blockquote>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutSeciton;
