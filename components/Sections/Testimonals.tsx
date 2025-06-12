"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  ref,
  onValue,
  query,
  limitToLast,
  orderByChild,
} from "firebase/database";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

interface Review {
  id: string;
  productName: string;
  reviewerName: string;
  comment: string;
  createdAt: string;
}

const revealVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const Testimonals = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const reviewsRef = ref(db, "customerReviews");
    const recentReviewsQuery = query(
      reviewsRef,
      orderByChild("createdAt"),
      limitToLast(8)
    );

    const unsubscribe = onValue(recentReviewsQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loaded = Object.entries(data)
          .map(([id, value]) => ({
            id,
            ...(value as Omit<Review, "id">),
          }))
          .reverse();
        setReviews(loaded);
      }
    });

    return () => unsubscribe();
  }, []);

  const movingCardsItems = reviews.map((review) => ({
    quote: review.comment,
    name: review.reviewerName,
    title: review.productName,
  }));

  return (
    // <motion.section
    //   initial="hidden"
    //   whileInView="visible"
    //   viewport={{ once: true, amount: 0.2 }}
    //   variants={revealVariant}
    //   custom={0}
    //   className="z-10"
    // >
    <>
      <motion.h2
        variants={revealVariant}
        custom={0.1}
        className="text-3xl text-white font-bold mb-12 text-center"
      >
        What Our Customers Say
      </motion.h2>
      <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={movingCardsItems}
          direction="right"
          speed="fast"
        />
      </div>
      </>
    // </motion.section>
  );
};

export default Testimonals;
