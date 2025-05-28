"use client";

import { HeroParallax } from "../../ui/hero-parallax";
import { Carousel } from "../../ui/carousel";
import { useCarousel } from "@/context/CarouselContext";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function HeroWithCarousel({
  products,
}: {
  products: Product[];
}) {
  const { carouselOpen, setCarouselOpen, startIndex, setStartIndex } = useCarousel();

  const handleProductClick = (index: number) => {
    setStartIndex(index);
    setCarouselOpen(true);
  };

  const slides = products.map((product) => ({
    title: product.name,
    button: "View Details",
    src: product.imageUrl,
    description: product.description,
    price: product.price,
  }));

  return (
    <>
      <HeroParallax
        products={products.map((product) => ({
          title: product.name,
          link: product.imageUrl,
          thumbnail: product.imageUrl,
        }))}
        onProductClick={handleProductClick}
      />

      {carouselOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-[99999] pointer-events-auto">
          <button
            className="absolute top-4 right-4 text-white text-3xl z-[99999]"
            onClick={() => setCarouselOpen(false)}
          >
            &times;
          </button>
          <Carousel slides={slides} initialIndex={startIndex} />
        </div>
      )}
      {!carouselOpen && (
        <div className="fixed inset-0 pointer-events-none"></div>
      )}
    </>
  );
}
