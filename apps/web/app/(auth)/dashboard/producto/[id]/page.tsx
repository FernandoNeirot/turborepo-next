import React from "react";
import { getProduct } from "../../../../features/products/api/productsApi";
import DashboardProductoEdit from "./page.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  // Obtener el producto del servidor
  let product = null;
  try {
    product = await getProduct(id);
  } catch (error) {
    console.error("Error obteniendo producto:", error);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Editar Producto</h1>
      <DashboardProductoEdit product={product} />
    </div>
  );
};

export default page;
