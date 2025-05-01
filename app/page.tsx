"use client";
import { useEffect, useRef, useState } from "react";
import { Hero } from "./components/Sections/Hero";
import { Products } from "./components/Sections/Products";
import { FAQ } from "./components/Sections/FAQ";
import { Footer } from "./components/Sections/Footer";
import { HomeNavbar } from "./components/Navbar";
import { LoadingScreen } from "./components/LoadingSceen";
// import { AboutSection } from "./components/Sections/AboutSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // const [showBoxes, setShowBoxes] = useState(false);

  const homeRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      // setShowBoxes(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) return <LoadingScreen />;
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a23] via-[#0f0f3e] to-[#1c1c54] overflow-hidden">
      <HomeNavbar
        scrollToHome={() => homeRef.current?.scrollIntoView({ behavior: "smooth" })}
        scrollToProduct={() => productRef.current?.scrollIntoView({ behavior: "smooth" })}
        scrollToContact={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
      />
        <Hero homeRef={homeRef}  />
        {/* <AboutSection /> */}
      
      <Products productRef={productRef} />
      <FAQ />
      <Footer contactRef={contactRef} />
    </div>
  );
}
