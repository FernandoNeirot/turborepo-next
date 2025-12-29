import React from 'react';
import { dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetchQuery } from '../shared/lib/react-query';
import { getProducts } from '../features/products/api/productsApi';
import HomeClient from './page.client';

export default async function Home(): Promise<React.ReactElement> {
  const queryClient = getQueryClient();

  try {
    const prefetchPromise = prefetchQuery(
      queryClient,
      ['products'],
      () => getProducts()
    );
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Prefetch timeout')), 2000)
    );

    await Promise.race([prefetchPromise, timeoutPromise]);
  } catch (error) {
    console.error('Error during prefetching products:', error);
  }

  const dehydratedState = dehydrate(queryClient);

  return <HomeClient dehydratedState={dehydratedState} />;
}
