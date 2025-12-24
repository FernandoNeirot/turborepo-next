import React from 'react';
import { dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetchQuery } from '../shared/lib/react-query';
import { getProducts } from '../features/products/api/productsApi';
import HomeClient from './page.client';

export default async function Home(): Promise<React.ReactElement> {
  console.log('[Server] Home page - Iniciando pre-fetch de productos');
  const queryClient = getQueryClient();

  try {
    console.log('[Server] Llamando a prefetchQuery para productos');
    await prefetchQuery(
      queryClient,
      ['products'],
      () => {
        console.log('[Server] Ejecutando getProducts()');
        return getProducts();
      }
    );
    console.log('[Server] Pre-fetch completado');
  } catch (error) {
    console.error('[Server] Error en pre-fetch:', error);
  }

  const dehydratedState = dehydrate(queryClient);
  console.log('[Server] Estado deshidratado, pasando al cliente');

  return <HomeClient dehydratedState={dehydratedState} />;
}
