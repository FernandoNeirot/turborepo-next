import { NextRequest, NextResponse } from "next/server";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { Product } from "../../features/products";
import { db } from "../../shared/configs/firebase";
import { generateProductSlug } from "../../features/products/utils/slug";

export async function GET(request: NextRequest) {
  try {
    const products: Product[] = [];
    const q = query(collection(db, "products"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      products.push(data as Product);
    });
    return NextResponse.json({ data: products, error: null }, { status: 200 });
  } catch (error) {
    console.error("[API Route] Error fetching products:", error);
    return NextResponse.json(
      { data: null, error: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { addDoc, updateDoc } = await import("firebase/firestore");

    // Crear el producto primero
    const docRef = await addDoc(collection(db, "products"), body);

    // Generar slug con el ID real
    const slug = generateProductSlug(body.title, body.price, docRef.id);

    // Actualizar el producto con el slug generado
    await updateDoc(docRef, { slug });

    return NextResponse.json(
      { data: { id: docRef.id, ...body, slug }, error: null },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API Route] Error creating product:", error);
    return NextResponse.json(
      { data: null, error: "Error creating product" },
      { status: 500 }
    );
  }
}
