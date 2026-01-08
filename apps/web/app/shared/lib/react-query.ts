
import {
  QueryClient,
} from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3600 * 1000 * 12,
        gcTime: 3600 * 1000 * 24,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      // mutations: {
      // },
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
    staleTime: 3600 * 1000 * 12,
    gcTime: 3600 * 1000 * 24,
    retry: 1,
    retryDelay: 1000,
  });
}

export async function ensureQueryData<T>(
  queryClient: QueryClient,
  queryKey: unknown[],
  queryFn: () => Promise<T>,
  staleTime: number = 3600 * 1000 * 12
) {
  await queryClient.ensureQueryData({
    queryKey,
    queryFn,
    staleTime,
    gcTime: staleTime * 2,
    retry: 1,
    retryDelay: 1000,
  });
}
