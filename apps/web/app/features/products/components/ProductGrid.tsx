'use client'

import React from 'react';
import { Wrapper } from '@fernando_neirot2/ui';
import type { Product, ProductCardActions } from '../types';

export interface ProductGridProps {
  products: Product[];
  actions?: ProductCardActions;
  className?: string;
}

export function ProductGrid({ products, actions, className }: ProductGridProps) {
  const handleViewDetails = (productId: string) => {
    actions?.onViewDetails?.(productId);
    console.log('View details for product:', productId);
  };

  const handleAddToCart = (productId: string) => {
    actions?.onAddToCart?.(productId);
    console.log('Add to cart:', productId);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {products.map(product => (
        <Wrapper.ProductCard
          key={product.id}
          onClickButtonLeft={() => handleViewDetails(product.id)}
          onClickButtonRight={() => handleAddToCart(product.id)}
          imageUrl={product.imageUrl}
          width="full"
          height={200}
          price={product.price}
          title={product.title}
          description={product.description}
          labelButtonLeft="Detalles"
          iconButtonLeft="view"
          bgButtonLeft="BLUE"
          labelButtonRight="Agregar"
          iconButtonRight="cart"
          bgButtonRight="GREEN"
          flexDirection="column"
          sizeButton="default"
        />
      ))}
    </div>
  );
}
