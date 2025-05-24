"use client";
import { useEffect, useRef, useState } from "react";
import { Hero } from "@/components/Sections/Hero";
import { Products } from "@/components/Sections/Products";
import { FAQ } from "@/components/Sections/FAQ";
import { Footer } from "@/components/Sections/Footer";
import { HomeNavbar } from "@/components/Navbar";
import { LoadingScreen } from "@/components/LoadingSceen";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { ShootingStars } from "@/components/ui/shooting-stars";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const homeRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) return <LoadingScreen />;
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-[#06061a] via-[#0a0a28] to-[#101033] overflow-hidden">
      <HomeNavbar
        scrollToHome={() =>
          homeRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        scrollToProduct={() =>
          productRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        scrollToContact={() =>
          contactRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <Hero />
      <ShootingStars className="absolute top-0 left-0 w-full h-full" minDelay={500} maxDelay={1500} starWidth={20}/>
      
      <BackgroundAnimation />
      <Products productRef={productRef} />
      <FAQ />
      <Footer contactRef={contactRef} />
    </div>
  );
}
