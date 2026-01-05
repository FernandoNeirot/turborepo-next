import { NextRequest, NextResponse } from "next/server";
import { Product } from "../../features/products";
import { getAdminFirestore } from "../../shared/configs/firebase-admin";

export async function GET(request: NextRequest) {
  try {
    const db = getAdminFirestore();
    const userId = request.nextUrl.searchParams.get("userId");

    let querySnapshot;
    if (userId) {
      querySnapshot = await db
        .collection("products")
        .where("userId", "==", userId)
        .get();
    } else {
      querySnapshot = await db.collection("products").get();
    }

    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        ...data,
        id: doc.id,
      } as Product);
    });

    return NextResponse.json({ data: products, error: null }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error fetching products";
    return NextResponse.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}
