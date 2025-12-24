// Barrel exports para la feature de productos
export { ProductList } from './components/ProductList';
export { ProductGrid } from './components/ProductGrid';
export { useProducts } from './hooks/useProducts';
export { getProducts } from './api/productsApi';
export { prefetchProducts } from './lib/prefetchProducts';
export type { Product, ProductCardActions } from './types';
export type { ProductListProps } from './components/ProductList';
export type { ProductGridProps } from './components/ProductGrid';
export type { UseProductsProps, UseProductsReturn } from './hooks/useProducts';
