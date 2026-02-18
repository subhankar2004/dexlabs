"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";


const BRAND_NAME = "dexlabs";
const BRAND_DOT_COLOR = "#F5C518"; 
const LOADER_BG = "#0a0a0a";
const LOADER_TEXT_COLOR = "#ffffff";
const CHAR_STAGGER = 0.06;   
const HOLD_DURATION = 600;   


interface PageLoaderProps {
 
  onComplete?: () => void;
}


const chars = BRAND_NAME.split("");

// Framer Motion variants
const overlayVariants: Variants = {
  visible: { y: "0%" },
  exit: {
    y: "-100%",
    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.1,
    },
  },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * CHAR_STAGGER,
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const dotVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * CHAR_STAGGER + 0.1,
      duration: 0.35,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

// Page content slide-up variants
export const pageVariants: Variants = {
  hidden: { y: "6%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.15,
    },
  },
};

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Total time for all letters to appear
  const totalTypeDuration =
    chars.length * CHAR_STAGGER * 1000 + 400 + HOLD_DURATION;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, totalTypeDuration);

    return () => clearTimeout(timer);
  }, [totalTypeDuration]);

  const handleExitComplete = () => {
    setIsDone(true);
    onComplete?.();
  };

  if (isDone) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.div
          key="loader"
          variants={overlayVariants}
          initial="visible"
          exit="exit"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: LOADER_BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {/* Brand name */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: LOADER_TEXT_COLOR,
              userSelect: "none",
            }}
          >
            {chars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}

            {/* Accent dot */}
            <motion.span
              custom={chars.length}
              variants={dotVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                display: "inline-block",
                color: BRAND_DOT_COLOR,
                marginLeft: "1px",
              }}
            >
              .
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}