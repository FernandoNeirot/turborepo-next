'use client'

import React, { useState } from 'react';
import { HydrationBoundary, type DehydratedState } from '@tanstack/react-query';
import { SearchBar } from '../features/search';
import { ProductList, useProducts } from '../features/products';

interface HomeClientProps {
  dehydratedState?: DehydratedState;
}

const HomeClient = ({ dehydratedState }: HomeClientProps) => {
  if (dehydratedState) {
    return (
      <HydrationBoundary state={dehydratedState}>
        <HomeContentWrapper />
      </HydrationBoundary>
    );
  }

  return <HomeContentWrapper />;
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
      className="p-4"
      style={{
        maxWidth: '1240px',
        margin: '0 auto',
        backgroundColor: '#f3f4f6',
      }}
    >
      <SearchBar
        query={searchQuery}
        onSearchChange={handleSearchChange}
        className=""
      />
      <ProductList
        products={filteredProducts}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
        actions={{
          onViewDetails: handleViewDetails,
          onAddToCart: handleAddToCart,
        }}
      />
    </div>
  );
};

export default HomeClient;