import { Search, Home, User, Settings, Trash, Eye, ShoppingCart, Plus   } from "lucide-react";

export const iconMap = {
  cart: { icon: ShoppingCart, name: "Cart" },
  delete: { icon: Trash, name: "Delete" },
  home: { icon: Home, name: "Home" },
  plus: { icon: Plus, name: "Plus" },
  search: { icon: Search, name: "Search" },
  settings: { icon: Settings, name: "Settings" },
  user: { icon: User, name: "User" },
  view: { icon: Eye, name: "View" },
  none: { icon: () => null, name: "None" },
} as const;

export type IconName = keyof typeof iconMap;
export const iconNames = Object.keys(iconMap) as IconName[];

export const BUTTON_BACKGROUND_COLORS = {
  BLUE: "bg-blue-700 hover:bg-blue-800",
  GREEN: "bg-green-700 hover:bg-green-900",
  GRAY: "bg-gray-400 cursor-not-allowed hover:bg-gray-400",
  PURPLE: "bg-purple-600 hover:bg-purple-700",
  RED: "bg-red-500 hover:bg-red-600",
} as const;
