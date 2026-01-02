"use client";

import React from "react";
import Image from "next/image";
import type { Product } from "../../features/products/types";

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </div>
    </div>
  );
}
