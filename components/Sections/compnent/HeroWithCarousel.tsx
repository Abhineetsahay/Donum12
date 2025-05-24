// Parent component that combines HeroParallax and Carousel
"use client";

import { useState } from "react";
import { HeroParallax } from "../../ui/hero-parallax";
import { Carousel } from "../../ui/carousel"; // your Carousel component from code above

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
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

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
    <div>
      <HeroParallax
        products={products.map((product) => ({
          title: product.name,
          link: product.imageUrl,
          thumbnail: product.imageUrl,
        }))}
        onProductClick={handleProductClick}
      />

      {carouselOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setCarouselOpen(false)}
          >
            &times;
          </button>
          <Carousel slides={slides} initialIndex={startIndex} />
        </div>
      )}
    </div>
  );
}
