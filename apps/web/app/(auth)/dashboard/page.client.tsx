"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { useUser } from "../../shared/hooks/useUser";

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
  const hasInitializedPhone = useRef(false);
  const { user } = useUser();
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
    onError: (error: Error) => {
      console.error("Error al actualizar teléfono:", error);
    },
  });
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  const handleViewDetails = (slugOrId: string) => {
    // Navegar a la página del producto usando el slug
    router.push(`/producto/${slugOrId}`);
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
    if (user?.phone && !hasInitializedPhone.current) {
      setPhoneNumber(user.phone);
      hasInitializedPhone.current = true;
    }
  }, [user?.phone]);

  return (
    <div className="mt-4">
      <div className="sm:flex items-center gap-4 mb-6">
        <Form.Input
          label="Celular para ser contactado por clientes"
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhoneNumber(e.target.value)
          }
          helperText="El celular debe ser válido y tener minimo 8 digitos"
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
            phoneNumber.length < 8 ||
            phoneNumber === user?.phone
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
          isDisabled={!phoneNumber.trim() || products.length > 3}
        />
      </div>
      {products.length > 3 && (
        <p className="w-full text-center mb-5 text-red-600 font-bold text-[12px]">
          Solo se permite agregar 3 productos por usuario
        </p>
      )}
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
            onClick: handleViewDetails,
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
