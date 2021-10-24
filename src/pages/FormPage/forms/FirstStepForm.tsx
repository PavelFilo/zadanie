// core
import React from "react";
import { Input } from "../../../components/Input/Input";
// styles
import css from "../FormPage.module.scss";
import { Select } from "../../../components/Select/Select";

// libraries
// interface IFirstStepFormProps extends IDefaultProps {

// }
const continentsOptions = [
  {
    id: "ea",
    title: "Eurasia",
  },
  {
    id: "af",
    title: "Africa",
  },
  {
    id: "sa",
    title: "South America",
  },
  {
    id: "na",
    title: "North America",
  },
  {
    id: "an",
    title: "Antarctica",
  },
  {
    id: "au",
    title: "Australia",
  },
];

export const FirstStepForm = () => {
  return (
    <div className={css.formRow}>
      <Input label="Name" name="name" />

      <Input label="Address" name="address" />

      <Input label="Postal Code" name="postalCode" />

      <Select label="Continent" name="continent" options={continentsOptions} />
    </div>
  );
};
