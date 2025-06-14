"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import donum_logo from "@/public/donum_logo.png";
export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-[#0a0a23]">
      <motion.div
        initial={{ opacity: 0.6, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="text-3xl md:text-5xl font-extrabold flex flex-col items-center justify-center text-center text-transparent bg-gradient-to-r from-[#00B4DB] to-[#0083B0] bg-clip-text tracking-wide leading-tight"
        style={{
          WebkitFontSmoothing: "antialiased",
          textRendering: "optimizeLegibility",
        }}
      >
        Loading Donum<span className="animate-pulse">...</span>
      </motion.div>
      <div className="relative flex items-center justify-center">
        <div className="absolute w-48 h-48 md:w-64 md:h-64 bg-[#00B4DB] opacity-30 blur-2xl rounded-full z-0 animate-pulse"></div>
        <Image
          src={donum_logo}
          alt="Donum Logo"
          width={220}
          height={220}
          className="rounded-b-full object-contain relative z-10 shadow-lg"
          priority
        />
      </div>
    </div>
  );
};
