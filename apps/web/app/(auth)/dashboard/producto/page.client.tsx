"use client";
import React from "react";
import { ProductForm, useProductMutation } from "../../../features/products";
import { useAuth } from "../../../shared/providers/AuthContext";
import { generateProductSlug } from "../../../features/products/utils/slug";

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

const DashboardProducto = () => {
  const auth = useAuth();
  const { createProductAsync, isLoading } = useProductMutation({
    redirectOnSuccess: "/dashboard",
    // TODO: Implementar notificaciones con toasts
    onSuccess: () => {
      console.log("Producto creado exitosamente");
    },
    onError: (error) => {
      console.error("Error al crear producto:", error);
    },
  });

  const handleSubmit = async (
    data: Parameters<typeof createProductAsync>[0]
  ) => {
    try {
      // Generar slug temporal (se regenerará en el servidor con el ID real)
      const tempSlug = generateProductSlug(data.title, data.price);
      await createProductAsync({
        ...data,
        descriptionClean: htmlToPlainText(data.description),
        slug: tempSlug,
        userId: auth.user?.uid,
      });
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitLabel="Crear Producto"
    />
  );
};

export default DashboardProducto;
