
let firebaseAuth: any = null;
let firebaseApp: any = null;
let firebaseDb: any = null;
let firebaseStorage: any = null;
let firebaseInitialized = false;
let firebaseLoadingPromise: Promise<void> | null = null;

export async function loadFirebase(): Promise<void> {
  if (firebaseInitialized) {
    return;
  }

  if (firebaseLoadingPromise) {
    await firebaseLoadingPromise;
    return;
  }

  if (typeof window === 'undefined') {
    throw new Error('Firebase client SDK no debe cargarse en el servidor');
  }

  firebaseLoadingPromise = (async () => {
    const [
      { initializeApp, getApps },
      { getAuth, GoogleAuthProvider },
      { getFirestore },
      { getStorage },
    ] = await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
      import('firebase/storage'),
    ]);

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    if (!firebaseConfig.projectId) {
      throw new Error('Firebase configuration error: NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set');
    }

    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]!;
    firebaseAuth = getAuth(firebaseApp);
    firebaseDb = getFirestore(firebaseApp);
    firebaseStorage = getStorage(firebaseApp);

    (window as any).__firebaseAuth = firebaseAuth;
    (window as any).__firebaseDb = firebaseDb;
    (window as any).__firebaseStorage = firebaseStorage;
    (window as any).__GoogleAuthProvider = GoogleAuthProvider;

    firebaseInitialized = true;
  })();

  await firebaseLoadingPromise;
}

export async function getFirebaseAuth() {
  await loadFirebase();
  return firebaseAuth;
}

export async function getFirebaseFirestore() {
  await loadFirebase();
  return firebaseDb;
}

export async function getFirebaseStorage() {
  await loadFirebase();
  return firebaseStorage;
}

export async function getGoogleAuthProvider() {
  await loadFirebase();
  const { GoogleAuthProvider } = await import('firebase/auth');
  return GoogleAuthProvider;
}

export function isFirebaseLoaded(): boolean {
  return firebaseInitialized;
}

