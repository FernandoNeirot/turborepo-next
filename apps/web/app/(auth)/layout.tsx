import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="px-4 w-full max-w-310 mx-auto pt-5">{children}</div>;
}
