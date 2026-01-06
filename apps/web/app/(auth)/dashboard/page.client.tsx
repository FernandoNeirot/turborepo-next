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
  const [adress, setAdress] = useState("")
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
    updatePhoneNumber({ userId, phone: '+54' + phoneNumber, adress: adress });
  };

  useEffect(() => {
    if (user?.phone && !hasInitializedPhone.current) {
      setPhoneNumber(user.phone);
      setAdress(user.adress || "");
      hasInitializedPhone.current = true;
    }
  }, [user?.phone]);

  return (
    <div className="mt-4">
      <div
        className="text-[18px] font-bold mb-2"
      >
        Datos Generales
      </div>
      <div className="sm:flex items-start gap-4 mb-4">
        <div className="flex gap-4 mb-4 w-full">
          <Form.Input
            label="Codigo pais"
            value={"+54"}
            onChange={() => { }}
            isDisabled={true}
            width="100px"
          />
          <Form.Input
            label="Celular"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
            helperText="Debe tener minimo 8 digitos"
            placeholder="Ingresa tu celular para ser contacto por clientes"
          />
        </div>
        <div className="w-full">
          <Form.Input
            label="Direccion"
            value={adress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAdress(e.target.value)
            }
            placeholder="Ingresa tu direccion"
          />
        </div>
      </div>
      <div className="w-full flex justify-end mb-10">
        <div className="w-full sm:w-75 sm:max-w-40">
          <Form.Button
            onClick={handleUpdatePhoneNumber}
            label={isUpdating ? "Actualizando..." : "Actualizar"}
            textColor="#fff"
            backgroundColor="BLUE"
            height="45px"
            width="100%"
            isDisabled={
              isUpdating ||
              (!phoneNumber.trim()) ||
              (!adress.trim()) ||
              phoneNumber.length < 8
            }
          />
        </div>
      </div>
      <div className="sm:flex sm:items-center mb-4 gap-4">
        <p className="text-lg flex items-center">
          Total de productos agregados:{" "}
          <span className="ml-2 mr-6 font-semibold">
            {isLoading ? "..." : products.length}
          </span>
        </p>
        <div className="w-full sm:w-75 sm:max-w-50">
          <Form.Button
            onClick={goToAddProduct}
            label="Agregar nuevo producto"
            textColor="#fff"
            backgroundColor="BLUE"
            width="100%"
            isDisabled={!phoneNumber.trim() || products.length > 3}
          />
        </div>
      </div>
      {products.length > 3 && (
        <p className="w-full text-center mb-5 text-red-600 font-bold text-[14px]">
          Solo se permite agregar 3 productos por usuario
        </p>
      )}
      {products.length === 0 && !phoneNumber && (
        <p className="w-full text-center mb-5 text-red-600 font-bold text-[14px]">
          Para poder Agregar productos, primero debes actualizar tu número de
          celular.
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
