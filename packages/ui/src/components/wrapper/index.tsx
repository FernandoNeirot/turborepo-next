import { ProductCard, type ProductCardProps } from "./productCard";

export const Wrapper = {
  ProductCard
};

export type WrapperType = {
  ProductCard: typeof ProductCard;
};

export type { ProductCardProps };

export default Wrapper;