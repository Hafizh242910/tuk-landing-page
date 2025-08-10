"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => pathname === href;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/course", label: "Course" },
    { href: "/schedule", label: "Schedule" },
    { href: "/contact", label: "Contact" },
  ];

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
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

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.1,
      },
    }),
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <motion.div
      className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 w-full"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between container mx-auto px-4 py-3 md:px-6 lg:px-8">
        {/* Logo and Brand */}
        <motion.div
          className="flex items-center gap-2"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="relative aspect-square w-12 md:w-16"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={"/logo.png"}
              alt="pgas training center"
              fill
              className="object-contain"
            />
          </motion.div>
          <motion.span
            className="font-semibold text-base md:text-xl text-gray-800"
            whileHover={{ color: "#2563eb" }}
            transition={{ duration: 0.2 }}
          >
            PGAS TRAINING CENTER
          </motion.span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              custom={index}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href={link.href}
                className={` hover:text-blue-600 font-medium transition-colors duration-200 relative group ${
                  isActive(link.href) ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {link.label}
                <motion.span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ${
                    isActive(link.href) ? "text-blue-600" : ""
                  }`}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMenu}
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className={`block h-0.5 w-4 bg-gray-600`}
            animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`block h-0.5 w-4 bg-gray-600`}
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`block h-0.5 w-4 bg-gray-600`}
            animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  custom={index}
                  variants={mobileItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
