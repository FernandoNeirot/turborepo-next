'use client'

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getProducts } from '../api/productsApi';
import type { Product } from '../types';

export interface UseProductsProps {
  searchQuery?: string;
  userId?: string;
  initialData?: Product[];
}

export interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  filteredProducts: Product[];
}

export function useProducts({ 
  searchQuery = '',
  userId,
  initialData,
}: UseProductsProps = {}): UseProductsReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: userId ? ['products', userId] : ['products'],
    queryFn: () => getProducts(userId),
    staleTime: 0, // Siempre considerar los datos como stale para permitir refetch
    initialData: initialData,
    refetchOnMount: true, // Siempre refetch al montar para asegurar datos actualizados
  });

  const filteredProducts = useMemo(() => {
    const products = data || [];
    
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter(
      product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  return {
    products: data || [],
    isLoading,
    error: error ? (error as Error).message : null,
    filteredProducts,
  };
}
