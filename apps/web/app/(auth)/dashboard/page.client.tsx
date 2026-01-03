"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DehydratedState } from "@tanstack/react-query";
import { Form } from "@fernando_neirot2/ui";
import {
  ProductList,
  ProductsHydrationBoundary,
  useProductMutation,
  useProducts,
  useUpdatePhoneNumber,
} from "../../features/products";
import { SearchBar } from "../../features/search";

interface DashboardClientProps {
  dehydratedState?: DehydratedState;
  userId: string;
}

const Dashboard = ({ dehydratedState, userId }: DashboardClientProps) => {
  const router = useRouter();

  const goToAddProduct = () => {
    router.push("/dashboard/producto");
  };

  return (
    <ProductsHydrationBoundary dehydratedState={dehydratedState}>
      <DashboardContent goToAddProduct={goToAddProduct} userId={userId} />
    </ProductsHydrationBoundary>
  );
};

interface DashboardContentProps {
  goToAddProduct: () => void;

  userId: string;
}

const DashboardContent = ({
  goToAddProduct,
  userId,
}: DashboardContentProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { products, isLoading, error } = useProducts({ userId, searchQuery });
  const { deleteProduct } = useProductMutation({
    onSuccess: () => {
      console.log("Producto eliminado exitosamente");
    },
    onError: (error: Error) => {
      console.error("Error al eliminar producto:", error);
    },
  });
  const { updatePhoneNumber, isUpdating } = useUpdatePhoneNumber({
    onSuccess: () => {
      setPhoneNumber("");
    },
    onError: (error: Error) => {
      console.error("Error al actualizar teléfono:", error);
    },
  });
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  const handleFirstButton = (productId: string) => {
    console.log("ver:", productId);
  };

  const handleSecondButton = (productId: string) => {
    router.push(`/dashboard/producto/${productId}`);
  };

  const handleThirdButton = (productId: string) => {
    deleteProduct(productId);
  };
  const handleUpdatePhoneNumber = () => {
    if (!phoneNumber.trim()) {
      return;
    }
    updatePhoneNumber({ userId, phone: phoneNumber });
  };

  useEffect(() => {
    if (products.length > 0) {
      setPhoneNumber(products[0]?.phone || "");
    }
  }, [products]);

  return (
    <div className="mt-4">
      <div className="sm:flex items-end gap-4 mb-6">
        <Form.Input
          label="Celular para ser contactado por clientes"
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhoneNumber(e.target.value)
          }
          placeholder="Escribe para buscar..."
        />
        <Form.Button
          onClick={handleUpdatePhoneNumber}
          label={isUpdating ? "Actualizando..." : "Actualizar celular"}
          textColor="#fff"
          backgroundColor="BLUE"
          height="45px"
          width="100%"
          isDisabled={
            isUpdating ||
            !phoneNumber.trim() ||
            phoneNumber === products[0]?.phone
          }
        />
      </div>
      <div className="sm:flex sm:items-center mb-4 gap-4">
        <p className="text-lg flex items-center">
          Total de productos agregados:{" "}
          <span className="ml-2 mr-6 font-semibold">
            {isLoading ? "..." : products.length}
          </span>
        </p>
        <Form.Button
          onClick={goToAddProduct}
          label="Agregar nuevo producto"
          textColor="#fff"
          backgroundColor="BLUE"
        />
      </div>

      <SearchBar
        query={searchQuery}
        onSearchChange={handleSearchChange}
        className=""
        isDisabled={true}
      />
      <ProductList
        products={products}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
        flexDirection="row"
        actions={{
          first: {
            onClick: handleFirstButton,
            //label: 'Ver',
            icon: "view",
            backgroundColor: "BLUE",
            tooltip: "Ver",
          },
          second: {
            onClick: handleSecondButton,
            //label: 'Editar',
            icon: "edit",
            backgroundColor: "GREEN",
            tooltip: "Editar",
          },
          third: {
            onClick: handleThirdButton,
            //label: 'Eliminar',
            icon: "delete",
            backgroundColor: "RED",
            tooltip: "Eliminar",
          },
        }}
      />
    </div>
  );
};

export default Dashboard;
