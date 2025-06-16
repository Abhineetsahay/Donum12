"use client";
import { db } from "@/lib/firebase";
import { HoverEffect } from "../ui/card-hover-effect";
import { ref, onValue } from "firebase/database";
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
}: {
  productRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);
  const [normalProducts, setNormalProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
  
    const normalRef = ref(db, "normalProducts");
    const heroRef = ref(db, "heroProducts");
  
    let hasNormalLoaded = false;
    let hasHeroLoaded = false;
  
    const checkIfFinished = () => {
      if (hasNormalLoaded && hasHeroLoaded) {
        setIsLoading(false);
      }
    };
  
    const unsubscribeNormal = onValue(
      normalRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const loaded = Object.entries(data).map(([id, value]) => ({
              id,
              ...(value as Omit<Product, "id">),
            }));
            setNormalProducts(loaded);
          } else {
            setNormalProducts([]);
          }
        } catch (err) {
          setError("Failed to load normal products");
          console.error("Error loading normal products:", err);
        } finally {
          hasNormalLoaded = true;
          checkIfFinished();
        }
      },
      (error) => {
        setError("Failed to load normal products");
        console.error("Error loading normal products:", error);
        hasNormalLoaded = true;
        checkIfFinished();
      }
    );
  
    const unsubscribeHero = onValue(
      heroRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const loaded = Object.entries(data).map(([id, value]) => ({
              id,
              ...(value as Omit<Product, "id">),
            }));
            setHeroProducts(loaded);
          } else {
            setHeroProducts([]);
          }
        } catch (err) {
          setError("Failed to load hero products");
          console.error("Error loading hero products:", err);
        } finally {
          hasHeroLoaded = true;
          checkIfFinished();
        }
      },
      (error) => {
        setError("Failed to load hero products");
        console.error("Error loading hero products:", error);
        hasHeroLoaded = true;
        checkIfFinished();
      }
    );
  
    return () => {
      unsubscribeNormal();
      unsubscribeHero();
    };
  }, []);
  

  if (isLoading) {
    return (
      <div className="w-full h-full pt-6 md:pt-10 pb-10 md:pb-20 px-4 md:px-8 flex flex-col items-center justify-center">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full pt-6 md:pt-10 pb-10 md:pb-20 px-4 md:px-8 flex flex-col items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={productRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={revealVariant}
      custom={0}
      className="w-full h-full mt-8 sm:mt-0 pt-16 pb-10 md:pb-20 px-4 md:px-8 flex flex-col"
    >
      <div className="mt-6 md:mt-14 flex flex-col z-20">
        <h6 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-6 md:mb-10 text-center">
          Customized Products
        </h6>
        {heroProducts.length > 0 ? (
          <HeroWithCarousel products={heroProducts} />
        ) : (
          <div className="text-white text-center">No customized products available</div>
        )}
      </div>
      <div className="flex flex-col z-[15] mt-8 md:mt-12">
        <h6 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-6 md:mb-8 text-center">
          Other Products
        </h6>
        {normalProducts.length > 0 ? (
          <HoverEffect items={normalProducts} isHero={false} />
        ) : (
          <div className="text-white text-center">No other products available</div>
        )}
      </div>
    </motion.div>
  );
};
