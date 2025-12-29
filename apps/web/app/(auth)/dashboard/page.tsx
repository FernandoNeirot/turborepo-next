import React from 'react';
import { dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '../../shared/lib/react-query';
import { getUserIdFromSession } from '../../shared/lib/auth';
import { prefetchProducts } from '../../features/products';
import DashboardClient from './page.client';

export default async function DashboardPage(): Promise<React.ReactElement> {
  const queryClient = getQueryClient();

  const userId = await getUserIdFromSession();
  if (userId)
    await prefetchProducts(queryClient, { userId });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className='max-w-[1240px] mx-auto pt-10 px-4'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <p className='mt-2'>Bienvenido a tu panel de control</p>
      <DashboardClient dehydratedState={dehydratedState} userId={userId ?? ""} />
    </div>
  );
}
