// core
import React, { useState, useCallback } from "react";
// components
import { Input } from "../../../components/Input/Input";
// styles
import css from "../FormPage.module.scss";

interface INestedItemProps {
  index: number;
}

export const NestedItem = ({ index }: INestedItemProps) => {
  const [shown, setShown] = useState<boolean>(false);

  const onShowToggle = useCallback(() => {
    setShown((prev) => !prev);
  }, []);

  return (
    <div>
      <div className={css.item} onClick={onShowToggle}>
        <h4>Item {index + 1}</h4>
        <span>{shown ? "-" : "+"}</span>
      </div>
      <div
        className={`${css.formRow} ${css.marginTop} ${!shown && css.shrinked}`}
      >
        <Input label="Name" name={`nested[${index}].name`} />

        <Input label="Count" type="number" name={`nested[${index}].count`} />

        <Input label="Price" type="number" name={`nested[${index}].price`} />
      </div>
    </div>
  );
};
