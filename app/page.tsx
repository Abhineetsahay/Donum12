"use client";

import { Boxes } from "@/app/components/ui/background-boxes";
import donum_logo from "@/public/donum_logo.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { dummyProducts } from "./data/data";
import { HoverEffect } from "@/app/components/ui/card-hover-effect";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { HomeNavbar } from "./components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/app/components/LoadingSceen";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const FaqAccordian: FAQ[] = [
  {
    id: 1,
    question: "How do I place an order?",
    answer:
      "Reach out to us via email or phone to get started with your custom gift.",
  },
  {
    id: 2,
    question:
      "What payment methods do you accept? And what is the estimated cost?",
    answer:
      "We accept payments via UPI, credit/debit cards, and bank transfers. Pricing varies depending on the items ordered and the chosen delivery timeframe. We strive to maintain competitive and transparent pricing.",
  },
  {
    id: 3,
    question: "Can I customize my gift?",
    answer:
      "Yes! You can provide customization details while placing your order.",
  },
  {
    id: 4,
    question: "How long does shipping take?",
    answer:
      "Shipping typically occurs within 1 business day of product completion. Expedited shipping options are available at an additional cost.",
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a23] via-[#0f0f3e] to-[#1c1c54] overflow-hidden">
      <HomeNavbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-center h-screen flex flex-col items-center justify-center"
      >
        <Boxes className="absolute top-0 left-0 w-full h-full z-0" />

        <div className="absolute inset-0 z-0"></div>

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
            loading="lazy"
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
        className="bg-[#0d0d2b] w-full pt-10 pb-20 px-4 z-10 shadow-blue-900"
      >
        <h6 className="text-2xl text-white font-semibold mb-8 text-center">
          Available Products
        </h6>
        <HoverEffect items={dummyProducts} className="h-1/2" />
      </motion.div>

      <div className="bg-[#0d0d2b] w-full pt-10 pb-20 px-4 z-10 shadow-blue-900">
        <h6 className="text-2xl text-white font-semibold mb-8 text-center">
          Frquently Asked Questions
        </h6>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-2xl mx-auto my-12 px-4"
        >
          {FaqAccordian.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={`item-${faq.id}`}
              className="border-b border-slate-700"
            >
              <AccordionTrigger className="text-white font-semibold text-lg hover:text-blue-400 transition-colors duration-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 text-sm leading-relaxed bg-[#0f0f3e] px-4 py-3 rounded-b-2xl">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <footer className="relative w-full bg-gradient-to-r from-[#1c1c54] via-[#2b2b80] to-[#3d3da8] text-white py-12 mt-20 z-10">
        <div className="flex justify-center items-center flex-col z-10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
            <div>
              <h2 className="text-xl font-bold mb-4">Donum</h2>
              <p className="text-sm opacity-80">
                Donum is where creativity meets gifting. We bring your dreams to
                life with custom, heartfelt creations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              <p className="text-sm opacity-80">Email: hello@donum.com</p>
              <p className="text-sm opacity-80">Phone: +91 98765 43210</p>
              <div className="flex gap-4 mt-4">
                <Link
                  href="https://www.instagram.com/_.donum/"
                  className="hover:text-blue-300 hover:cursor-pointer"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10 w-screen border-t border-white/20 pt-6 text-center text-sm text-white/60">
            © {new Date().getFullYear()} Donum. All rights reserved.
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20">
          <Boxes className="w-full h-full" />
        </div>
      </footer>
    </div>
  );
}
