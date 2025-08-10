"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroScetion = () => {
  const [stats, setStats] = useState({
    totalParticipants: 1000,
    totalPrograms: 15,
  });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch courses and schedules to calculate stats
        const [coursesResponse, schedulesResponse] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/schedules"),
        ]);

        if (coursesResponse.ok && schedulesResponse.ok) {
          const coursesData = await coursesResponse.json();
          const schedulesData = await schedulesResponse.json();

          const activeCourses =
            coursesData.data?.filter((course) => course.isActive) || [];
          const totalParticipants =
            schedulesData.data?.reduce((total, schedule) => {
              return total + (schedule.seats - schedule.available);
            }, 0) || 1000;

          setStats({
            totalParticipants: totalParticipants,
            totalPrograms: activeCourses.length || 15,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Keep default values if API fails
      }
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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
        duration: 0.5,
        ease: "easeOut",
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

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="relative h-screen w-full pt-20 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/hero.jpg" // You'll need to add this image to public folder
          alt="PGAS Training Center"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/70 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Title */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              PGAS TRAINING CENTER / TUK
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-sm md:text-lg lg:text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Tingkatkan kemampuan dan keahlian Anda dengan program pelatihan
              profesional terbaik di bidang oil & gas
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={itemVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/course"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl block"
                >
                  Lihat Program Pelatihan
                </Link>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/contact"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 block"
                >
                  Hubungi Kami
                </Link>
              </motion.div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center w-[35rem] mx-auto"
              variants={itemVariants}
            >
              <motion.div
                className="bg-white border-2 border-blue-400 rounded-lg p-6"
                variants={statsVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.h3
                  className="text-2xl font-bold text-blue-400 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {stats.totalParticipants}+
                </motion.h3>
                <p className="text-gray-500">Peserta Terlatih</p>
              </motion.div>
              <motion.div
                className="bg-white border-2 border-blue-400 rounded-lg p-6"
                variants={statsVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.h3
                  className="text-2xl font-bold text-blue-400 mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1.2,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {stats.totalPrograms}+
                </motion.h3>
                <p className="text-gray-500">Program Pelatihan</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroScetion;
