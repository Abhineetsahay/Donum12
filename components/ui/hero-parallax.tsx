"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  // MotionValue,
} from "motion/react";
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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // const translateX = useSpring(
  //   useTransform(scrollYProgress, [0, 1], [0, 400]),
  //   springConfig
  // );
  // const translateXReverse = useSpring(
  //   useTransform(scrollYProgress, [0, 1], [0, -400]),
  //   springConfig
  // );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-400, isSmallScreen ? 500 : isMobile ? 400 : 300]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="min-h-[200vh] md:min-h-[210vh] py-12 sm:py-18 md:py-30 overflow-hidden antialiased relative flex flex-col self-auto z-0 [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div
          className={clsx(
            "flex gap-6 sm:gap-10 md:gap-20 transition-all duration-1000 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide"
          )}
        >
          {firstRow.map((product, i) => (
            <ProductCard
              product={product}
              // translate={translateX}
              key={product.title}
              onClick={() => onProductClick && onProductClick(i)}
            />
          ))}

          {secondRow.map((product, i) => (
            <ProductCard
              product={product}
              // translate={translateXReverse}
              key={product.title}
              onClick={() =>
                onProductClick && onProductClick(i + firstRow.length)
              }
            />
          ))}

          {thirdRow.map((product, i) => (
            <ProductCard
              product={product}
              // translate={translateX}
              key={product.title}
              onClick={() =>
                onProductClick &&
                onProductClick(i + firstRow.length + secondRow.length)
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
    <div className="max-w-7xl relative mx-auto py-16 md:py-36 px-4 w-full left-0 top-0">
      <h1 className="text-3xl md:text-7xl font-bold text-white drop-shadow-lg">
        The 3D <br /> Printing
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 text-gray-300 drop-shadow">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  // translate,
  onClick,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  // translate: MotionValue<number>;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      style={{
        // x: translate,
      }}
      whileHover={{
        y: -20,
      }}
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
      {/* <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-90 bg-black/80 backdrop-blur-sm pointer-events-none transition-opacity duration-300"></div> */}
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-xl font-semibold drop-shadow-lg transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};
