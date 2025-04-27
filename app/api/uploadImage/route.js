import { NextResponse } from "next/server";
import { uploadOnCloudinary } from "./uploadOnCloudinary";
import { saveFileToDisk } from "./saveFileToDisk";


export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const tempFilePath = await saveFileToDisk(file); 
    const imageUrl = await uploadOnCloudinary(tempFilePath);

    if (!imageUrl) {
      return NextResponse.json({ message: "Failed to upload" }, { status: 500 });
    }
    console.log(imageUrl);
    
    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error("POST upload error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
