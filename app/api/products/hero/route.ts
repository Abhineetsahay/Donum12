import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export async function GET() {
  try {
    const heroRef = ref(db, "heroProducts");
    const snapshot = await get(heroRef);
    
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
    console.error("Error fetching hero products:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero products" },
      { status: 500 }
    );
  }
} 