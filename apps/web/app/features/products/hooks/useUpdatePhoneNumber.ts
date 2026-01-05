"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePhoneNumber } from "../api/productsApi";
import { showLoader, hideLoader } from "../../../shared/lib/loader";
import { toast, getErrorMessage } from "../../../shared/lib/toast";
import type {
  UpdatePhoneNumberInput,
  UpdatePhoneNumberResponse,
} from "../api/productsApi";

export interface UseUpdatePhoneNumberOptions {
  onSuccess?: (data: UpdatePhoneNumberResponse) => void;
  onError?: (error: Error) => void;
}

export function useUpdatePhoneNumber(
  options: UseUpdatePhoneNumberOptions = {}
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: UpdatePhoneNumberInput) => {
      showLoader("Actualizando número de teléfono...");
      try {
        return await updatePhoneNumber(input);
      } finally {
        hideLoader();
      }
    },
    onSuccess: async (data, variables) => {
      // Invalidar las queries de productos para refrescar los datos
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({
        queryKey: ["products", variables.userId],
      });

      toast.success(
        "Número actualizado",
        "El número de teléfono se ha actualizado exitosamente"
      );
      options.onSuccess?.(data);
    },
    onError: (error: Error) => {
      hideLoader();
      toast.error("Error al actualizar número", getErrorMessage(error));
      options.onError?.(error);
    },
  });

  return {
    updatePhoneNumber: mutation.mutate,
    updatePhoneNumberAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
}
