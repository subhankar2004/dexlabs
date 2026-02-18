"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageLoader, { pageVariants } from "@/components/PageLoader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setLoaderDone(true)} />

      {/* Page content animates in after loader exits */}
      <motion.main
        variants={pageVariants}
        initial="hidden"
        animate={loaderDone ? "visible" : "hidden"}
      >
        {children}
      </motion.main>
    </>
  );
}