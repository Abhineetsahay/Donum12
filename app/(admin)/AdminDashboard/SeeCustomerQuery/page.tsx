"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  ref,
  onValue,
  query,
  orderByChild,
} from "firebase/database";

interface Review {
  id: string;
  userName: string;
  userEmail: string;
  userQuery: string;
  createdAt: string;
}

const Page = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const reviewsRef = ref(db, "CustomerQuery");
    const recentReviewsQuery = query(
      reviewsRef,
      orderByChild("createdAt"),
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

  return (
    <section className="bg-[#0a0a23] min-h-screen w-full p-6 flex flex-col items-center">
      <h1 className="text-white text-4xl font-semibold mb-8 text-center">
        Recent Customer Queries
      </h1>

      {reviews.length === 0 ? (
        <p className="text-white text-lg">No queries found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#1a1a40] rounded-lg shadow-lg p-5 text-white border border-[#2a2a60] transition-transform hover:scale-105"
            >
              <div className="mb-3">
                <span className="font-bold text-[18px]">Query:</span>
                <p className="ml-2 text-sm">{review.userQuery}</p>
              </div>
              <div className="mb-2">
                <span className="font-bold text-[18px]">Name:</span>
                <p className="ml-2 text-sm">{review.userName}</p>
              </div>
              <div>
                <span className="font-bold text-[18px]">Email:</span>
                <p className="ml-2 text-sm">{review.userEmail}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Page;
