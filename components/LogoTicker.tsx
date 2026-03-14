"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const BASE_LOGOS: string[] = [
  "/swiftys.png",
  "/swiftys.png",
  "/swiftys.png",
  "/swiftys.png",
  "/swiftys.png",
  "/swiftys.png",
];

const TICKER_LOGOS = [...BASE_LOGOS, ...BASE_LOGOS];

export const LogoTicker = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [halfWidth, setHalfWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      // Measure the full track width, then halve it (since we duplicated)
      setHalfWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="w-full max-w-[640px]">
      <div className="flex items-center gap-6">
        <span className="shrink-0 text-sm font-semibold tracking-[0.16em] uppercase text-white whitespace-nowrap">
          Partnered With
        </span>

        <div
          className="overflow-hidden w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <motion.div
            ref={trackRef}
            className="flex gap-12 w-max"
            animate={halfWidth ? { x: [0, -halfWidth] } : false}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 16,
            }}
          >
            {TICKER_LOGOS.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="partner logo"
                className="h-10 w-[60px] object-contain shrink-0 brightness-0 invert opacity-80 transition duration-300"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};