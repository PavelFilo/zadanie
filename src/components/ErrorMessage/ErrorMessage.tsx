// core
import React from "react";
// styles
import css from "./ErrorMessage.module.scss";

interface IErrorMessageProps {
  className?: string;
  message?: string;
}

export const ErrorMessage = ({ className, message }: IErrorMessageProps) => {
  return message ? (
    <div className={`${css.message} ${className}`}>{message}</div>
  ) : null;
};
