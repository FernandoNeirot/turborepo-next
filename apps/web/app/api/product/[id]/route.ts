import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../shared/configs/firebase";
import { getAdminStorage } from "../../../shared/configs/firebase-admin";

/**
 * GET /api/product/[id]
 * Obtiene un producto por su ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json(
        { data: null, error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const productData = { id: productSnap.id, ...productSnap.data() };

    return NextResponse.json(
      { data: productData, error: null },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API Route] Error getting product:", error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : "Error getting product",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json(
        { data: null, error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    const productData = productSnap.data();

    if (productData.imageUrl) {
      try {
        const imageUrl = productData.imageUrl as string;
        const imagePath = extractImagePathFromUrl(imageUrl);

        if (imagePath) {
          const adminStorage = getAdminStorage();
          const bucket = adminStorage.bucket();
          const fileRef = bucket.file(imagePath);

          const [exists] = await fileRef.exists();
          if (exists) {
            await fileRef.delete();
          }
        }
      } catch (storageError) {
        console.error(
          "[API Route] Error al eliminar imagen de Storage:",
          storageError
        );
      }
    }

    // Eliminar el producto de Firestore
    const { deleteDoc } = await import("firebase/firestore");
    await deleteDoc(productRef);

    return NextResponse.json({ data: { id }, error: null }, { status: 200 });
  } catch (error) {
    console.error("[API Route] Error deleting product:", error);
    return NextResponse.json(
      {
        data: null,
        error:
          error instanceof Error ? error.message : "Error deleting product",
      },
      { status: 500 }
    );
  }
}

/**
 * Extrae la ruta del archivo en Storage desde una URL de Firebase Storage
 * Soporta dos formatos:
 * 1. https://storage.googleapis.com/{bucket}/{path}
 * 2. https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{encodedPath}?alt=media&token=...
 */
function extractImagePathFromUrl(url: string): string | null {
  try {
    // Formato: https://storage.googleapis.com/{bucket}/{path}
    // Ejemplo: https://storage.googleapis.com/bucket/products/image.webp
    // Necesitamos extraer: products/image.webp
    if (url.includes("storage.googleapis.com")) {
      const pathMatch = url.match(/storage\.googleapis\.com\/[^/]+\/(.+)$/);
      if (pathMatch && pathMatch[1]) {
        return decodeURIComponent(pathMatch[1]);
      }
    }

    // Formato: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{encodedPath}?alt=media&token=...
    if (url.includes("firebasestorage.googleapis.com")) {
      const pathMatch = url.match(/\/o\/(.+?)(\?|$)/);
      if (pathMatch && pathMatch[1]) {
        // Decodificar la ruta que viene codificada
        return decodeURIComponent(pathMatch[1].replace(/%2F/g, "/"));
      }
    }

    return null;
  } catch (error) {
    console.error("[extractImagePathFromUrl] Error al parsear URL:", error);
    return null;
  }
}

/**
 * PUT /api/product/[id]
 * Actualiza un producto por su ID
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const body = await request.json();

    // Verificar que el producto existe
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json(
        { data: null, error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el producto
    const { updateDoc } = await import("firebase/firestore");
    await updateDoc(productRef, {
      ...body,
      updatedAt: new Date(),
    });

    // Obtener el producto actualizado
    const updatedSnap = await getDoc(productRef);
    const updatedData = { id: updatedSnap.id, ...updatedSnap.data() };

    return NextResponse.json(
      { data: updatedData, error: null },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API Route] Error updating product:", error);
    return NextResponse.json(
      {
        data: null,
        error:
          error instanceof Error ? error.message : "Error updating product",
      },
      { status: 500 }
    );
  }
}
