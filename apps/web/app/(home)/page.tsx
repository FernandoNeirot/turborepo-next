import React from 'react';
import { dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '../shared/lib/react-query';
import { prefetchProducts } from '../features/products';
import HomeClient from './page.client';

export default async function Home(): Promise<React.ReactElement> {
  const queryClient = getQueryClient();

  await prefetchProducts(queryClient);

  const dehydratedState = dehydrate(queryClient);

  return <HomeClient dehydratedState={dehydratedState} />;
}
