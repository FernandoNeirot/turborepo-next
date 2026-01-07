"use client";

import React from "react";
import Image from "next/image";
import type { Product } from "../../features/products/types";
import { Form as FormUI } from "@fernando_neirot2/ui";
import { ProductList, useProducts } from "../../features/products";
import { useRouter } from "next/navigation";

interface ProductPageClientProps {
  product: Product;
  products: Product[];
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const router = useRouter();
  const { products } = useProducts({ userId: product.userId, searchQuery: "" });

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/producto/${product.slug || product.id}`
      : `/producto/${product.slug || product.id}`;
  const whatsappMessage = `Hola,%20estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(product.title)}.%0A${encodeURIComponent(productUrl)}`;
  const linkSeller = `https://wa.me/${product.phone}?text=${whatsappMessage}`;


  const handleViewDetails = (slugOrId: string) => {
    router.push(`/producto/${slugOrId}`);
  };

  const handleSecondButton = () => {
    window.open(linkSeller, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-310 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Imagen del producto */}
          <div className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-lg">Sin imagen</span>
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="text-3xl font-semibold text-gray-900 mb-4">
                $
                {product.price.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-xl font-semibold mb-3">Descripción</h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: product.description || product.descriptionClean || "",
                }}
              />
            </div>
          </div>
        </div>
        <div className="text-[20px] mb-6 text-gray-700">
          <b>Ubicación:</b> {product.adress}
        </div>
        <FormUI.Button
          onClick={() => {
            window.open(linkSeller, "_blank", "noopener,noreferrer");
          }}
          label="Contactar al vendedor"
          textColor="#fff"
          width="100%"
          backgroundColor="GREEN"
        />
        {
          products.filter(item => item.id !== product.id).length > 0 &&
          <div className="mt-6">
            <div className="text-[20px] mb-4 text-gray-700">Mas productos del vendedor</div>
            <ProductList
              products={products.filter(item => item.id !== product.id)}
              isLoading={false}
              error={""}
              searchQuery={""}
              actions={{
                first: {
                  onClick: handleViewDetails,
                  label: 'Ver detalles',
                  backgroundColor: "BLUE",
                  tooltip: "Ver detalles",
                },
                second: {
                  onClick: handleSecondButton,
                  label: 'Contactar al vendedor',
                  backgroundColor: "GREEN",
                  tooltip: "Contactar al vendedor",
                },

              }}
            />
          </div>
        }
      </div>
    </div>
  );
}
