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
    staleTime: 0,
    initialData: initialData,
    refetchOnMount: true,
  });

  const filteredProducts = useMemo(() => {
    const products = data || [];

    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    const words = query.split(/\s+/).filter(Boolean);
    return products.filter(product =>
      words.some(word =>
        product.title.toLowerCase().includes(word) ||
        product.description.toLowerCase().includes(word)
      )
    );
  }, [data, searchQuery]);

  return {
    products: data || [],
    isLoading,
    error: error ? (error as Error).message : null,
    filteredProducts,
  };
}
