import { NextResponse } from "next/server";
import { getServerUserData } from "../../shared/lib/getServerUserData";

export async function GET() {
  try {
    const user = await getServerUserData();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    return NextResponse.json({ data: user, error: null }, { status: 200 });
  } catch (error) {
    console.error("[API Route] Error fetching user:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Error interno";
    return NextResponse.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}
