"use client";

import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a23]">
      <motion.div
        initial={{ opacity: 0.6, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="text-3xl md:text-5xl font-extrabold text-center text-transparent bg-gradient-to-r from-[#00B4DB] to-[#0083B0] bg-clip-text tracking-wide leading-tight"
        style={{
          WebkitFontSmoothing: "antialiased",
          textRendering: "optimizeLegibility",
        }}
      >
        Loading Donum<span className="animate-pulse">...</span>
      </motion.div>
    </div>
  );
};
