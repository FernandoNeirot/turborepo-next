"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../shared/providers/AuthContext";
import { Single } from "@fernando_neirot2/ui";
import type { SidebarMobileProps } from "@fernando_neirot2/ui";

export interface SidebarMobileWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  user?: string | null;
  isAuth?: boolean;
}

export function SidebarMobileWrapper({
  isOpen,
  onClose,
  user,
  isAuth = false,
}: SidebarMobileWrapperProps) {
  const router = useRouter();
  const auth = useAuth();

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleLogout = async () => {
    await auth.logout();
  };

  const handleLogin = async () => {
    await auth.loginWithGoogle();
  };

  return (
    <Single.SidebarMobile
      isOpen={isOpen}
      onClose={onClose}
      user={user}
      isAuth={isAuth}
      onDashboardClick={handleDashboard}
      onLogoutClick={handleLogout}
      onLoginClick={handleLogin}
    />
  );
}
