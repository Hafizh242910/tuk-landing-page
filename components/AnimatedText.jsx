"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedText = ({
  text,
  className = "",
  type = "reveal", // "reveal", "typing", "fade"
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.05,
  ...props
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Typing effect
  useEffect(() => {
    if (type === "typing" && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, type]);

  // Reset typing effect when text changes
  useEffect(() => {
    if (type === "typing") {
      setDisplayText("");
      setCurrentIndex(0);
    }
  }, [text, type]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: duration,
        ease: "easeOut",
      },
    },
  };

  const fadeVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut",
      },
    },
  };

  const typingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay,
      },
    },
  };

  if (type === "typing") {
    return (
      <motion.div
        className={className}
        variants={typingVariants}
        initial="hidden"
        animate="visible"
        {...props}
      >
        <span>{displayText}</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      </motion.div>
    );
  }

  if (type === "fade") {
    return (
      <motion.div
        className={className}
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        {...props}
      >
        {text}
      </motion.div>
    );
  }

  // Default reveal type
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ y }}
      {...props}
    >
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
