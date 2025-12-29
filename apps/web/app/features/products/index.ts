// Barrel exports para la feature de productos
export { ProductList } from './components/ProductList';
export { ProductGrid } from './components/ProductGrid';
export { ProductForm } from './components/ProductForm';
export { ProductsHydrationBoundary } from './components/ProductsHydrationBoundary';
export { useProducts } from './hooks/useProducts';
export { useProductMutation } from './hooks/useProductMutation';
export { getProducts, createProduct, updateProduct } from './api/productsApi';
export { prefetchProducts } from './lib/prefetchProducts';
export type { PrefetchProductsOptions } from './lib/prefetchProducts';
export type {
  Product,
  ProductCardActions,
  ProductCardButtonAction,
  CreateProductInput,
  UpdateProductInput,
} from './types';
export type { ProductListProps } from './components/ProductList';
export type { ProductGridProps } from './components/ProductGrid';
export type { ProductFormProps } from './components/ProductForm';
export type { ProductsHydrationBoundaryProps } from './components/ProductsHydrationBoundary';
export type { UseProductsProps, UseProductsReturn } from './hooks/useProducts';
export type { UseProductMutationOptions } from './hooks/useProductMutation';
