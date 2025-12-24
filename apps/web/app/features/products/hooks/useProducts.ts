'use client'

import { useState, useEffect, useMemo } from 'react';
import type { Product } from '../types';

// Datos mock - en producción esto vendría de una API
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Pantalon Jean',
    description: 'Hermoso pantalon jean azul oscuro. Talle 32.',
    price: 199.99,
    imageUrl: '/pantalon-jean.webp',
  },
  {
    id: '2',
    title: 'Pantalon',
    description: 'Gran oportunidad, pantalon de alta calidad. Talle M.',
    price: 15370,
    imageUrl: '/pantalon-gris.webp',
  },
  {
    id: '3',
    title: 'Pantalon Marron',
    description: 'Gran oportunidad, pantalon de alta calidad. Talle M.',
    price: 199.99,
    imageUrl: '/pantalon-marron.webp',
  },
   {
    id: '4',
    title: 'Remera Gris',
    description: 'Remera gris de excelente calidad y diseño moderno. Talle XL. Perfecta para uso diario.',    
    price: 199.99,
    imageUrl: '/remera-gris.webp',
  },
   {
    id: '5',
    title: 'Remera negra',
    description: 'Remera negra de excelente calidad y diseño moderno. Talle L. Perfecta para uso diario.',
    price: 199.99,
    imageUrl: '/remera-negra.webp',
  },
   {
    id: '6',
    title: 'Remera',
    description: 'Gran oportunidad, remera de alta calidad. Talle M.',
    price: 199.99,
    imageUrl: '/remera.webp',
  },
   {
    id: '7',
    title: 'Vaquero Azul',
    description: 'Gran oportunidad, vaquero de alta calidad. Talle S.',
    price: 199.99,
    imageUrl: '/vaquero.webp',
  },
   {
    id: '8',
    title: 'Vestido Azul',
    description: 'Gran oportunidad, vestido de alta calidad. Talle M.',
    price: 199.99,
    imageUrl: '/vestido-azul.webp',
  },
  {
    id: '9',
    title: 'Vestido Marron',
    description: 'Gran oportunidad, vestido de alta calidad. Talle M.',
    price: 199.99,
    imageUrl: '/vestido-marron.webp',
  },
];

export interface UseProductsProps {
  searchQuery?: string;
}

export interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  filteredProducts: Product[];
}

export function useProducts({ searchQuery = '' }: UseProductsProps = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulación de carga de productos
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        // Aquí harías la llamada real a la API
        // const response = await fetch('/api/products');
        // const data = await response.json();
        
        // Simulación de delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setProducts(MOCK_PRODUCTS);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter(
      product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return {
    products,
    isLoading,
    error,
    filteredProducts,
  };
}
