
import { QueryClient } from '@tanstack/react-query';
import { prefetchQuery } from '../../../shared/lib/react-query';
import { getProducts } from '../api/productsApi';

export interface PrefetchProductsOptions {
  userId?: string;
  timeout?: number;
}


export async function prefetchProducts(
  queryClient: QueryClient,
  options: PrefetchProductsOptions = {}
): Promise<void> {
  const { userId, timeout = 2000 } = options;

  try {
    const prefetchPromise = prefetchQuery(
      queryClient,
      userId ? ['products', userId] : ['products'],
      () => getProducts(userId)
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

