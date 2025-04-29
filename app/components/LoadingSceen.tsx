"use client";

import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#0a0a23] flex items-center justify-center z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-transparent bg-clip-text"
      >
        Loading Donum...
      </motion.div>
    </div>
  );
};
