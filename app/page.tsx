"use client";
import { useEffect, useRef, useState } from "react";
import { Hero } from "@/components/Sections/Hero";
import { Products } from "@/components/Sections/Products";
import { FAQ } from "@/components/Sections/FAQ";
import { Footer } from "@/components/Sections/Footer";
import { HomeNavbar } from "@/components/Navbar";
import { LoadingScreen } from "@/components/LoadingSceen";
import { CarouselProvider, useCarousel } from "@/context/CarouselContext";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import Testimonals from "@/components/Sections/Testimonals";
import UserForms from "@/components/Sections/UserForms";

function MainContent() {
  const { carouselOpen } = useCarousel();
  const homeRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-b from-[#06061a] via-[#0a0a28] to-[#101033] overflow-hidden">
      {!carouselOpen && (
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
      )}
      <Hero homeRef={homeRef} />
      <BackgroundAnimation />
      <Products productRef={productRef} />
      <FAQ />
      <Testimonals />
      <UserForms />
      <Footer contactRef={contactRef} />
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <CarouselProvider>
      <MainContent />
    </CarouselProvider>
  );
}
