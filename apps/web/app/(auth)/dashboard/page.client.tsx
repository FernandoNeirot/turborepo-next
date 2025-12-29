'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import type { DehydratedState } from '@tanstack/react-query';
import { Form } from '@fernando_neirot2/ui';
import { ProductList, ProductsHydrationBoundary, useProducts } from '../../features/products';
import { SearchBar } from '../../features/search';

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
  const handleFirstButton = (productId: string) => {
    console.log('ver:', productId);
  };

  const handleSecondButton = (productId: string) => {
    console.log('Editar', productId);
  };

  const handleThirdButton = (productId: string) => {
    console.log('eliminar:', productId);
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
      <SearchBar
        query={searchQuery}
        onSearchChange={handleSearchChange}
        className=""
      />
      <ProductList
        products={products}
        isLoading={isLoading}
        error={error}
        searchQuery={searchQuery}
        flexDirection='row'
        actions={{
          first: {
            onClick: handleFirstButton,
            //label: 'Ver',
            icon: 'view',
            backgroundColor: 'BLUE',
            tooltip: 'Ver Producto',
          },
          second: {
            onClick: handleSecondButton,
            //label: 'Editar',
            icon: 'edit',
            backgroundColor: 'GREEN',
            tooltip: 'Editar producto',
          },
          third: {
            onClick: handleThirdButton,
            //label: 'Eliminar',
            icon: 'delete',
            backgroundColor: 'RED',
            tooltip: 'Eliminar producto',
          },
        }}
      />
    </div>
  );
};

export default Dashboard