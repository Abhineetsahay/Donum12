"use client";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FaqAccordian = [
  {
    id: 1,
    question: "How do I place an order?",
    answer: "Reach out to us via email or phone to get started with your custom gift.",
  },
  {
    id: 2,
    question: "What payment methods do you accept? And what is the estimated cost?",
    answer: "We accept payments via UPI, credit/debit cards, and bank transfers...",
  },
  {
    id: 3,
    question: "Can I customize my gift?",
    answer: "Yes! You can provide customization details while placing your order.",
  },
  {
    id: 4,
    question: "How long does shipping take?",
    answer: "Shipping typically occurs within 1 business day of product completion...",
  },
];

const revealVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

export const FAQ = () => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={revealVariant}
    custom={0}
    className=" w-full pt-10 pb-20 px-4 z-10"
  >
    <motion.h6
      variants={revealVariant}
      custom={0.1}
      className="text-2xl text-white font-semibold mb-8 text-center"
    >
      Frequently Asked Questions
    </motion.h6>

    <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto my-12 px-4">
      {FaqAccordian.map((faq, i) => (
        <motion.div key={faq.id} variants={revealVariant} custom={0.2 + i * 0.1}>
          <AccordionItem value={`item-${faq.id}`} className="border-b border-slate-700">
            <AccordionTrigger className="text-white font-semibold text-lg hover:text-blue-400 transition-colors duration-300">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-400 text-sm leading-relaxed bg-[#0f0f3e] px-4 py-3 rounded-b-2xl">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  </motion.section>
);
