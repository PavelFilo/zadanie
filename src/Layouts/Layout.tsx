// core
import React from "react";
// styles
import css from "./Layout.module.scss";

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  return <div className={css.root}>{children}</div>;
};
