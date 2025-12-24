'use client'

import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { makeQueryClient } from '../lib/react-query';

/**
 * Provider de React Query para el cliente
 * 
 * En el servidor, usamos HydrationBoundary directamente
 * Este provider solo se usa en el cliente después de la hidratación
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
