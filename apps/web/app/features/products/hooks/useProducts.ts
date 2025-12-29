'use client'

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getProducts } from '../api/productsApi';
import type { Product } from '../types';

export interface UseProductsProps {
  searchQuery?: string;
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
  initialData,
}: UseProductsProps = {}): UseProductsReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    staleTime: 3600 * 1000, // Los datos son válidos por 1 hora
    initialData: initialData,
    refetchOnMount: !initialData,
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
