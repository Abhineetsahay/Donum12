"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRef, useEffect, useState } from "react";

export const HeroParallax = ({
  products,
  onProductClick,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  onProductClick?: (index: number) => void;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const height = window.innerHeight;
        setContainerHeight(height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Rotate and opacity
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );

  const isMediumScreen = useMediaQuery("(min-width: 1024px)");
  
  const isVerySmallScreen = useMediaQuery("(max-width: 640px)");

  let translateEndY = 0.1;

  if (isMediumScreen) translateEndY = 0.15;
  if(isVerySmallScreen) translateEndY=0.075

  const translateY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2],
      [-containerHeight * 0.6, containerHeight * translateEndY]
    ),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="min-h-[100vh] sm:min-h-[150vh] md:min-h-[200vh] py-4 sm:py-6 md:py-4 overflow-hidden antialiased relative flex flex-col self-auto z-0 [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-4 sm:mt-8 md:mt-0 flex flex-col relative z-30"
      >
        <div>
          <h6 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 sm:mt-8 md:mt-16 lg:mt-22  text-white font-bold mb-2 sm:mb-4 md:mb-2 lg:mb-0 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
            Customized Products
          </h6>
        </div>
      </motion.div>
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="relative z-30"
      >
        <motion.div
          className={clsx(
            "flex gap-2 sm:gap-4 md:gap-8 transition-all duration-1000 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide px-2 sm:px-4 relative z-30"
          )}
        >
          {firstRow.map((product, i) => (
            <ProductCard
              key={product.title}
              product={product}
              onClick={() => onProductClick?.(i)}
            />
          ))}

          {secondRow.map((product, i) => (
            <ProductCard
              key={product.title}
              product={product}
              onClick={() => onProductClick?.(i + firstRow.length)}
            />
          ))}

          {thirdRow.map((product, i) => (
            <ProductCard
              key={product.title}
              product={product}
              onClick={() =>
                onProductClick?.(i + firstRow.length + secondRow.length)
              }
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto px-2 sm:px-4 w-full left-0 top-4 sm:top-9">
      <h1 className="text-2xl sm:text-3xl md:text-7xl font-bold text-white drop-shadow-lg">
        Stop Giving Boring Gifts.
      </h1>
      <div className="max-w-2xl text-sm sm:text-base md:text-xl mt-4 sm:mt-8 text-gray-300 drop-shadow mb-4 sm:mb-6 break-words whitespace-pre-line">
        <p className="mb-3 leading-relaxed">
          The world has enough mass-produced stuff. Your loved ones are
          one-of-a-kind, and their gifts should be too. Donum is where your
          unique ideas become high-quality, custom-made treasures.
        </p>
        <p className="mb-3 leading-relaxed font-black text-2xl">
          Why Settle for the Shelf?
        </p>
        <p className="mb-3 leading-relaxed">
          Online marketplaces offer you their products. We help you create your
          product. They sell what&apos;s popular. You tell a personal story.
          They focus on price. We focus on meaning, with affordability built-in.
        </p>
        <p className="mb-3 leading-relaxed font-black text-2xl">
          Our Motto is Our Process: You Dream It, We&apos;ll Make It.
        </p>
        <p className="mb-3 leading-relaxed">
          Seriously, anything. That inside joke about a glowing pickle? We can
          make it a keychain. A custom soundwave engraving of you saying &quot;I
          love you&quot;? We&apos;ll figure it out.
        </p>
        <p className="mb-3 leading-relaxed">
          <span className="font-extrabold">Tell Us Your Vision: </span>
          No matter how simple or wild. We Bring It To Life: With quality
          materials and craftsmanship. Delivered On Time: For a seamless and
          happy purchase experience.
        </p>

        <h1 className="text-xl sm:text-2xl md:text-6xl font-bold text-white drop-shadow-lg">
          Don&apos;t just give a gift. Gift a story.
        </h1>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  onClick,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  onClick?: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-64 sm:h-80 md:h-96 w-56 sm:w-64 md:w-96 lg:w-[30rem] relative shrink-0"
    >
      <Image
        src={product.thumbnail}
        className="object-contain object-left-top absolute h-full w-full inset-0 cursor-pointer"
        fill
        alt={product.title}
        onClick={onClick}
      />
      <h2 className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 opacity-0 group-hover/product:opacity-100 text-white text-base sm:text-xl font-semibold drop-shadow-lg transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};
