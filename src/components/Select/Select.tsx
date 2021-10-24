// core
import React from "react";
// styles
import css from "./Select.module.scss";
// libraries
import { useFormikContext, useField } from "formik";
import get from "lodash.get";
// components
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

interface IValue {
  id: string;
  title: string;
}

export interface ISelectProps {
  label?: string;
  name: string;
  placeholder?: string;
  options: IValue[];
}

export const Select = ({
  label,
  name,
  options,
  placeholder = "Select value",
}: ISelectProps) => {
  const [field] = useField({ name, placeholder });
  const { errors, touched, submitCount } = useFormikContext<any>();

  const error =
    get(touched, name) || submitCount > 0 ? get(errors, name) : undefined;

  return (
    <div className={css.root}>
      {label && (
        <div className={css.wLabel}>
          <label className={css.tLabel} htmlFor={name}>
            {label}
          </label>
        </div>
      )}

      <div className={css.inputDiv}>
        <select placeholder={placeholder} {...field}>
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {options.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </select>
      </div>

      {error && <ErrorMessage message={error as string} />}
    </div>
  );
};
