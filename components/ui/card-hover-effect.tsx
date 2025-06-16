import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const HoverEffect = ({
  items,
  className,
  isHero,
}: {
  items: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  }[];
  className?: string;
  isHero: boolean;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleDescription = (id: string) => {
    setExpanded((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-12 px-2 sm:px-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.imageUrl}
          className="relative block p-2 h-full w-full group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  backgroundColor: "#1e1b4b",
                  transition: { duration: 0.3 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>

          <Card className="relative z-10">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Link href={item.imageUrl}>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
            <div className="h-full flex flex-col justify-center">
              <CardTitle>{item.name}</CardTitle>
              <p className="mt-2 text-lg font-semibold text-slate-200">
                ₹{item.price}
              </p>
              <motion.div
                layout
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Carddescription>
                  {isHero || expanded.has(item.id) ? (
                    <div className="overflow-auto">
                      <div className="mb-6 break-words whitespace-pre-line flex flex-col gap-1.5">
                        {item.description}
                      </div>
                      {!isHero && (
                        <button
                          onClick={() => toggleDescription(item.id)}
                          className="text-blue-500 font-semibold ml-1"
                        >
                          See Less
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      {item.description.slice(0, 100)}...{" "}
                      <button
                        onClick={() => toggleDescription(item.id)}
                        className="text-blue-500 font-semibold ml-1"
                      >
                        See More
                      </button>
                    </>
                  )}
                </Carddescription>
              </motion.div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-3xl p-4 sm:p-6 bg-[#0a0a23] border border-slate-700 shadow-md transition-all duration-300 hover:shadow-2xl h-[400px] flex flex-col overflow-y-auto scrollbar-hide",
        className
      )}
    >
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "mt-2 sm:mt-4 text-slate-100 text-lg sm:text-xl font-bold tracking-wide line-clamp-1",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const Carddescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-1 sm:mt-2 text-slate-400 tracking-wide leading-relaxed text-xs sm:text-sm break-words pr-2 line-clamp-3",
        className
      )}
    >
      {children}
    </p>
  );
};
