"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser, type User } from "../api/userApi";

export interface UseUserReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export function useUser(): UseUserReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 8 * 60 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof Error) {
        if (
          error.message.includes("No autorizado") ||
          error.message.includes("no encontrado")
        ) {
          return false;
        }
      }
      return failureCount < 1;
    },
  });

  return {
    user: data || null,
    isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : String(error)
      : null,
    isAuthenticated: !!data,
  };
}
