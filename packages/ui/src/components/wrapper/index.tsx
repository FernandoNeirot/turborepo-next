import { ProductCard, ProductCardProps } from "./productCard";

export const Wrapper = {
  ProductCard
};

export type WrapperType = {
  ProductCard: typeof ProductCard;
  ProductCardProps: ProductCardProps;
};

export default Wrapper;