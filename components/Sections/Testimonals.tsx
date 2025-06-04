"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue, query, limitToLast, orderByChild } from "firebase/database";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";

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
    const recentReviewsQuery = query(reviewsRef, orderByChild("createdAt"), limitToLast(3));

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

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealVariant}
      custom={0}
      className="w-full py-20 px-4 z-10"
    >
      <motion.h2
        variants={revealVariant}
        custom={0.1}
        className="text-3xl text-white font-bold mb-12 text-center"
      >
        What Our Customers Say
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            variants={revealVariant}
            custom={0.2 + index * 0.1}
          >
            <Card className="bg-[#0a0a23] border-slate-700 h-full">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {review.reviewerName}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Product: {review.productName}
                    </p>
                    <p className="text-slate-300">{review.comment.slice(0, 25)}</p>
                  </div>
                  <div className="mt-4 text-slate-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Testimonals;
