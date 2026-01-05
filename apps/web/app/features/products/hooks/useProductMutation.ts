"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../api/productsApi";
import { showLoader, hideLoader } from "../../../shared/lib/loader";
import { toast, getErrorMessage } from "../../../shared/lib/toast";
import type { CreateProductInput, UpdateProductInput } from "../types";

export interface UseProductMutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  redirectOnSuccess?: string;
}

export function useProductMutation(options: UseProductMutationOptions = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: async (input: CreateProductInput) => {
      showLoader("Creando producto...");
      try {
        return await createProduct(input);
      } finally {
        hideLoader();
      }
    },
    onSuccess: async (data, variables) => {
      if (variables.userId) {
        queryClient.setQueryData(
          ["products", variables.userId],
          (oldData: any) => {
            return oldData ? [...oldData, data] : [data];
          }
        );
      }
      queryClient.setQueryData(["products"], (oldData: any) => {
        return oldData ? [...oldData, data] : [data];
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });

      toast.success("Producto creado", "El producto se ha creado exitosamente");

      options.onSuccess?.();
      if (options.redirectOnSuccess) {
        router.push(options.redirectOnSuccess);
      }
    },
    onError: (error: Error) => {
      hideLoader();
      toast.error("Error al crear producto", getErrorMessage(error));
      options.onError?.(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (input: UpdateProductInput) => {
      showLoader("Actualizando producto...");
      try {
        return await updateProduct(input);
      } finally {
        hideLoader();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.refetchQueries({ queryKey: ["products"] });
      toast.success(
        "Producto actualizado",
        "El producto se ha actualizado exitosamente"
      );
      options.onSuccess?.();
      if (options.redirectOnSuccess) {
        router.push(options.redirectOnSuccess);
      }
    },
    onError: (error: Error) => {
      hideLoader();
      toast.error("Error al actualizar producto", getErrorMessage(error));
      options.onError?.(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      showLoader("Eliminando producto...");
      try {
        return await deleteProduct(id);
      } finally {
        hideLoader();
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.refetchQueries({ queryKey: ["products"] });
      toast.success(
        "Producto eliminado",
        "El producto se ha eliminado exitosamente"
      );
      options.onSuccess?.();
    },
    onError: (error: Error) => {
      hideLoader();
      toast.error("Error al eliminar producto", getErrorMessage(error));
      options.onError?.(error);
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
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
}
