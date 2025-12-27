"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User
} from 'firebase/auth';
import { auth } from '../configs/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { syncUser } from '../lib/users';

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

const PROTECTED_ROUTES = ['/dashboard'];

const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();

        await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: { "Content-Type": "application/json" }
        });
        if (pathname.startsWith('/forbidden')) {
          router.push('/');
        }
        // TODO: Agregarle datos del user desde Firestore
        setUser(currentUser);
      } else {
        await fetch("/api/logout", { method: "POST" });
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await syncUser(result.user);      
    } catch (error) {
      console.error("Error en Login:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      if (pathname && (isProtectedRoute(pathname) || pathname === '/forbidden')) {
        router.push('/');
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