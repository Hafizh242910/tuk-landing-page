"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedProgressBar = ({
  progress = 0,
  max = 100,
  height = "h-2",
  bgColor = "bg-gray-200",
  fillColor = "bg-blue-500",
  showLabel = false,
  labelPosition = "top", // "top", "bottom", "left", "right"
  className = "",
  animateOnMount = true,
  duration = 1,
  ...props
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (animateOnMount) {
      setAnimatedProgress(0);
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(progress);
    }
  }, [progress, animateOnMount]);

  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: `${(animatedProgress / max) * 100}%`,
      transition: {
        duration: duration,
        ease: "easeOut",
      },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  const getLabelPosition = () => {
    switch (labelPosition) {
      case "top":
        return "mb-2";
      case "bottom":
        return "mt-2";
      case "left":
        return "mr-2";
      case "right":
        return "ml-2";
      default:
        return "mb-2";
    }
  };

  const renderLabel = () => {
    if (!showLabel) return null;

    return (
      <motion.div
        className={`text-sm font-medium text-gray-700 ${getLabelPosition()}`}
        variants={labelVariants}
        initial="hidden"
        animate="visible"
      >
        {Math.round((progress / max) * 100)}%
      </motion.div>
    );
  };

  const containerClass =
    labelPosition === "left" || labelPosition === "right"
      ? "flex items-center"
      : "";

  return (
    <div className={`${containerClass} ${className}`} {...props}>
      {labelPosition === "top" && renderLabel()}
      {labelPosition === "left" && renderLabel()}

      <div
        className={`flex-1 ${bgColor} rounded-full overflow-hidden ${height}`}
      >
        <motion.div
          className={`${fillColor} h-full rounded-full`}
          variants={progressVariants}
          initial="initial"
          animate="animate"
        />
      </div>

      {labelPosition === "bottom" && renderLabel()}
      {labelPosition === "right" && renderLabel()}
    </div>
  );
};

export default AnimatedProgressBar;
