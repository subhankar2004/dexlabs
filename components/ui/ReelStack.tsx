"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Reel {
  id: number;
  src: string;       // path to your .mp4, e.g. "/reels/brand-launch.mp4"
  thumbnail: string; // poster image shown before/while video loads
  label: string;
  metric: string;
}

// ─── SCALE THIS TO RESIZE EVERYTHING ───────────────────────────────────────
const CARD_W = 250;           // phone width in px — change this one value
const CARD_H = CARD_W * 1.8; // keeps 9:16 ratio automatically
// ───────────────────────────────────────────────────────────────────────────

const REELS: Reel[] = [
  {
    id: 1,
    src: "/reels/showreel.mp4",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80",
    label: "Brand Launch",
    metric: "2.4M views",
  },
  {
    id: 2,
    src: "/reels/showreel-2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    label: "Growth Campaign",
    metric: "+320% reach",
  },
  {
    id: 3,
    src: "/reels/showreel-3.mp4",
    thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80",
    label: "Viral Content",
    metric: "18K shares",
  },
  {
    id: 4,
    src: "/reels/showreel-4.mp4",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80",
    label: "Product Drop",
    metric: "4.1M impressions",
  },
];

// Stacked offsets — proportional to card size
const STACK_TRANSFORMS = [
  { rotate: 0,  x: 0,               y: 0,                scale: 1,    zIndex: 40 },
  { rotate: 6,  x: CARD_W * 0.11,  y: -CARD_H * 0.034, scale: 0.95, zIndex: 30 },
  { rotate: -5, x: -CARD_W * 0.10, y: -CARD_H * 0.062, scale: 0.90, zIndex: 20 },
  { rotate: 9,  x: CARD_W * 0.15,  y: -CARD_H * 0.097, scale: 0.85, zIndex: 10 },
];

// Fan spread — proportional to card size
const FAN_TRANSFORMS = [
  { rotate: -12, x: -CARD_W * 0.95, y: CARD_H * 0.06,  scale: 0.92, zIndex: 10 },
  { rotate: -4,  x: -CARD_W * 0.30, y: -CARD_H * 0.02, scale: 0.96, zIndex: 20 },
  { rotate: 4,   x: CARD_W * 0.32,  y: -CARD_H * 0.02, scale: 0.96, zIndex: 30 },
  { rotate: 12,  x: CARD_W * 0.97,  y: CARD_H * 0.06,  scale: 0.92, zIndex: 40 },
];

export default function ReelStack() {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Autoplay all videos as soon as they're ready
  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) vid.play().catch(() => {});
    });
  }, []);

  const handleCardEnter = (i: number) => setActive(i);
  const handleCardLeave = (i: number) => setActive(null);

  const borderRadius = CARD_W * 0.13;
  const notchW      = CARD_W * 0.33;
  const notchH      = CARD_W * 0.07;
  const glowSize    = CARD_W * 2.1;

  return (
    <div className="relative flex items-center justify-center w-full h-full select-none">

      {/* Ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: glowSize,
          height: glowSize,
          background: "radial-gradient(circle, rgba(120,60,255,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Stack wrapper */}
      <motion.div
        className="relative"
        style={{ width: CARD_W, height: CARD_H }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => { setHovered(false); setActive(null); }}
      >
        {REELS.map((reel, i) => {
          const t = hovered ? FAN_TRANSFORMS[i] : STACK_TRANSFORMS[i];
          const isActive = active === i;

          return (
            <motion.div
              key={reel.id}
              className="absolute top-0 left-0 cursor-pointer"
              style={{
                width: CARD_W,
                height: CARD_H,
                zIndex: isActive ? 50 : t.zIndex,
              }}
              animate={{
                rotate: t.rotate,
                x: t.x,
                y: t.y,
                scale: isActive ? 1.06 : t.scale,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
                delay: hovered ? i * 0.04 : (REELS.length - 1 - i) * 0.04,
              }}
              onHoverStart={() => handleCardEnter(i)}
              onHoverEnd={() => handleCardLeave(i)}
            >
              {/* Phone shell */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  borderRadius,
                  border: "2px solid rgba(255,255,255,0.12)",
                  boxShadow: isActive
                    ? "0 0 32px rgba(120,60,255,0.6), 0 20px 60px rgba(0,0,0,0.7)"
                    : "0 12px 40px rgba(0,0,0,0.55)",
                  background: "#0d0d14",
                }}
              >
                {/* Video — plays on hover, falls back to thumbnail poster */}
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={reel.src || undefined}
                  poster={reel.thumbnail}
                  className="w-full h-full object-cover"
                  style={{ opacity: isActive ? 1 : 0.85 }}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="auto"
                />

                {/* Fallback thumbnail shown when no src is set */}
                {!reel.src && (
                  <img
                    src={reel.thumbnail}
                    alt={reel.label}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: isActive ? 1 : 0.85 }}
                    draggable={false}
                  />
                )}

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)",
                  }}
                />

                {/* Notch */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 bg-black rounded-full"
                  style={{ top: CARD_H * 0.025, width: notchW, height: notchH }}
                />

                {/* Instagram icon */}
                <div
                  className="absolute opacity-70"
                  style={{ top: CARD_H * 0.06, right: CARD_W * 0.07 }}
                >
                  <svg width={CARD_W * 0.1} height={CARD_W * 0.1} viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>

                {/* Label + metric */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0"
                      style={{ padding: CARD_W * 0.08 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p
                        className="text-white font-semibold tracking-wide"
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: CARD_W * 0.075,
                          marginBottom: CARD_W * 0.02,
                        }}
                      >
                        {reel.label}
                      </p>
                      <p
                        className="text-purple-300 font-medium"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: CARD_W * 0.065,
                        }}
                      >
                        {reel.metric}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Hint text */}
      <motion.p
        className="absolute uppercase tracking-widest"
        style={{
          bottom: -(CARD_H * 0.14),
          color: "rgba(255,255,255,0.3)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: CARD_W * 0.055,
          letterSpacing: "0.2em",
        }}
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        hover to explore
      </motion.p>
    </div>
  );
}