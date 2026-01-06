import type { User } from "firebase/auth";
import { getFirebaseFirestore } from "./loadFirebase";

export async function syncUser(user: User): Promise<void> {
  const db = await getFirebaseFirestore();
  const { doc, setDoc, getDoc } = await import("firebase/firestore");
  const userRef = doc(db, "users", user.uid);

  try {
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(
        userRef,
        {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
          phone: "",
          role: "customer",
        },
        { merge: true }
      );
    }
  } catch (error) {
    try {
      await setDoc(
        userRef,
        {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
          phone: "",
          role: "customer",
        },
        { merge: true }
      );
    } catch {
      throw error;
    }
  }
}
