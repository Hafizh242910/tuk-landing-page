"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Course", href: "/course" },
    { name: "Schedule", href: "/schedule" },
    { name: "Contact", href: "/contact" },
  ];

  const programLinks = [
    "Operator Penyambungan Pipa Polyethylene",
    "Operator Penyambungan Pipa Galvanis",
    "Pemeriksa Mutu Kontruksi Pipa Polyethylene (PE)",
    "Pengoperasian Peralatan SPBG",
    "Inspeksi Stasiun Penyaluran Gas Bumi",
    "Pelaksana Komersialisasi Gas Bumi",
    "Operator Pemeliharaan Metering Regulating Station",
    "Operator Pemeliharaan Bak Valve dan Ball Valve",
    "Operator Penyambungan Pipa Multilayer",
    "Perancang Design Pipa Instalasi Gas Bumi",
    "Operator Monitoring Sistem Proteksi Katodik",
    "Pemeriksa Sistem Alat Ukur Serah Terima (SAUST)",
    "Operator Patroli dan Leak Survey",
    "Floor Warden",
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100085717373790",
      target: "_blank",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },

    {
      name: "Instagram",
      href: "https://www.instagram.com/tuk.pgas?igsh=ZTdrYmFtcXdmeDVr",
      target: "_blank",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

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

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants = {
    hover: {
      x: 5,
      color: "#ffffff",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.footer
      className="bg-gray-900 text-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-8 pb-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <motion.div
              className="flex items-center gap-3 mb-6"
              variants={logoVariants}
            >
              <motion.div
                className="relative aspect-square w-12"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/logo.png"
                  alt="PGAS Training Center"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <motion.span
                className="font-bold text-lg"
                whileHover={{ color: "#3b82f6" }}
                transition={{ duration: 0.2 }}
              >
                PGAS TRAINING CENTER
              </motion.span>
            </motion.div>
            <motion.p
              className="text-gray-300 mb-6 leading-relaxed text-sm"
              variants={itemVariants}
            >
              Lembaga pelatihan terkemuka di bidang Oil & Gas yang menyediakan
              program sertifikasi dan pelatihan profesional untuk mengembangkan
              kompetensi SDM di industri energi.
            </motion.p>

            {/* Social Media */}
            <motion.div className="flex space-x-4" variants={itemVariants}>
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  variants={socialIconVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Link
                    href={social.href}
                    target={social.target}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold mb-6"
              variants={itemVariants}
            >
              Navigasi
            </motion.h3>
            <motion.ul className="space-y-3" variants={containerVariants}>
              {navigationLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  variants={linkVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Program Links */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold mb-6"
              variants={itemVariants}
            >
              Program Pelatihan
            </motion.h3>
            <motion.ul className="space-y-2" variants={containerVariants}>
              {programLinks.slice(0, 6).map((program, index) => (
                <motion.li
                  key={program}
                  variants={linkVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Link
                    href="/course"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm block"
                  >
                    {program}
                  </Link>
                </motion.li>
              ))}
              {programLinks.length > 6 && (
                <motion.li variants={linkVariants} whileHover="hover">
                  <Link
                    href="/course"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
                  >
                    Lihat Semua Program →
                  </Link>
                </motion.li>
              )}
            </motion.ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold mb-6"
              variants={itemVariants}
            >
              Kontak Kami
            </motion.h3>
            <motion.div className="space-y-4" variants={containerVariants}>
              {/* Address */}
              <motion.div
                className="flex items-start"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
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
                </motion.svg>
                <p className="text-gray-300 text-sm">
                  Jl. Swadaya Pln No.5, RT.9/RW.2, Jatinegara
                  <br />
                  Cakung, Jakarta Timur 13930
                </p>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="flex items-center"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </motion.svg>
                <p className="text-gray-300 text-sm">+62 812 8799 2089</p>
              </motion.div>

              {/* Email */}
              <motion.div
                className="flex items-center"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </motion.svg>
                <p className="text-gray-300 text-sm">
                  info.tuk@pgnsolution.co.id
                </p>
              </motion.div>

              {/* Operating Hours */}
              <motion.div
                className="flex items-start"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </motion.svg>
                <div className="text-gray-300 text-sm">
                  <p className="font-medium mb-1">Jam Operasional:</p>
                  <p>Sen-Jum: 08:00 - 17:00</p>
                  <p>Sabtu-Minggu: Tutup</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-gray-800 mt-8 pt-4"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <motion.p
              className="text-gray-400 text-sm text-center md:text-left"
              variants={itemVariants}
            >
              © {currentYear} PGAS Training Center. All rights reserved.
            </motion.p>
            <motion.div className="flex space-x-6" variants={containerVariants}>
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link, index) => (
                <motion.div
                  key={link.label}
                  variants={linkVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
