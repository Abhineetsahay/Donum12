"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface CarouselContextType {
  carouselOpen: boolean;
  setCarouselOpen: (open: boolean) => void;
  startIndex: number;
  setStartIndex: (index: number) => void;
}

const CarouselContext = createContext<CarouselContextType | undefined>(undefined);

export function CarouselProvider({ children }: { children: ReactNode }) {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <CarouselContext.Provider value={{ carouselOpen, setCarouselOpen, startIndex, setStartIndex }}>
      {children}
    </CarouselContext.Provider>
  );
}

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (context === undefined) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }
  return context;
} 