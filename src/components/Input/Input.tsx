// .core
import React from "react";
// styles
import css from "./Input.module.scss";
// libraries
import { useFormikContext, useField } from "formik";
import get from "lodash.get";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export interface IInputProps {
  /**
   * Whether input should be textarea or not
   * @default 'false'
   */
  bTextArea?: boolean;

  classNameInput?: string;
  label?: string;
  name: string;
  placeholder?: string;
  type?: "email" | "text" | "number" | "password";
}

export const Input = ({
  bTextArea,

  classNameInput,
  label,
  name,
  placeholder = "Enter value",
  type = "text",
}: IInputProps) => {
  const [field] = useField({ name, type, placeholder });
  const { errors, touched, submitCount } = useFormikContext<any>();

  const error =
    get(touched, name) || submitCount > 0 ? get(errors, name) : undefined;

  return (
    <div className={css.wInput}>
      {label && (
        <div className={css.wLabel}>
          <label className={css.tLabel} htmlFor={name}>
            {label}
          </label>
        </div>
      )}

      {bTextArea ? (
        <textarea
          className={`${css.fInput} ${classNameInput}`}
          placeholder={placeholder}
          {...field}
        />
      ) : (
        <div className={css.inputDiv}>
          <input
            className={`${css.fInput} ${classNameInput}`}
            placeholder={placeholder}
            type={type}
            {...field}
          />
        </div>
      )}

      {error && <ErrorMessage message={error as string} />}
    </div>
  );
};
