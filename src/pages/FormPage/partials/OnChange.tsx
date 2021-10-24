// core
import { useEffect } from "react";
// libraries
import { useFormikContext } from "formik";
// partial
import { IFormValues } from "../FormPage";

export const OnChange = () => {
  const { values } = useFormikContext<IFormValues>();

  useEffect(() => {
    const copiedValues = { ...values };

    // to not save whole file object into local storage
    delete copiedValues.file;

    localStorage.setItem("values", JSON.stringify(copiedValues));
  }, [values]);

  return null;
};
