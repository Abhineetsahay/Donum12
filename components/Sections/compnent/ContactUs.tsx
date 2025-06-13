"use client";

import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { db } from "@/lib/firebase";
import { ref, push } from "firebase/database";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ContactUsData {
  userName: string;
  userEmail: string;
  userQuery: string;
}

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactUsData>();

  const onSubmit = async (data: ContactUsData) => {
    try {
      await push(ref(db, "CustomerQuery"), {
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
    <div className="w-full py-12 text-white flex flex-col z-50">
      <ToastContainer position="top-center" theme="colored" />

      <div className="w-full max-w-4xl mx-auto px-4 flex flex-col">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Contact Us</h2>
        

        <div className="mt-8 bg-[#101033] p-6 rounded-lg shadow w-full">
        <h3 className="text-xl font-semibold text-white mb-4 opacity-0">------</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-300">Name</label>
              <Input
                id="userName"
                {...register("userName", { required: "Your name is required" })}
                className="mt-1 bg-gray-700 text-white border-gray-600"
                
              />
              {errors.userName && (
                <span className="text-red-500 text-sm">{errors.userName.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-300">Email</label>
              <Input
                id="userEmail"
                {...register("userEmail", { required: "Your name is required" })}
                className="mt-1 bg-gray-700 text-white border-gray-600"
              />
              {errors.userEmail && (
                <span className="text-red-500 text-sm">{errors.userEmail.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="userQuery" className="block text-sm font-medium text-gray-300">Let us know how we can help</label>
              <Textarea
                id="userQuery"
                rows={4}
                {...register("userQuery", { required: "Comment is required" })}
                className="mt-1 bg-gray-700 text-white border-gray-600"
              />
              {errors.userQuery && (
                <span className="text-red-500 text-sm">{errors.userQuery.message}</span>
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

export default ContactUs;
