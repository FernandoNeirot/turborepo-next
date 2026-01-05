import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "../../../shared/configs/firebase-admin";

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
    try {
      const userRef = db.collection("users").doc(userId);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        await userRef.update({
          phone,
          updatedAt: new Date(),
        });
        console.log(
          `[API Route] Usuario ${userId} actualizado con teléfono: ${phone}`
        );
      } else {
        await userRef.set(
          {
            phone,
            updatedAt: new Date(),
          },
          { merge: true }
        );
        console.log(
          `[API Route] Usuario ${userId} creado con teléfono: ${phone}`
        );
      }
    } catch (userError) {
      console.error("[API Route] Error actualizando usuario:", userError);
    }
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

    const batch = db.batch();
    let updatedCount = 0;

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        phone,
        updatedAt: new Date(),
      });
      updatedCount++;
    });

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
