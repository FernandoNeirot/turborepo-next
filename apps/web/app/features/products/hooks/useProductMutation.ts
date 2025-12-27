'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '../api/productsApi';
import type { CreateProductInput, UpdateProductInput } from '../types';

export interface UseProductMutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectOnSuccess?: string;
}

export function useProductMutation(options: UseProductMutationOptions = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      options.onSuccess?.();
      if (options.redirectOnSuccess) {
        router.push(options.redirectOnSuccess);
      }
    },
    onError: (error: Error) => {
      options.onError?.(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (input: UpdateProductInput) => updateProduct(input),
    onSuccess: () => {
      // Invalidar la query de productos para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ['products'] });
      options.onSuccess?.();
      if (options.redirectOnSuccess) {
        router.push(options.redirectOnSuccess);
      }
    },
    onError: (error: Error) => {
      options.onError?.(error);
    },
  });

  return {
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    createProductAsync: createMutation.mutateAsync,
    updateProductAsync: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isLoading: createMutation.isPending || updateMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
  };
}

