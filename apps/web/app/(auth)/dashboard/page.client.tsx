'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import type { DehydratedState } from '@tanstack/react-query';
import { Form } from '@fernando_neirot2/ui';
import { ProductList, ProductsHydrationBoundary, useProducts } from '../../features/products';

interface DashboardClientProps {
  dehydratedState?: DehydratedState;
  userId: string;
}

const Dashboard = ({ dehydratedState, userId }: DashboardClientProps) => {
  const router = useRouter();

  const goToAddProduct = () => {
    router.push('/dashboard/producto');
  }

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

const DashboardContent = ({ goToAddProduct, userId }: DashboardContentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { products, isLoading, error } = useProducts({ userId, searchQuery });
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
    <div className='mt-4'>
      <p className='text-lg flex items-center'>
        Total de productos agregados: {" "}
        <span className='ml-2 mr-6 font-semibold'>
          {isLoading ? '...' : products.length}
        </span>
        <Form.Button
          onClick={goToAddProduct}
          label='Agregar nuevo producto'
          textColor='#4450ffff'
        />
      </p>
      <ProductList
        products={products}
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

export default Dashboard