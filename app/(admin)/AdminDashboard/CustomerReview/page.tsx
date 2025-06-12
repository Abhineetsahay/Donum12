"use client";

import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { db } from "@/lib/firebase";
import { ref, push } from "firebase/database";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormData {
  productName: string;
  reviewerName: string;
  comment: string;
}

const ProductReviews = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>();

  const onSubmit = async (data: ReviewFormData) => {
    try {
      await push(ref(db, "customerReviews"), {
        ...data,
        createdAt: new Date().toISOString(),
      });

      toast.success("Review submitted successfully! 🎉");
      reset();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="w-full py-12 bg-[#0a0a23] h-screen text-white flex flex-col z-[60] relative">
      <ToastContainer position="top-center" theme="colored" />

      <div className="w-full max-w-4xl mx-auto px-4 flex flex-col">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Customer Review</h2>
        

        <div className="mt-8 bg-[#101033] p-6 rounded-lg shadow w-full">
          <h3 className="text-xl font-semibold text-white mb-4">Leave a Review</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-300">Product Name</label>
              <Input
                id="productName"
                {...register("productName", { required: "Product name is required" })}
                className="mt-1 bg-gray-700 text-white border-gray-600"
              />
              {errors.productName && (
                <span className="text-red-500 text-sm">{errors.productName.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-300">Your Name</label>
              <Input
                id="reviewerName"
                {...register("reviewerName", { required: "Your name is required" })}
                className="mt-1 bg-gray-700 text-white border-gray-600"
              />
              {errors.reviewerName && (
                <span className="text-red-500 text-sm">{errors.reviewerName.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-300">Comment</label>
              <Textarea
                id="comment"
                rows={4}
                {...register("comment", { required: "Comment is required" })}
                className="mt-1 bg-gray-700 text-white border-gray-600"
              />
              {errors.comment && (
                <span className="text-red-500 text-sm">{errors.comment.message}</span>
              )}
            </div>

            <Button
              type="submit"
              className="mt-2 bg-indigo-600 hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProductReviews;
