import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "../../../../shared/configs/firebase-admin";

/**
 * GET /api/product/slug/[slug]
 * Obtiene un producto por su slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    const db = getAdminFirestore();
    const { slug } = await params;

    const querySnapshot = await db
      .collection("products")
      .where("slug", "==", slug)
      .get();

    if (querySnapshot.empty || querySnapshot.docs.length === 0) {
      return NextResponse.json(
        { data: null, error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Obtener el primer resultado (el slug debe ser único)
    const doc = querySnapshot.docs[0];
    if (!doc) {
      return NextResponse.json(
        { data: null, error: "Producto no encontrado" },
        { status: 404 }
      );
    }
    const productData = { id: doc.id, ...doc.data() };

    return NextResponse.json(
      { data: productData, error: null },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API Route] Error getting product by slug:", error);
    return NextResponse.json(
      {
        data: null,
        error:
          error instanceof Error
            ? error.message
            : "Error getting product by slug",
      },
      { status: 500 }
    );
  }
}
