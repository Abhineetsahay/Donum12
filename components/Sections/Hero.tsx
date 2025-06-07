"use client";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import donum_logo from "@/public/donum_logo.png";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export const Hero = ({ homeRef }: { homeRef: React.RefObject<HTMLDivElement | null> }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const setRefs = (element: HTMLDivElement | null) => {
    sectionRef.current = element;
    if (homeRef) {
      homeRef.current = element;
    }
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v >= 0.95 && !animationDone) {
        setAnimationDone(true);
      } 
    });
    return () => unsubscribe();
  }, [scrollYProgress, animationDone]);

  const words =
    "Crafting the future of jewelry with precision 3D printing technology";

  return (
    <section
      ref={setRefs}
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center w-full overflow-visible px-4 py-28 md:px-12"
    >
      <div 
      className="overflow-hidden w-64 h-64 md:w-96 md:h-96 flex items-center justify-center relative mb-8 md:mb-0">
        <div className="absolute w-full h-full blur-2xl rounded-full z-0 animate-pulse"></div>
        <Image
          src={donum_logo}
          alt="Donum Logo"
          width={350}
          height={350}
          className="rounded-b-full object-contain w-full h-full relative z-10"
          priority
        />
      </div>
      <div
        className="w-full md:w-1/2 min-h-[350px] flex items-center justify-center md:h-screen top-0 self-start relative"
      >
        <AnimatePresence mode="wait">
          {!animationDone ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center w-full h-full px-2 md:px-8"
            >
              <div className="h-[52vh] flex flex-col items-center justify-start">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6 text-left">
                  <TextGenerateEffect words={words} />
                </h1>
                <p className="text-lg text-gray-300 mb-8 text-left">
                  Transform your jewelry designs into reality with our
                  cutting-edge 3D printing technology.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="why"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center w-full h-full px-2 md:px-8"
            >
              <div className="h-[52vh] flex flex-col items-center justify-start">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                >
                  Why Donum?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg leading-relaxed text-white mb-6 text-left"
                >
                  Tired of gifting (and receiving!) the same old thing? Donum!
                  Create custom initial keychains, boxes, necklaces, statues,
                  and many more unique, personalized gifts they&apos;ll love.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <TextGenerateEffect
                    words="Something special is coming soon... 😉 Start creating today!"
                    className="text-base sm:text-lg font-semibold italic text-white text-left"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
