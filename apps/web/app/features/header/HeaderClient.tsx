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
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(
    serverUser?.displayName || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!serverUser);

  useEffect(() => {
    if (auth.user) {
      setDisplayName(auth.user.displayName || null);
      setIsAuthenticated(true);
    } else if (!auth.loading) {
      setIsAuthenticated(false);
      setDisplayName(null);
    }
  }, [auth.user, auth.loading]);

  return (
    <div className="w-full">
      <div style={{ height: "60px" }} />
      <div>
        <Single.SidebarMobile
          isOpen={isOpenSidebar}
          onClose={() => setIsOpenSidebar(false)}
          user={displayName}
          isAuth={isAuthenticated}
          onDashboardClick={() => router.push("/dashboard")}
          onLogoutClick={auth.logout}
          onLoginClick={auth.loginWithGoogle}
          handleHome={() => router.push("/")}
        />
      </div>
      <div className="fixed w-full top-0 left-0 z-50">
        <Single.Header
          title="NEGOCIA"
          subTitle="Compra-venta Inteligente"
          logoUrl="/logo.webp"
          onClickMenu={() => setIsOpenSidebar(true)}
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
