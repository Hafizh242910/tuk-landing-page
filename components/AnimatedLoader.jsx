"use client";

import { motion } from "framer-motion";

const AnimatedLoader = ({
  size = "md",
  color = "blue",
  type = "spinner", // "spinner", "dots", "pulse"
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorClasses = {
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
    yellow: "border-yellow-500",
    gray: "border-gray-500",
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const dotsVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (type === "dots") {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`${sizeClasses[size]} bg-${color}-500 rounded-full`}
            variants={dotsVariants}
            animate="animate"
            transition={{ delay: index * 0.2 }}
          />
        ))}
      </div>
    );
  }

  if (type === "pulse") {
    return (
      <motion.div
        className={`${sizeClasses[size]} bg-${color}-500 rounded-full ${className}`}
        variants={pulseVariants}
        animate="animate"
      />
    );
  }

  // Default spinner
  return (
    <motion.div
      className={`${sizeClasses[size]} border-4 border-gray-200 border-t-${color}-500 rounded-full ${className}`}
      variants={spinnerVariants}
      animate="animate"
    />
  );
};

export default AnimatedLoader;
