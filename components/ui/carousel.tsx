"use client";
// import { IconArrowNarrowRight } from "@tabler/icons-react";
import Image from "next/image";
import { useState, useRef, useId, useEffect } from "react";
import { motion } from "framer-motion";
import { useCarousel } from "@/context/CarouselContext";

interface SlideData {
  title: string;
  button: string;
  src: string;
  description: string;
  price: number;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current }: SlideProps) => {
  const [expanded, setExpanded] = useState(false);
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = e.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = e.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const { src, button, title, description, price } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <motion.li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <Image
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{ opacity: current === index ? 1 : 0.5 }}
            width={200}
            height={200}
            alt={title}
            src={src}
            loading="eager"
            decoding="sync"
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        {expanded ? (
          <article className="absolute inset-0 z-20 flex flex-col justify-between bg-black/70 text-white p-6 rounded-lg">
            <motion.div
              className="text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <div className="mb-6 break-words whitespace-pre-line flex flex-col gap-1.5">
                <span className="text-[20px] font-bold">Description:-</span>
                {description}
              </div>
              <p className="text-lg font-semibold">Price: ₹{price}</p>
            </motion.div>
            <button
              className="mt-auto self-end px-4 py-2 bg-white text-black rounded-lg"
              onClick={() => setExpanded(false)}
            >
              Close
            </button>
          </article>
        ) : (
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 z-10">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-lg">₹{price}</p>
            <button
              className="px-4 py-2 bg-white text-black text-sm rounded-xl shadow hover:shadow-md transition"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(true);
              }}
            >
              {button}
            </button>
          </div>
        )}
      </motion.li>
    </div>
  );
};

// interface CarouselControlProps {
//   type: string;
//   title: string;
//   handleClick: () => void;
// }

// const CarouselControl = ({
//   type,
//   title,
//   handleClick,
// }: CarouselControlProps) => {
//   return (
//     <button
//       className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
//         type === "previous" ? "rotate-180" : ""
//       }`}
//       title={title}
//       onClick={handleClick}
//     >
//       <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
//     </button>
//   );
// };

interface CarouselProps {
  slides: SlideData[];
  initialIndex?: number;
}

export function Carousel({ slides, initialIndex = 0 }: CarouselProps) {
  const [current, setCurrent] = useState(initialIndex);
  const { setCarouselOpen } = useCarousel();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(initialIndex);
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollLeft = initialIndex * slideWidth;
    }
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCarouselOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setCarouselOpen]);

  const handleWheel = (e: React.WheelEvent) => {
    if (carouselRef.current) {
      e.preventDefault();
      carouselRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      ref={carouselRef}
      className="relative min-w-full h-11/12 flex items-center pt-14 overflow-x-auto scrollbar-hide"
      aria-labelledby={`carousel-heading-${id}`}
      onWheel={handleWheel}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: 'none',
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      {/* <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div> */}
    </div>
  );
}
