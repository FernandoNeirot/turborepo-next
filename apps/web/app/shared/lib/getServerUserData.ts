import { getAdminFirestore } from "../configs/firebase-admin";
import { getServerUser } from "./auth";
import type { User } from "../api/userApi";

export function serializeFirestoreData(data: unknown): unknown {
  if (data === null || data === undefined) {
    return data;
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "toDate" in data &&
    typeof (data as { toDate: () => Date }).toDate === "function"
  ) {
    const timestamp = data as { toDate: () => Date };
    return timestamp.toDate().toISOString();
  }

  if (data instanceof Date) {
    return data.toISOString();
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "_seconds" in data &&
    "_nanoseconds" in data
  ) {
    const seconds = (data as { _seconds: number })._seconds;
    const nanoseconds = (data as { _nanoseconds: number })._nanoseconds;
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    return date.toISOString();
  }

  if (Array.isArray(data)) {
    return data.map(serializeFirestoreData);
  }
  if (typeof data === "object" && data !== null) {
    const serialized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      serialized[key] = serializeFirestoreData(value);
    }
    return serialized;
  }

  return data;
}

export async function getServerUserData(): Promise<User | null> {
  try {
    const serverUser = await getServerUser();

    if (!serverUser) {
      return null;
    }

    const db = getAdminFirestore();
    const userDoc = await db.collection("users").doc(serverUser.uid).get();

    if (!userDoc.exists) {
      return null;
    }

    const userData = userDoc.data();

    const user: User = {
      uid: serverUser.uid,
      email: serverUser.email,
      displayName: serverUser.displayName,
      phone: userData?.phone || null,
    } as User;
    return user;
  } catch (error) {
    console.error("[getServerUserData] Error obteniendo usuario:", error);
    return null;
  }
}
