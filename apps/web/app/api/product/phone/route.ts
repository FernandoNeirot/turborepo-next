import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "../../../shared/configs/firebase-admin";

/**
 * PUT /api/product/phone
 * Actualiza el teléfono en todos los productos de un usuario
 * Body: { userId: string, phone: string }
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const db = getAdminFirestore();
    const body = await request.json();
    const { userId, phone } = body;

    if (!userId || !phone) {
      return NextResponse.json(
        { data: null, error: "userId y phone son requeridos" },
        { status: 400 }
      );
    }

    // Buscar todos los productos del usuario
    const querySnapshot = await db
      .collection("products")
      .where("userId", "==", userId)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json(
        { data: { updated: 0 }, error: null },
        { status: 200 }
      );
    }

    // Actualizar todos los productos en un batch
    const batch = db.batch();
    let updatedCount = 0;

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        phone,
        updatedAt: new Date(),
      });
      updatedCount++;
    });

    // Ejecutar el batch
    await batch.commit();

    return NextResponse.json(
      {
        data: {
          updated: updatedCount,
          message: `Se actualizaron ${updatedCount} producto(s)`,
        },
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API Route] Error updating phone number:", error);
    return NextResponse.json(
      {
        data: null,
        error:
          error instanceof Error
            ? error.message
            : "Error al actualizar el número de teléfono",
      },
      { status: 500 }
    );
  }
}
