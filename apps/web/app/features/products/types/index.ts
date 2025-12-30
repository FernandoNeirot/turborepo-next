export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imageFile?: File;
}

export interface ProductCardButtonAction {
  onClick?: (productId: string) => void;
  label?: string;
  icon?: string;
  backgroundColor?: string;
  tooltip?: string;
}

export interface ProductCardActions {
  first?: ProductCardButtonAction;
  second?: ProductCardButtonAction;
  third?: ProductCardButtonAction;
}

export interface CreateProductInput {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  userId?: string;
}

export interface UpdateProductInput extends CreateProductInput {
  id: string;
}