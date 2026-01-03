"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../shared/providers/AuthContext";
import { Single } from "@fernando_neirot2/ui";
import { useRouter } from "next/navigation";
import type { ServerUser } from "../../shared/lib/auth";

interface HeaderClientProps {
  serverUser: ServerUser | null;
}

const HeaderClient = ({ serverUser }: HeaderClientProps) => {
  const auth = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string | null>(
    serverUser?.displayName || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!serverUser);

  // Actualizar cuando auth.user cambie (después de que se cargue en el cliente)
  useEffect(() => {
    if (auth.user) {
      setDisplayName(auth.user.displayName || null);
      setIsAuthenticated(true);
    } else if (!auth.loading) {
      // Solo actualizar a false si ya terminó de cargar y no hay usuario
      setIsAuthenticated(false);
      setDisplayName(null);
    }
  }, [auth.user, auth.loading]);

  return (
    <div className="w-full">
      <div style={{ height: "60px" }} />
      <div className="fixed w-full top-0 left-0 z-50">
        <Single.Header
          title="NEGOCIA"
          subTitle="Compra-venta Inteligente"
          logoUrl="/logo.webp"
          welcomeLabel={
            isAuthenticated && displayName
              ? `Hola, ${displayName}`
              : "Iniciar sesión"
          }
          onWelcomeClick={
            isAuthenticated
              ? () => router.push("/dashboard")
              : auth.loginWithGoogle
          }
          onClickLogin={isAuthenticated ? auth.logout : auth.loginWithGoogle}
          isAuthenticated={isAuthenticated}
          onClickLogo={() => router.push("/")}
          maxWidth="1240px"
        />
      </div>
    </div>
  );
};

export default HeaderClient;
