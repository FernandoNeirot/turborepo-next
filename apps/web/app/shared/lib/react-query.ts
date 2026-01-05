/**
 * Utilidades para React Query con SSR
 * Estas funciones ayudan a pre-fetch datos en el servidor
 * y hidratarlos en el cliente
 */

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3600 * 1000, // 1 hora
        refetchOnWindowFocus: false,
        retry: 1,
        // Los errores de queries se manejan individualmente en cada componente
        // No se muestran toasts automáticamente para queries porque pueden ser transitorios
      },
      mutations: {
        // Los errores de mutaciones se manejan en cada hook usando toast
        // Ver: useProductMutation, useUpdatePhoneNumber, etc.
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

export async function prefetchQuery<T>(
  queryClient: QueryClient,
  queryKey: unknown[],
  queryFn: () => Promise<T>
) {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: 3600 * 1000,
    retry: 1,
    retryDelay: 1000,
  });
}
