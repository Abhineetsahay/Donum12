"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const auth = getAuth(app);

interface FormData {
  email: string;
  password: string;
}

const Page = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login successful! 🎉");
      router.push("/AdminDashboard");
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full bg-[#0a0a23] flex items-center justify-center relative">
      <ToastContainer position="top-center" theme="colored" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4 w-[26rem]"
      >
        <h1 className="text-xl font-semibold text-center text-black">
          Enter Email and Password
        </h1>

        <Input
          type="email"
          placeholder="Email"
          className="w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

        <Input
          type="password"
          placeholder="Password"
          className="w-full"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

        <Button type="submit" className="w-full mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Page;
