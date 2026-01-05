import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import type { User } from "firebase/auth";

export async function syncUser(user: User): Promise<void> {
  const userRef = doc(db, "users", user.uid);

  try {
    // Intentar leer el documento primero
    const userSnap = await getDoc(userRef);

    // Si no existe, crearlo
    if (!userSnap.exists()) {
      await setDoc(
        userRef,
        {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
          role: "customer",
        },
        { merge: true }
      );
    }
  } catch (error) {
    // Si falla la lectura (por permisos), intentar crear directamente
    // setDoc con merge: true no fallará si el documento ya existe
    try {
      await setDoc(
        userRef,
        {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
          role: "customer",
        },
        { merge: true }
      );
    } catch (writeError) {
      // Si también falla la escritura, lanzar el error original
      throw error;
    }
  }
}
