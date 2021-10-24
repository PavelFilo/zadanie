// core
import React from "react";
// styles
import css from "../FormPage.module.scss";

export const SuccessCallout = () => {
  return (
    <div className={css.callout}>
      Form has been successfully send, thanks for your time :)
    </div>
  );
};
