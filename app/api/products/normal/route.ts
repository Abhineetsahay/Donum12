import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export async function GET() {
  try {
    const normalRef = ref(db, "normalProducts");
    const snapshot = await get(normalRef);
    
    if (!snapshot.exists()) {
      return NextResponse.json({ products: [] }, { status: 200 });
    }

    const data = snapshot.val();
    const products = Object.entries(data).map(([id, value]) => ({
      id,
      ...(value as Record<string, unknown>),
    }));

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching normal products:", error);
    return NextResponse.json(
      { error: "Failed to fetch normal products" },
      { status: 500 }
    );
  }
} 