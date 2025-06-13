"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { app } from "@/lib/firebase";
import { getDatabase, ref, push } from "firebase/database";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAdminAuth } from "@/context/AdminAuthContext";


const db = getDatabase(app);

interface FormData {
  name: string;
  description: string;
  price: number;
  image: FileList;
  type: "hero" | "normal";
}

const Page = () => {
  const { user, loading } = useAdminAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const imageFile = watch("image")?.[0];
  
  useEffect(() => {
    if (imageFile) {
      const preview = URL.createObjectURL(imageFile);
      setPreviewUrl(preview);

      return () => URL.revokeObjectURL(preview);
    }
  }, [imageFile]);

  const onSubmit = async (data: FormData) => {
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

    const productPath = data.type === "hero" ? "heroProducts" : "normalProducts";

    await push(ref(db, productPath), {
      name: data.name,
      description: data.description,
      price: data.price,
      type: data.type,
      imageUrl,
      createdBy: user?.uid,
      createdAt: new Date().toISOString(),
    });

    reset();
    setPreviewUrl(null);
    toast.success("Product added successfully! 🚀");
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full bg-[#0a0a23] flex items-center justify-center relative">
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
          {errors.name && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}

          <Input
            type="number"
            placeholder="Price"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">Price is required</span>
          )}
          <div>
            <Select
              onValueChange={(value) => {
                setValue("type", value as "hero" | "normal");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Product Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hero">Hero Product</SelectItem>
                <SelectItem value="normal">Normal Product</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <span className="text-red-500 text-sm">
                Product type is required
              </span>
            )}
          </div>

          <Textarea
            placeholder="Product description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              description are required
            </span>
          )}

          <Input
            type="file"
            accept="image/png, image/jpeg"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <span className="text-red-500 text-sm">Image is required</span>
          )}

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
