"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { useMediaQuery } from "@/hooks/use-media-query";

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

  const ref = React.useRef(null);
  const [containerHeight, setContainerHeight] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  React.useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const height = window.innerHeight;
        setContainerHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
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

  const isSmallScreen = useMediaQuery("(max-width: 639px)");
  
  const isVerySmallScreen = useMediaQuery("(max-width: 400px)");
  let translateEndY=0.75

  if(isSmallScreen) translateEndY=0.7
  if(isVerySmallScreen) translateEndY=0.35

  const translateY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.2],
      [-containerHeight * 0.6, containerHeight * translateEndY ]
    ),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="min-h-[225vh] md:min-h-[250vh] py-6 sm:py-18 md:py-20 overflow-hidden antialiased relative flex flex-col self-auto z-0 [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div
          className={clsx(
            "flex gap-4 sm:gap-6 md:gap-8 transition-all duration-1000 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide"
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
    <div className="max-w-7xl relative mx-auto px-4 w-full left-0 top-9">
      <h1 className="text-3xl md:text-7xl font-bold text-white drop-shadow-lg">
        Stop Giving Boring Gifts.
      </h1>
      <div className="max-w-2xl text-base md:text-xl mt-8 text-gray-300 drop-shadow mb-6 break-words whitespace-pre-line">
        <p className="mb-3 leading-relaxed">
          The world has enough mass-produced stuff. Your people are
          one-of-a-kind, and their gifts should be too. Donum is where your
          unique ideas become high-quality, custom-made treasures.
        </p>
        <p className="mb-3 leading-relaxed">Why Settle for the Shelf?</p>
        <p className="mb-3 leading-relaxed">
          Online marketplaces offer you their products. We help you create your
          product. They sell what&apos;s popular. You tell a personal story.
          They focus on price. We focus on meaning, with affordability built-in.
        </p>
        <p className="mb-3 leading-relaxed">
          Our Motto is Our Process: You Dream It, We&apos;ll Make It.
        </p>
        <p className="mb-3 leading-relaxed">
          Seriously, anything. That inside joke about a glowing pickle? We can
          make it a keychain. A custom soundwave engraving of you saying &quot;I
          love you&quot;? We&apos;ll figure it out.
        </p>
        <p className="mb-3 leading-relaxed">
          Tell Us Your Vision: No matter how simple or wild. We Bring It To
          Life: With quality materials and craftsmanship. Delivered On Time: For
          a seamless and happy purchase experience.
        </p>
        <p className="leading-relaxed">
          Don&apos;t just give a gift. Give a story.
        </p>
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
      className="group/product h-96 w-64 sm:w-96 md:w-[30rem] relative shrink-0"
    >
      <Image
        src={product.thumbnail}
        className="object-contain object-left-top absolute h-full w-full inset-0 cursor-pointer"
        fill
        alt={product.title}
        onClick={onClick}
      />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-xl font-semibold drop-shadow-lg transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};