// dummyProducts.ts

export interface Product {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  }
  
  export const dummyProducts: Product[] = [
    {
      name: "Vintage Clock",
      price: 49.99,
      description: "A beautifully crafted vintage clock to add a classic touch to your room.",
      imageUrl: "https://res.cloudinary.com/abhineetsahay/image/upload/v1745749255/Donum/ziml1rgvzgu8u8gtispc.png",
    },
    {
      name: "Leather Wallet",
      price: 29.99,
      description: "Premium quality leather wallet with multiple compartments.",
      imageUrl: "https://res.cloudinary.com/abhineetsahay/image/upload/v1745749255/Donum/ziml1rgvzgu8u8gtispc.png",
    },
    {
      name: "Wireless Headphones",
      price: 89.99,
      description: "High-fidelity wireless headphones with noise cancellation.",
      imageUrl: "https://res.cloudinary.com/abhineetsahay/image/upload/v1745749255/Donum/ziml1rgvzgu8u8gtispc.png",
    },
    {
      name: "Mountain Bike",
      price: 499.99,
      description: "Durable and lightweight mountain bike for all terrains.",
      imageUrl: "https://res.cloudinary.com/abhineetsahay/image/upload/v1745749255/Donum/ziml1rgvzgu8u8gtispc.png",
    },
    {
      name: "Coffee Maker",
      price: 59.99,
      description: "Brew the perfect cup every time with this easy-to-use coffee maker.",
      imageUrl: "https://res.cloudinary.com/abhineetsahay/image/upload/v1745749255/Donum/ziml1rgvzgu8u8gtispc.png",
    },
  ];
  