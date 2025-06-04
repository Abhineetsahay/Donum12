"use client";

import { motion } from "motion/react";
import { useRef } from "react";

interface BackgroundAnimationProps {
  minDelay?: number;
}

const BackgroundAnimation = ({ minDelay = 1.5 }: BackgroundAnimationProps) => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-40 h-40 rounded-full bg-blue-500/10 backdrop-blur-xl"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            zIndex: 0,
          }}
          animate={{ y: [0, -80, 0], opacity: [0.4, 0.6, 0.4] }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * minDelay,
          }}
          drag
          dragConstraints={containerRef}
          dragElastic={0.2}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;
