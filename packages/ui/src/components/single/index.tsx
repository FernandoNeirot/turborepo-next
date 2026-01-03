import Header from "./header";
import Loader from "./loader";
import SidebarMobile from "./sidebar";

export const Single = {
  Header,
  Loader,
  SidebarMobile,
};

export type SingleType = {
  Header: typeof Header;
  Loader: typeof Loader;
  SidebarMobile: typeof SidebarMobile;
};

export type { HeaderProps } from "./header";
export type { LoaderProps } from "./loader";
export type { SidebarMobileProps } from "./sidebar";

export default Single;
