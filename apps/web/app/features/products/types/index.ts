export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface ProductCardActions {
  onViewDetails?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}
