"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-10 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animationDuration: speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {/* First set of items */}
        {items.map((item, idx) => (
          <div
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl bg-[#18182a] shadow-md px-8 py-6 md:w-[450px] text-white"
            key={`first-${idx}`}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-xl leading-[1.6] font-normal italic text-white overflow-auto scrollbar-hide">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-[18px] leading-[1.6] font-bold text-blue-500">
                   - {item.name}
                  </span>
                </span>
              </div>
            </blockquote>
          </div>
        ))}
        {/* Duplicate set of items for seamless loop */}
        {items.map((item, idx) => (
          <div
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl bg-[#18182a] shadow-md px-8 py-6 md:w-[450px] text-white"
            key={`second-${idx}`}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className="relative z-20 text-xl leading-[1.6] font-normal italic text-white overflow-auto scrollbar-hide">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-[18px] leading-[1.6] font-bold text-blue-500">
                   - {item.name}
                  </span>
                </span>
              </div>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};
