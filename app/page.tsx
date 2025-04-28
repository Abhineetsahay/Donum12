"use client";

import { Boxes } from "@/app/components/ui/background-boxes";
import donum_logo from "@/public/donum_logo.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { dummyProducts } from "./data/data";
import { HoverEffect } from "@/app/components/ui/card-hover-effect";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a23] via-[#0f0f3e] to-[#1c1c54] overflow-hidden">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-center h-screen flex flex-col items-center justify-center"
      >
        <Boxes className="absolute top-0 left-0 w-full h-full z-0" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10"
        >
          <Image
            src={donum_logo}
            alt="Donum Logo"
            width={250}
            height={250}
            className="mb-8 object-contain rounded-3xl shadow-2xl"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0] mb-4 drop-shadow-md relative z-10"
        >
          Welcome to Donum
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative z-10"
        >
          <TextGenerateEffect
            words="You Dream it, We'll Make it :)"
            className="text-white"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="bg-[#0d0d2b] w-full pt-10 pb-20 px-4 z-10 rounded-t-3xl shadow-inner shadow-blue-900"
      >
        <h6 className="text-2xl text-white font-semibold mb-8 text-center">
          Available Products
        </h6>
        <HoverEffect items={dummyProducts} className="h-1/2" />
      </motion.div>

      <div className="bg-[#0d0d2b] w-full pt-10 pb-20 px-4 z-10 rounded-t-3xl shadow-inner shadow-blue-900">
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-2xl mx-auto my-12 px-4"
      >
        <AccordionItem value="item-1" className="border-b border-slate-700">
          <AccordionTrigger className="text-white font-semibold text-lg hover:text-blue-400 transition-colors duration-300">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400 text-sm leading-relaxed bg-[#0f0f3e] px-4 py-3 rounded-b-2xl">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-b border-slate-700">
          <AccordionTrigger className="text-white font-semibold text-lg hover:text-blue-400 transition-colors duration-300">
            Is it styled?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400 text-sm leading-relaxed bg-[#0f0f3e] px-4 py-3 rounded-b-2xl">
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-b border-slate-700">
          <AccordionTrigger className="text-white font-semibold text-lg hover:text-blue-400 transition-colors duration-300">
            Is it animated?
          </AccordionTrigger>
          <AccordionContent className="text-slate-400 text-sm leading-relaxed bg-[#0f0f3e] px-4 py-3 rounded-b-2xl">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      </div>
    </div>
  );
}
