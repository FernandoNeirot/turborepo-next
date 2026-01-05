import { NextRequest, NextResponse } from "next/server";
import { Product } from "../../features/products";
import { getAdminFirestore } from "../../shared/configs/firebase-admin";
import { generateProductSlug } from "../../features/products/utils/slug";

export async function GET(request: NextRequest) {
  try {
    const db = getAdminFirestore();
    const products: Product[] = [];
    const querySnapshot = await db.collection("products").get();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        ...data,
        id: doc.id,
      } as Product);
    });
    return NextResponse.json({ data: products, error: null }, { status: 200 });
  } catch (error) {
    console.error("[API Route] Error fetching products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error fetching products";
    return NextResponse.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = getAdminFirestore();
    const body = await request.json();

    // Crear el producto primero
    const docRef = await db.collection("products").add(body);

    // Generar slug con el ID real
    const slug = generateProductSlug(body.title, body.price, docRef.id);

    // Actualizar el producto con el slug generado
    await docRef.update({ slug });

    return NextResponse.json(
      { data: { id: docRef.id, ...body, slug }, error: null },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API Route] Error creating product:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error creating product";
    return NextResponse.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}
