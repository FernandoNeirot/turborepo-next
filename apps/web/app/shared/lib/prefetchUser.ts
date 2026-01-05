import { QueryClient } from "@tanstack/react-query";
import { prefetchQuery } from "./react-query";
import { getServerUserData } from "./getServerUserData";

export interface PrefetchUserOptions {
  timeout?: number;
}

export async function prefetchUser(
  queryClient: QueryClient,
  options: PrefetchUserOptions = {}
): Promise<void> {
  const { timeout = 2000 } = options;

  try {
    // Prefetch con staleTime de 8 horas para el usuario
    const prefetchPromise = queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: () => getServerUserData(),
      staleTime: 8 * 60 * 60 * 1000, // 8 horas
      retry: 1,
      retryDelay: 1000,
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Prefetch timeout")), timeout)
    );

    await Promise.race([prefetchPromise, timeoutPromise]);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[prefetchUser] Pre-fetch falló (continuando):", error);
    }
  }
}
