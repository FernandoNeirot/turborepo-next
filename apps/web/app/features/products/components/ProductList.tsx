'use client'

import React from 'react';
import { ProductGrid } from './ProductGrid';
import type { Product, ProductCardActions } from '../types';

export interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  error?: string | null;
  searchQuery?: string;
  actions?: ProductCardActions;
}

export function ProductList({
  products,
  isLoading = false,
  error = null,
  searchQuery = '',
  actions,
}: ProductListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (products.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No se encontraron productos para &quot;{searchQuery}&quot;
        </p>
      </div>
    );
  }

  return <ProductGrid products={products} actions={actions} className="mt-4" />;
}
