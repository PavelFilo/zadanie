// core
import React from "react";
// styles
import css from "./Button.module.scss";

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  children,
  className,
  disabled,
  type = "button",
  onClick,
  ...passingProps
}: IButtonProps) => {
  return (
    <button
      className={`${css.button} ${className} ${disabled && css.disabled}`}
      type={type}
      onClick={onClick}
      {...passingProps}
    >
      {children}
    </button>
  );
};
