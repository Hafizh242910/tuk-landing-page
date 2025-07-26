"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AboutSeciton = () => {
  const pathname = usePathname();
  const [orgStructure, setOrgStructure] = useState([]);

  useEffect(() => {
    const fetchOrgStructure = async () => {
      try {
        const response = await fetch("/api/organizational-structure");
        if (response.ok) {
          const data = await response.json();
          setOrgStructure(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching organizational structure:", error);
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

  return (
    <div className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tentang Kami
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            PGAS Training Center adalah lembaga pelatihan terkemuka di bidang
            Oil & Gas dengan pengalaman lebih dari 15 tahun
          </p>
        </div>

        {/* Profil Section */}
        <div className="mb-12 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                Profil Perusahaan
              </h3>
              <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
                <p className="text-justify">
                  PGAS Training Center didirikan pertama kali pada tanggal 1
                  November 2016 dengan mendapatkan Lisensi dari Badan Nasional
                  Sertifikasi Profesi (BNSP).
                </p>
                <p className="text-justify">
                  Merupakan Lembaga yang memberikan fasilitas pelaksanaan Uji
                  Kompetensi, yang dilakukan oleh LSP dan dibentuk oleh PT PGAS
                  Solution sebagai salah satu anak perusahaan PT Perusahaan Gas
                  Negara (Tbk), serta menyediakan fasilitas pelatihan untuk
                  persiapan Uji Kompetensi.
                </p>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
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
            </div>
          </div>
        </div>

        {/* Struktur Organisasi */}
        {pathname === "/about" && (
          <div className="mb-12 md:mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
              Struktur Organisasi TUK LSP PGN
            </h3>
            <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base px-4">
              Sesuai Pedoman Persyaratan Umum Tempat Uji Kompetensi BNSP 206
              Tahun 2014
            </p>

            {/* Dynamic Organizational Structure from API */}
            {orgStructure.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {orgStructure.map((structure) => (
                  <div
                    key={structure.id}
                    className="bg-white rounded-lg p-6 text-center"
                  >
                    {/* Photo */}
                    <div className="mb-4">
                      {structure.photo ? (
                        <Image
                          src={structure.photo}
                          alt={structure.name || structure.title}
                          width={120}
                          height={120}
                          className="rounded-md object-cover mx-auto border-2 border-gray-200"
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
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="relative w-full max-w-4xl">
                  <Image
                    src={"/struktur-organisasi.png"}
                    alt="struktur organisasi"
                    width={1000}
                    height={1000}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* LSP Partners */}
        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md mb-12 md:mb-16">
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              Kerja Sama Lembaga
            </h2>
            <div className="rounded-lg">
              <p className="text-center text-gray-600 mb-8 md:mb-16 text-sm md:text-base px-4">
                Bekerja sama dengan Lembaga Sertifikasi Profesi (LSP) terpercaya
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 items-center justify-items-center">
                {lspLogos.map((lsp, index) => (
                  <div key={index} className="text-center">
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Client */}
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              Our Client
            </h3>
            <div className="rounded-lg">
              <p className="text-center text-gray-600 mb-8 md:mb-16 text-sm md:text-base px-4">
                Telah dipercaya oleh berbagai perusahaan dan institusi terkemuka
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-6 items-center justify-items-center">
                {clientLogos.map((client, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <div className="relative w-16 h-12 md:w-28 md:h-20 rounded-lg p-1 md:p-3 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12 md:mb-20">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Testimoni
              </h3>
              <p className="text-gray-600 text-sm md:text-base px-4">
                Apa kata mereka tentang PGAS Training Center
              </p>
            </div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 md:p-8"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSeciton;
