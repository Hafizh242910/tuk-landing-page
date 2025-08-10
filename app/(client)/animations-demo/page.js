"use client";

import { motion } from "framer-motion";
import AnimatedCard from "@/components/AnimatedCard";
import AnimatedText from "@/components/AnimatedText";
import AnimatedLoader from "@/components/AnimatedLoader";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";
import AnimatedFloatingButton from "@/components/AnimatedFloatingButton";

const AnimationsDemo = () => {
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
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Framer Motion Animations
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Koleksi komponen animasi yang dibuat dengan Framer Motion untuk
            meningkatkan user experience
          </motion.p>
        </motion.div>

        {/* Animated Text Examples */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Animated Text Components
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Reveal Animation</h3>
              <AnimatedText
                text="PGAS Training Center"
                className="text-2xl font-bold text-blue-600"
                type="reveal"
              />
            </AnimatedCard>

            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Typing Effect</h3>
              <AnimatedText
                text="Welcome to TUK"
                className="text-2xl font-bold text-green-600"
                type="typing"
              />
            </AnimatedCard>

            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Fade Animation</h3>
              <AnimatedText
                text="Professional Training"
                className="text-2xl font-bold text-purple-600"
                type="fade"
              />
            </AnimatedCard>
          </div>
        </motion.section>

        {/* Animated Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Animated Cards
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedCard className="p-6" delay={0}>
              <h3 className="text-lg font-semibold mb-4">Card 1</h3>
              <p className="text-gray-600">
                Hover untuk melihat efek animasi yang smooth
              </p>
            </AnimatedCard>

            <AnimatedCard className="p-6" delay={0.1}>
              <h3 className="text-lg font-semibold mb-4">Card 2</h3>
              <p className="text-gray-600">
                Setiap card memiliki delay yang berbeda
              </p>
            </AnimatedCard>

            <AnimatedCard className="p-6" delay={0.2}>
              <h3 className="text-lg font-semibold mb-4">Card 3</h3>
              <p className="text-gray-600">
                Animasi muncul saat scroll ke viewport
              </p>
            </AnimatedCard>
          </div>
        </motion.section>

        {/* Loading Animations */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Loading Animations
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Spinner</h3>
              <div className="flex justify-center">
                <AnimatedLoader type="spinner" size="lg" color="blue" />
              </div>
            </AnimatedCard>

            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Dots</h3>
              <div className="flex justify-center">
                <AnimatedLoader type="dots" size="md" color="green" />
              </div>
            </AnimatedCard>

            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Pulse</h3>
              <div className="flex justify-center">
                <AnimatedLoader type="pulse" size="lg" color="purple" />
              </div>
            </AnimatedCard>
          </div>
        </motion.section>

        {/* Progress Bars */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Progress Bars
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Basic Progress</h3>
              <AnimatedProgressBar
                progress={75}
                showLabel={true}
                labelPosition="top"
              />
            </AnimatedCard>

            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Custom Colors</h3>
              <AnimatedProgressBar
                progress={60}
                fillColor="bg-green-500"
                bgColor="bg-gray-100"
                height="h-3"
              />
            </AnimatedCard>
          </div>
        </motion.section>

        {/* Interactive Elements */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Interactive Elements
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Hover Effects</h3>
              <motion.button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.95 }}
              >
                Hover Me!
              </motion.button>
            </AnimatedCard>

            <AnimatedCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Tap Effects</h3>
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </AnimatedCard>
          </div>
        </motion.section>
      </div>

      {/* Floating Button */}
      <AnimatedFloatingButton />
    </div>
  );
};

export default AnimationsDemo;
