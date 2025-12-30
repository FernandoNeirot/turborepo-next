'use client'

import React, { useState } from 'react';
import type { DehydratedState } from '@tanstack/react-query';
import { SearchBar } from '../features/search';
import { ProductList, useProducts, ProductsHydrationBoundary } from '../features/products';

interface HomeClientProps {
  dehydratedState?: DehydratedState;
}

const HomeClient = ({ dehydratedState }: HomeClientProps) => {
  return (
    <ProductsHydrationBoundary dehydratedState={dehydratedState}>
      <HomeContentWrapper />
    </ProductsHydrationBoundary>
  );
};

const HomeContentWrapper = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { filteredProducts, isLoading, error } = useProducts({ searchQuery });
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (productId: string) => {
    console.log('View details for product:', productId);
  };

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
  };

  return (
    <div
      className="p-4 mx-auto"
      style={{
        maxWidth: '1240px',
      }}
    >
      <SearchBar
        query={searchQuery}
        onSearchChange={handleSearchChange}
        className=""
        isDisabled={true}
      />
      <ProductList
        products={filteredProducts}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
        actions={{
          first: {
            onClick: handleViewDetails,
            label: 'Ver detalles',
            icon: 'info',
            backgroundColor: 'BLUE',
            tooltip: 'Ver detalles del producto',
          },
          second: {
            onClick: handleAddToCart,
            label: 'Agregar al carrito',
            icon: 'cart',
            backgroundColor: 'GREEN',
            tooltip: 'Agregar este producto al carrito',
          },
        }}
      />
    </div>
  );
};

export default HomeClient;