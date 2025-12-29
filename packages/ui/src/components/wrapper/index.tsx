import { ProductCard, type ProductCardProps } from "./productCard";
import Tooltip from "./tooltip";

export const Wrapper = {
  ProductCard,
  Tooltip
};

export type WrapperType = {
  ProductCard: typeof ProductCard;
  Tooltip: typeof Tooltip;
};

export type { ProductCardProps } from "./productCard";
export type { TooltipProps } from "./tooltip";

export default Wrapper;