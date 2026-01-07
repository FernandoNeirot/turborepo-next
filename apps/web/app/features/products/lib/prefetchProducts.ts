
import { QueryClient } from '@tanstack/react-query';
import { ensureQueryData } from '../../../shared/lib/react-query';
import { getProducts } from '../api/productsApi';

export interface PrefetchProductsOptions {
  userId?: string;
  timeout?: number;
}

export async function prefetchProducts(
  queryClient: QueryClient,
  options: PrefetchProductsOptions = {}
): Promise<void> {
  const { userId, timeout = 1000 } = options;

  try {
    const queryKey = userId ? ['products', userId] : ['products'];
    const prefetchPromise = ensureQueryData(
      queryClient,
      queryKey,
      () => getProducts(userId),
      3600 * 1000 // 1 hora
    );

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Prefetch timeout')), timeout)
    );

    await Promise.race([prefetchPromise, timeoutPromise]);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[prefetchProducts] Pre-fetch falló (continuando):', error);
    }
  }
}

