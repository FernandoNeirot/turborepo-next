'use client'

import { useQuery } from '@tanstack/react-query';
import { useMemo, useEffect } from 'react';
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

const CACHE_KEY_PREFIX = 'react-query-products-';
const STALE_TIME = 3600 * 1000; // 1 hora

function getCacheKey(userId?: string): string {
  return `${CACHE_KEY_PREFIX}${userId || 'all'}`;
}

function getCachedData(userId?: string): { data: Product[]; timestamp: number } | null {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = getCacheKey(userId);
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    const age = Date.now() - parsed.timestamp;

    // Si los datos son frescos (menos de 1 hora), retornarlos
    if (age < STALE_TIME) {
      return parsed;
    }

    // Si están obsoletos, eliminar del localStorage
    localStorage.removeItem(cacheKey);
    return null;
  } catch {
    return null;
  }
}

function setCachedData(userId: string | undefined, data: Product[]): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = getCacheKey(userId);
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch {
    // Ignorar errores de localStorage (puede estar lleno o deshabilitado)
  }
}

export function useProducts({
  searchQuery = '',
  userId,
  initialData,
}: UseProductsProps = {}): UseProductsReturn {
  const queryKey = userId ? ['products', userId] : ['products'];

  // Obtener datos de localStorage si existen y están frescos
  const cached = getCachedData(userId);
  const cachedInitialData = cached?.data;

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const products = await getProducts(userId);
      // Guardar en localStorage después de obtener los datos
      setCachedData(userId, products);
      return products;
    },
    staleTime: STALE_TIME, // 1 hora - los datos se consideran frescos por 1 hora
    gcTime: STALE_TIME * 2, // 2 horas - los datos se mantienen en cache por 2 horas
    initialData: initialData || cachedInitialData,
    refetchOnMount: false, // No refetchear si los datos están frescos
    refetchOnWindowFocus: false, // No refetchear al cambiar de ventana
    refetchOnReconnect: false, // No refetchear al reconectar
  });

  // Guardar en localStorage cuando los datos cambien
  useEffect(() => {
    if (data && data.length > 0) {
      setCachedData(userId, data);
    }
  }, [data, userId]);

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
    isLoading: cachedInitialData ? false : isLoading, // No mostrar loading si hay datos en caché
    error: error ? (error as Error).message : null,
    filteredProducts,
  };
}
