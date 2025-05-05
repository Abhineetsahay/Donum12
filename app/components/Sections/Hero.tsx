"use client";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import donum_logo from "@/public/donum_logo.png";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const revealVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.1, delay },
  }),
};

export const Hero = ({
  homeRef,
}: {
  homeRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { scrollYProgress } = useScroll();
  const backgroundPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0% 0%", "0% 40%"]
  );

  const ref = useRef(null);
  const { scrollYProgress: aboutScrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const textX = useTransform(aboutScrollYProgress, [0, 1], ["50%", "0%"]);
  const opacity = useTransform(aboutScrollYProgress, [0, 1], [0, 1]);

  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const xRange = windowWidth < 768 ? [0, 0] : [0, -250];
  const yRange = windowWidth < 768 ? [0, 950] : [0, 925];

  const x = useTransform(scrollYProgress, [0, 0.25], xRange);
  const y = useTransform(scrollYProgress, [0, 0.25], yRange);
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 1.1]);
  const rotate = useTransform(scrollYProgress, [0, 0.25], [0, 360]);

  const smoothX = useSpring(x, { stiffness: 300, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 15 });
  const smoothScale = useSpring(scale, { stiffness: 300, damping: 15 });
  const smoothRotate = useSpring(rotate, { stiffness: 300, damping: 15 });

  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true });
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowText(true);
    }
  }, [isInView]);

 

  return (
    <>
      <motion.div
        ref={homeRef}
        initial="hidden"
        animate="visible"
        variants={revealVariant}
        custom={0}
        className="relative text-center h-screen flex flex-col items-center justify-center"
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
            className="relative z-10"
          >
            <Image
              src={donum_logo}
              alt="Donum Logo"
              width={250}
              height={250}
              className="mb-8 object-contain rounded-3xl shadow-2xl"
              loading="lazy"
            />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={revealVariant}
          custom={0.4}
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0] mb-4 drop-shadow-md relative z-10"
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
            className="text-white"
          />
        </motion.div>
      </motion.div>

      <section
        ref={ref}
        className="h-screen flex flex-col md:flex-row items-center justify-end px-8 pb-4 gap-10"
      >
        {/* <div ref={divRef} className="h-6 bg-transparent border border-dashed border-gray-300">
        </div> */}
        <motion.div
          style={{ x: textX, opacity }}
          className="w-full md:w-1/2 text-white text-left space-y-8"
        >
          <h2 className="text-4xl font-bold">Why Donum?</h2>
          <p className="text-lg leading-relaxed">
            Tired of gifting (and receiving!) the same old thing? Donum! Create
            custom initial keychains, boxes, necklaces, statues, and many more
            unique, personalized gifts they&apos;ll love.
          </p>
          <div ref={textRef}>
            {showText && (
              <TextGenerateEffect
                words="Something special is coming soon... 😉 Start creating today!"
                className="text-lg font-semibold italic"
              />
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
};
