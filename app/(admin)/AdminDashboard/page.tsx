"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { app } from "@/lib/firebase";
import { getDatabase, ref, push } from "firebase/database";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const auth = getAuth(app);
const db = getDatabase(app);

interface FormData {
  name: string;
  details: string;
  price: number;
  image: FileList;
}

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>();

  const imageFile = watch("image")?.[0];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!user.displayName) {
          await updateProfile(user, { displayName: "Biswadeep Dev" });
        }
        setUser(user);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (imageFile) {
      const preview = URL.createObjectURL(imageFile);
      setPreviewUrl(preview);

      return () => URL.revokeObjectURL(preview);
    }
  }, [imageFile]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!data.image?.[0]) {
        toast.error("Please upload an image.");
        return;
      }

      const formDataToUpload = new FormData();
      formDataToUpload.append("file", data.image[0]);
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formDataToUpload,
      });

      const uploadData = await response.json();
      const imageUrl = uploadData.url;

      if (!imageUrl) {
        throw new Error("Image upload failed");
      }

      await push(ref(db, "products"), {
        name: data.name,
        details: data.details,
        price: data.price,
        imageUrl,
        createdBy: user?.uid,
        createdAt: new Date().toISOString(),
      });

      reset();
      setPreviewUrl(null);
      toast.success("Product added successfully! 🚀");

    } catch (error) {
      console.error("Error uploading or saving product:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full bg-[#ffebeb] flex items-center justify-center relative">
      <ToastContainer position="top-center" theme="colored" /> 

      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-6 w-[30rem]">
        <h1 className="text-2xl font-semibold text-center text-black">
          Welcome, {user?.displayName}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Product Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-red-500 text-sm">Name is required</span>}

          <Input
            type="number"
            placeholder="Price"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && <span className="text-red-500 text-sm">Price is required</span>}

          <Textarea
            placeholder="Product Details"
            {...register("details", { required: true })}
          />
          {errors.details && <span className="text-red-500 text-sm">Details are required</span>}

          <Input
            type="file"
            accept="image/png, image/jpeg"
            {...register("image", { required: true })}
          />
          {errors.image && <span className="text-red-500 text-sm">Image is required</span>}

          {previewUrl && (
            <div className="relative w-full h-60 rounded-lg overflow-hidden border">
              <Image
                src={previewUrl}
                alt="Selected Preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          <Button type="submit" className="mt-2 w-full">
            Add Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
