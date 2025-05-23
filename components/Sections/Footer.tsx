"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const revealVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

export const Footer = ({ contactRef }: { contactRef: React.RefObject<HTMLElement|null> }) => (
  <motion.footer
    ref={contactRef}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={revealVariant}
    custom={0}
    className="relative w-full  text-white py-12 mt-20 z-10 border-t border-white/20 text-sm "
  >
    <div className="flex justify-center items-center flex-col z-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        <div>
          <h2 className="text-xl font-bold mb-4">Donum</h2>
          <p className="text-sm opacity-80">
            Donum is where creativity meets gifting. We bring your dreams to life with custom, heartfelt creations.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <p className="text-sm opacity-80">Email: hello@donum.com</p>
          <p className="text-sm opacity-80">Phone: +91 7506986013</p>
          <div className="flex gap-4 mt-4">
            <Link href="https://www.instagram.com/_.donum/" className="hover:text-blue-300 hover:cursor-pointer">
              Instagram
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 w-screen border-t border-white/20 pt-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Donum. All rights reserved.
      </div>
    </div>
  </motion.footer>
);
