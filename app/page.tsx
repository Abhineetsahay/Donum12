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

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

function MainContent({ 
  onProductsLoadingChange,
  heroProducts,
  normalProducts,
}: { 
  onProductsLoadingChange: (loading: boolean) => void;
  heroProducts: Product[];
  normalProducts: Product[];
}) {
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
      <Products 
        productRef={productRef} 
        onLoadingChange={onProductsLoadingChange}
        heroProducts={heroProducts}
        normalProducts={normalProducts}
      />
      <FAQ />
      <Testimonals />
      <UserForms />
      <Footer contactRef={contactRef} />
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);
  const [normalProducts, setNormalProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsProductsLoading(true);
      setError(null);

      try {
        const heroResponse = await fetch('/api/products/hero');
        if (!heroResponse.ok) {
          throw new Error('Failed to fetch hero products');
        }
        const heroData = await heroResponse.json();
        setHeroProducts(heroData.products);

        const normalResponse = await fetch('/api/products/normal');
        if (!normalResponse.ok) {
          throw new Error('Failed to fetch normal products');
        }
        const normalData = await normalResponse.json();
        setNormalProducts(normalData.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setIsProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading || isProductsLoading) return <LoadingScreen />;

  return (
    <CarouselProvider>
      <MainContent 
        onProductsLoadingChange={setIsProductsLoading}
        heroProducts={heroProducts}
        normalProducts={normalProducts}
      />
    </CarouselProvider>
  );
}
