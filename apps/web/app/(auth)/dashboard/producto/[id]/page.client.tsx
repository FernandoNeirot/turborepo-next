"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ProductForm, useProductMutation } from "../../../../features/products";
import { useAuth } from "../../../../shared/providers/AuthContext";
import type {
  Product,
  CreateProductInput,
} from "../../../../features/products/types";

const htmlToPlainText = (html: string): string => {
  if (typeof window === "undefined") {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
  }
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

interface DashboardProductoEditProps {
  product: Product | null;
}

const DashboardProductoEdit = ({ product }: DashboardProductoEditProps) => {
  const auth = useAuth();
  const router = useRouter();

  const { updateProductAsync, isLoading } = useProductMutation({
    redirectOnSuccess: "/dashboard",
    onSuccess: () => {
      console.log("Producto actualizado exitosamente");
    },
    onError: (error) => {
      console.error("Error al actualizar producto:", error);
    },
  });

  const handleSubmit = async (data: CreateProductInput) => {
    if (!product) {
      console.error("No hay producto para editar");
      return;
    }

    try {
      await updateProductAsync({
        id: product.id,
        ...data,
        descriptionClean: htmlToPlainText(data.description),
        userId: auth.user?.uid,
      });
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  if (!product) {
    return (
      <div className="mt-4">
        <p className="text-red-600">Producto no encontrado</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Volver al Dashboard
        </button>
      </div>
    );
  }

  return (
    <ProductForm
      initialData={product}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitLabel="Actualizar Producto"
    />
  );
};

export default DashboardProductoEdit;
