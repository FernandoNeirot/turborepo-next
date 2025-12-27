import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import type { User } from "firebase/auth";

export async function syncUser(user: User): Promise<void> {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      createdAt: new Date(),
      role: 'customer'
    });
  }
}

