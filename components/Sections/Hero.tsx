"use client";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useAnimation,
} from "framer-motion";
import { useRef, useState, useEffect,} from "react";
import Image from "next/image";
import donum_logo from "@/public/donum_logo.png";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const revealVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.05, delay },
  }),
};

export const Hero = ({
  homeRef,
}: {
  homeRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const ref = useRef(null);
  const textRef = useRef(null);
  const textMotionRef = useRef<HTMLDivElement | null>(null);
  const textControls = useAnimation();
  const isTextInView = useInView(textMotionRef, { once: true });

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll();

  const backgroundPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0% 0%", "0% 30%"]
  );
  const [textBounds, setTextBounds] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = textMotionRef.current;
    if (!element) return;
  
    const observer = new ResizeObserver(() => {
      const bounds = element.getBoundingClientRect();
      setTextBounds({ x: bounds.x, y: bounds.y });
    });
  
    observer.observe(element);
  
    return () => observer.disconnect();
  }, []);
  
  const getRanges = (width: number) => {
     if (width < 350) {
    return {
      x: [0, 0],
      y: [0, 0],
      scale: [1, 1],
      rotate: [0, 0],
    }
  }
    if (width < 768)
      return { x: [0, 0], y: [0, textBounds.y ], scale: [1, 1.1], rotate: [0, 0] };
    if (width < 1024)
      return { x: [0, -180], y: [0, 675], scale: [1, 1.05], rotate: [0, 360] };
    return {
      x: [0, 300 - textBounds.x],
      y: [0, 700],
      scale: [1, 1.1],
      rotate: [0, 360],
    };
  };
  
  
  console.log(textMotionRef.current?.getBoundingClientRect());

  const {
    x: xRange,
    y: yRange,
    scale: scaleRange,
    rotate: rotateRange,
  } = getRanges(windowWidth);

  const endScroll = windowWidth < 768 ? 0.05 : 0.15;

  const x = useTransform(scrollYProgress, [0, endScroll], xRange);
  const y = useTransform(scrollYProgress, [0, endScroll], yRange);
  const scale = useTransform(scrollYProgress, [0, endScroll], scaleRange);
  const rotate = useTransform(scrollYProgress, [0, endScroll], rotateRange);

  const smoothX = useSpring(x, { stiffness: 100, damping: 8 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 8 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 8 });
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 8 });

  useEffect(() => {
    if (isTextInView) {
      textControls.start({ x: 0, opacity: 1 });
    }
  }, [isTextInView, textControls]);

  const isInView = useInView(textRef, { once: true });
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    if (isInView) setShowText(true);
  }, [isInView]);

  return (
    <>
      <motion.div
        ref={homeRef}
        initial="hidden"
        animate="visible"
        variants={revealVariant}
        custom={0}
        className="relative text-center h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          style={{ backgroundPosition }}
          className="absolute top-0 left-0 w-full h-full z-0 bg-cover bg-center"
        ></motion.div>

        <motion.div
          variants={revealVariant}
          custom={0.2}
          className="relative z-10"
        >
          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
              scale: smoothScale,
              rotate: smoothRotate,
            }}
            className="w-[150px] sm:w-[200px] md:w-[250px] mx-auto"
          >
            <Image
              src={donum_logo}
              alt="Donum Logo"
              width={250}
              height={250}
              className="object-contain rounded-3xl shadow-2xl w-full h-auto"
              priority
            />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={revealVariant}
          custom={0.4}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0] mb-4 drop-shadow-md relative z-10"
        >
          Welcome to Donum
        </motion.h1>

        <motion.div
          variants={revealVariant}
          custom={0.6}
          className="relative z-10"
        >
          <TextGenerateEffect
            words="You Dream it, We'll Make it :)"
            className="text-white text-lg sm:text-xl"
          />
        </motion.div>
      </motion.div>

      <section
        ref={ref}
        className="h-screen flex flex-col md:flex-row items-center justify-end px-6 sm:px-12 pb-8 gap-10"
      >
        <motion.div
          ref={textMotionRef}
          initial={{ x: "5%", opacity: 0 }}
          animate={textControls}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="w-full md:w-1/2 text-white text-left space-y-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Why Donum?</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Tired of gifting (and receiving!) the same old thing? Donum! Create
            custom initial keychains, boxes, necklaces, statues, and many more
            unique, personalized gifts they&apos;ll love.
          </p>
          <div ref={textRef}>
            {showText && (
              <TextGenerateEffect
                words="Something special is coming soon... 😉 Start creating today!"
                className="text-base sm:text-lg font-semibold italic"
              />
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
};
