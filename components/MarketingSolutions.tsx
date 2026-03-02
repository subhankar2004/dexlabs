"use client";

import { motion } from "framer-motion";
import {
  MdDesignServices,
  MdVideoLibrary,
  MdCameraAlt,
  MdManageAccounts,
} from "react-icons/md";
import { PiPencilLineBold } from "react-icons/pi";

const services = [
  {
    id: 1,
    label: "Design",
    icon: MdDesignServices,
    style: { left: "50%", top: "8%" },
    delay: 0.1,
  },
  {
    id: 2,
    label: "Video Editing",
    icon: MdVideoLibrary,
    style: { left: "33%", top: "33%" },
    delay: 0.2,
  },
  {
    id: 3,
    label: "Script Writing",
    icon: PiPencilLineBold,
    style: { left: "63%", top: "33%" },
    delay: 0.3,
  },
  {
    id: 4,
    label: "Social Media Management",
    icon: MdManageAccounts,
    style: { left: "33%", top: "58%" },
    delay: 0.4,
  },
  {
    id: 5,
    label: "Photography",
    icon: MdCameraAlt,
    style: { left: "63%", top: "58%" },
    delay: 0.5,
  },
  {
    id: 6,
    label: "Design",
    icon: MdDesignServices,
    style: { left: "50%", top: "80%" },
    delay: 0.6,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.33, 1, 0.68, 1], delay },
  }),
};

export const MarketingSolutions = () => {
  return (
    // No bg, no grid, no glow — all of that is global in page.tsx
    <section className="relative w-full " style={{ minHeight: "480px" }}>
      <div className="relative z-10 flex w-full h-full min-h-[480px]">

        {/* LEFT: text content — same left indent as Hero */}
        <div
          className="flex flex-col justify-center shrink-0 pl-[18vw] pr-6 py-16"
          style={{ width: "42%" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[0.6rem] font-bold tracking-[0.22em] uppercase mb-3"
            style={{ color: "#9b5de5" }}
          >
            Our Systems. Your Growth
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-white font-extrabold leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.6rem)" }}
          >
            Marketing Solutions
            <br />
            for all business
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-7"
          >
            <button className="h-9 px-5 border border-white bg-transparent text-white text-[0.58rem] font-bold tracking-[0.16em] uppercase transition-all duration-200 hover:bg-white hover:text-[#080714]">
              Our Brand Solutions
            </button>
          </motion.div>
        </div>

        {/* RIGHT: scattered service pills */}
        <div className="relative flex-1" style={{ minHeight: "480px" }}>
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.id}
                custom={svc.delay}
                // variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="absolute"
                style={svc.style}
              >
                <ServicePill icon={<Icon size={14} />} label={svc.label} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function ServicePill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="group flex items-center gap-2 px-3 py-[7px] rounded-full border border-white/15 bg-white/4 backdrop-blur-sm cursor-default transition-all duration-300 hover:border-purple-500/60 hover:bg-purple-500/10 whitespace-nowrap">
      <span className="flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 text-white/70 group-hover:border-purple-400/60 group-hover:text-purple-300 transition-colors duration-300 shrink-0">
        {icon}
      </span>
      <span className="text-[0.7rem] font-medium text-white/70 tracking-wide group-hover:text-white/90 transition-colors duration-300">
        {label}
      </span>
    </div>
  );
}

export default MarketingSolutions;