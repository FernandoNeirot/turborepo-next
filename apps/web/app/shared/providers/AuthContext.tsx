"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { syncUser } from "../lib/users";
import { toast, getErrorMessage } from "../lib/toast";
import { loadFirebase, getFirebaseAuth } from "../lib/loadFirebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({
  user: null,
  loading: true,
  loginWithGoogle: () => { },
  logout: () => { },
} as AuthContextType);

interface AuthProviderProps {
  children: React.ReactNode;
}

const PROTECTED_ROUTES = ["/dashboard", "/forbidden"];

const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;
    let unsubscribe: (() => void) | null = null;

    const initializeAuth = async () => {
      if (isProtectedRoute(pathname)) {
        try {
          await loadFirebase();
          if (!mounted) return;

          const { onAuthStateChanged } = await import('firebase/auth');
          const auth = await getFirebaseAuth();

          unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!mounted) return;

            if (currentUser) {
              const token = await currentUser.getIdToken();

              await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({ token }),
                headers: { "Content-Type": "application/json" },
              });
              if (pathname.startsWith("/forbidden")) {
                router.push("/");
              }
              setUser(currentUser);
            } else {
              await fetch("/api/logout", { method: "POST" });
              setUser(null);
            }
            setLoading(false);
            setFirebaseLoaded(true);
          });
        } catch (error) {
          console.error("Error inicializando Firebase:", error);
          if (mounted) {
            setLoading(false);
            setFirebaseLoaded(false);
          }
        }
      } else {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [pathname, router]);

  const loginWithGoogle = async () => {
    try {
      await loadFirebase();
      const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
      const auth = await getFirebaseAuth();

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      try {
        await syncUser(result.user);
      } catch (syncError) {
        console.error("Error al sincronizar usuario:", syncError);
        const errorMessage = getErrorMessage(syncError);
        if (
          errorMessage.includes("permission") ||
          errorMessage.includes("permissions")
        ) {
          toast.error(
            "Error de permisos",
            "Las reglas de Firestore no están configuradas. Por favor, revisa la consola de Firebase."
          );
        } else {
          toast.error("Error al crear usuario", getErrorMessage(syncError));
        }
      }
    } catch (error) {
      console.error("Error en Login:", error);
      toast.error("Error en el login", getErrorMessage(error));
    }
  };

  const logout = async () => {
    try {
      if (firebaseLoaded) {
        const { signOut } = await import('firebase/auth');
        const auth = await getFirebaseAuth();
        await signOut(auth);
      } else {
        await fetch("/api/logout", { method: "POST" });
        setUser(null);
      }

      if (pathname && isProtectedRoute(pathname)) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error en Logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
