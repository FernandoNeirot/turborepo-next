import Header from "./header";
import { ProductCard, type ProductCardProps } from "./productCard";
import Tooltip from "./tooltip";

export const Wrapper = {
  ProductCard,
  Tooltip,
  Header
};

export type WrapperType = {
  ProductCard: typeof ProductCard;
  Tooltip: typeof Tooltip;
  Header: typeof Header;
};

export type { ProductCardProps } from "./productCard";
export type { TooltipProps } from "./tooltip";
export type { HeaderProps } from "./header";

export default Wrapper;