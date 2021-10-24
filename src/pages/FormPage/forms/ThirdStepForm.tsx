// core
import React from "react";
import { Input } from "../../../components/Input/Input";
// styles
import css from "../FormPage.module.scss";
// libraries
// interface IThirdStepFormProps extends IDefaultProps {

// }

export const ThirdStepForm = () => {
  return (
    <div className={css.formRow}>
      <Input name="phone" label="Phone number" />

      <Input type="email" name="email" label="Email" />
    </div>
  );
};
