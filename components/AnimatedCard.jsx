"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const AnimatedCard = ({
  children,
  className = "",
  delay = 0,
  duration = 0.3,
  hoverScale = 1.05,
  hoverY = -5,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut",
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: hoverY,
      scale: hoverScale,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${className}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...props}
    >
      <motion.div variants={hoverVariants} className="h-full">
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCard;
