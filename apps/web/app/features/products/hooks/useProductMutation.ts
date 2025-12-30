'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createProduct, deleteProduct, updateProduct } from '../api/productsApi';
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
    onSuccess: async (data, variables) => {
      if (variables.userId) {
        queryClient.setQueryData(['products', variables.userId], (oldData: any) => {
          return oldData ? [...oldData, data] : [data];
        });
      }
      queryClient.setQueryData(['products'], (oldData: any) => {
        return oldData ? [...oldData, data] : [data];
      });
      
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.refetchQueries({ queryKey: ['products'] });
      options.onSuccess?.();
      if (options.redirectOnSuccess) {
        router.push(options.redirectOnSuccess);
      }
    },
    onError: (error: Error) => {
      options.onError?.(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.refetchQueries({ queryKey: ['products'] });
      options.onSuccess?.();
    },
  });

  return {
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,
    createProductAsync: createMutation.mutateAsync,
    updateProductAsync: updateMutation.mutateAsync,
    deleteProductAsync: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
}

