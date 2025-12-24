/**
 * Helper para pre-fetch productos en el servidor
 * Se usa en Server Components para obtener datos antes de renderizar
 */

import { getQueryClient, prefetchQuery } from '../../../shared/lib/react-query';
import { getProducts } from '../api/productsApi';

/**
 * Pre-fetch productos en el servidor
 * 
 * Uso en Server Component:
 * ```tsx
 * const queryClient = getQueryClient();
 * await prefetchProducts(queryClient);
 * ```
 */
export async function prefetchProducts(
  queryClient: ReturnType<typeof getQueryClient>
) {
  await prefetchQuery(
    queryClient,
    ['products'],
    () => getProducts()
  );
}

