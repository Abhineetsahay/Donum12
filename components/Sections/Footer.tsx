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

export const Footer = ({
  contactRef,
}: {
  contactRef: React.RefObject<HTMLElement | null>;
}) => (
  <motion.footer
    ref={contactRef}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={revealVariant}
    custom={0}
    className="relative w-full text-white py-12 mt-20 border-t border-white/20 text-sm "
  >
    <div className="flex justify-center items-center flex-col z-0">
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
          <p className="text-sm opacity-80">
            Email:
            <a href="mailto:thedonumstore@gmail.com" className="hover:text-blue-300">
              {" "}
              thedonumstore@gmail.com
            </a>
          </p>
          <p className="text-sm opacity-80">
            Phone:{" "}
            <a href="tel:+917506986013" className="hover:text-blue-300">
              +91 7506986013
            </a>
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              href="https://www.instagram.com"
              className="hover:text-blue-300 hover:cursor-pointer"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/donumm"
              className="hover:text-blue-300 hover:cursor-pointer"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
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
