"use client";
import { HoverEffect } from "../ui/card-hover-effect";
import { dummyProducts } from "@/app/data/data";
import { motion } from "framer-motion";

const revealVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay },
  }),
};

export const Products = ({ productRef }: { productRef: React.RefObject<HTMLDivElement|null> }) => (
  <motion.div
    ref={productRef}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    variants={revealVariant}
    custom={0}  
    className="bg-[#0d0d2b] w-full pt-10 pb-20 px-4 z-10 shadow-blue-900"
  >
    <h6 className="text-2xl text-white font-semibold mb-8 text-center">
      Available Products
    </h6>
    <HoverEffect items={dummyProducts} className="h-1/2" />
  </motion.div>
);
