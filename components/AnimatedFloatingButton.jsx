"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { useState } from "react";

const AnimatedFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const floatingVariants = {
    closed: {
      scale: 1,
      rotate: 0,
    },
    open: {
      scale: 1.1,
      rotate: 45,
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      scale: 0.5,
      y: 10,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items */}
      <motion.div
        className="absolute bottom-16 right-0 space-y-3"
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.div variants={menuItemVariants}>
          <motion.a
            href="tel:+6281234567890"
            className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Phone size={20} />
          </motion.a>
        </motion.div>

        <motion.div variants={menuItemVariants}>
          <motion.a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={20} />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Main Floating Button */}
      <motion.button
        className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl"
        variants={floatingVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ArrowUp size={24} />
      </motion.button>
    </div>
  );
};

export default AnimatedFloatingButton;
