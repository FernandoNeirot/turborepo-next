import {
  Search,
  Home,
  User,
  Settings,
  Trash,
  Eye,
  ShoppingCart,
  Plus,
  LogIn,
  LogOut,
  Heart,
  SquarePen,
  Menu,
} from "lucide-react";

export const iconMap = {
  cart: { icon: ShoppingCart, name: "Cart" },
  delete: { icon: Trash, name: "Delete" },
  edit: { icon: SquarePen, name: "Edit" },
  heart: { icon: Heart, name: "Heart" },
  home: { icon: Home, name: "Home" },
  logout: { icon: LogOut, name: "Logout" },
  login: { icon: LogIn, name: "Login" },
  plus: { icon: Plus, name: "Plus" },
  search: { icon: Search, name: "Search" },
  settings: { icon: Settings, name: "Settings" },
  user: { icon: User, name: "User" },
  view: { icon: Eye, name: "View" },
  menu: { icon: Menu, name: "Menu" },
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
  TRANSPARENT: "bg-transparent",
  TRANSPARENT_02: "bg-transparent hover:bg-gray-100",
} as const;
