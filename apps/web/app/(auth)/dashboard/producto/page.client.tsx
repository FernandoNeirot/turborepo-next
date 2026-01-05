"use client";
import React from "react";
import { ProductForm, useProductMutation } from "../../../features/products";
import { useAuth } from "../../../shared/providers/AuthContext";
import { generateProductSlug } from "../../../features/products/utils/slug";
import { useUser } from "../../../shared/hooks/useUser";

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
  const { user } = useUser();
  const { createProductAsync, isLoading } = useProductMutation({
    redirectOnSuccess: "/dashboard",
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
      const tempSlug = generateProductSlug(data.title, data.price);
      await createProductAsync({
        ...data,
        descriptionClean: htmlToPlainText(data.description),
        slug: tempSlug,
        sold: false,
        userId: auth.user?.uid,
        phone: user?.phone || "",
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
