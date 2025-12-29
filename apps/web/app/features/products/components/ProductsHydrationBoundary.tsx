'use client';

import React from 'react';
import { HydrationBoundary, type DehydratedState } from '@tanstack/react-query';

export interface ProductsHydrationBoundaryProps {
  dehydratedState?: DehydratedState;
  children: React.ReactNode;
}

export function ProductsHydrationBoundary({
  dehydratedState,
  children,
}: ProductsHydrationBoundaryProps) {
  if (dehydratedState) {
    return (
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    );
  }

  return <>{children}</>;
}


