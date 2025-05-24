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

  useEffect(() => {
    const normalRef = ref(db, "normalProducts");
    const heroRef = ref(db, "heroProducts");

    const unsubscribeNormal = onValue(normalRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<Product, "id">),
        }));
        setNormalProducts(loaded);
      }
    });

    const unsubscribeHero = onValue(heroRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<Product, "id">),
        }));
        setHeroProducts(loaded);
      }
    });

    return () => {
      unsubscribeNormal();
      unsubscribeHero();
    };
  }, []);

  return (
    <motion.div
      ref={productRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={revealVariant}
      custom={0}
      className="w-full pt-10 pb-20 px-4 z-10 "
    >
      <h6 className="text-3xl text-white font-bold mb-10 text-center">
        Hero Products
      </h6>
      <HeroWithCarousel products={heroProducts} />

      <h6 className="text-2xl text-white font-semibold mb-8 text-center">
        Normal Products
      </h6>
      <HoverEffect items={normalProducts} isHero={false} />
    </motion.div>
  );
};
