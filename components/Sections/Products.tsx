"use client";
import { HoverEffect } from "../ui/card-hover-effect";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroWithCarousel from "./compnent/HeroWithCarousel";

const revealVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay },
  }),
};

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const Products = ({
  productRef,
  onLoadingChange,
  heroProducts,
  normalProducts,
}: {
  productRef: React.RefObject<HTMLDivElement | null>;
  onLoadingChange?: (isLoading: boolean) => void;
  heroProducts: Product[];
  normalProducts: Product[];
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (heroProducts.length > 0 || normalProducts.length > 0) {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  }, [heroProducts, normalProducts, onLoadingChange]);

  if (isLoading) {
    return (
      <div className="w-full h-full pt-6 md:pt-10 pb-10 md:pb-20 px-4 md:px-8 flex flex-col items-center justify-center">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={productRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={revealVariant}
      custom={0}
      className="w-full h-full mt-4 sm:mt-8 pt-8 sm:pt-16 pb-6 sm:pb-10 md:pb-20 px-2 sm:px-4 md:px-8 flex flex-col relative"
    >
      <div className="mt-4 sm:mt-6 md:mt-14 flex flex-col relative z-30">
        {heroProducts.length > 0 ? (
          <div className="relative z-30">
            <HeroWithCarousel products={heroProducts} />
          </div>
        ) : (
          <div className="text-white text-center">No customized products available</div>
        )}
      </div>
      <div className="flex flex-col relative z-20 mt-6 sm:mt-8 md:mt-12">
        <h6 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-4 sm:mb-6 md:mb-8 text-center">
          Other Products
        </h6>
        {normalProducts.length > 0 ? (
          <div className="relative z-20">
            <HoverEffect items={normalProducts} isHero={false} />
          </div>
        ) : (
          <div className="text-white text-center">No other products available</div>
        )}
      </div>
    </motion.div>
  );
};
