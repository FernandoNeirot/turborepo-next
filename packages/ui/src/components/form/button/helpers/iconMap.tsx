import { Search, Home, User, Settings, Trash } from "lucide-react";

export const iconMap = {
  search: { icon: Search, name: "Search" },
  home: { icon: Home, name: "Home" },
  user: { icon: User, name: "User" },
  settings: { icon: Settings, name: "Settings" },
  delete: { icon: Trash, name: "Delete" },
} as const;

export type IconName = keyof typeof iconMap;
export const iconNames = Object.keys(iconMap) as IconName[];
