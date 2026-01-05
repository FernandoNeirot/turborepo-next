export interface Product {
  id: string;
  title: string;
  sold: boolean;
  description: string;
  descriptionClean?: string;
  phone?: string;
  price: number;
  imageUrl: string;
  imageFile?: File;
  slug?: string;
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
  sold: boolean;
  descriptionClean?: string;
  price: number;
  phone?: string;
  imageUrl?: string;
  userId?: string;
  slug?: string;
}

export interface UpdateProductInput extends CreateProductInput {
  id: string;
}
