import React from 'react';
import { dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetchQuery } from '../shared/lib/react-query';
import { getProducts } from '../features/products/api/productsApi';
import HomeClient from './page.client';

export default async function Home(): Promise<React.ReactElement> {
  const queryClient = getQueryClient();

  try {
    await prefetchQuery(
      queryClient,
      ['products'],
      () => {
        return getProducts();
      }
    );
  } catch (error) {
    console.error('[Server] Error en pre-fetch:', error);
  }

  const dehydratedState = dehydrate(queryClient);

  return <HomeClient dehydratedState={dehydratedState} />;
}
