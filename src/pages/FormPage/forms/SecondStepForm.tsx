// core
import React from "react";
import { Input } from "../../../components/Input/Input";
// styles
import css from "../FormPage.module.scss";
import { File } from "../../../components/File/File";
import { Button } from "../../../components/Button/Button";
// libraries
interface ISecondStepFormProps {
  nestedCount: number;
  onAdd: () => void;
}

export const SecondStepForm = ({
  nestedCount,
  onAdd,
}: ISecondStepFormProps) => {
  return (
    <div>
      <div className={css.formRow}>
        <File name="file" label="File" />

        <Input
          classNameInput={css.textArea}
          bTextArea
          name="description"
          label="Description"
        />
      </div>
      <div>
        {Array(nestedCount)
          .fill("")
          .map((_, index) => (
            <div key={index} className={`${css.formRow} ${css.marginTop}`}>
              <Input label="Name" name={`nested[${index}].name`} />
              <Input
                label="Count"
                type="number"
                name={`nested[${index}].count`}
              />
              <Input
                label="Price"
                type="number"
                name={`nested[${index}].price`}
              />
            </div>
          ))}
        {nestedCount < 5 && (
          <Button className={css.marginTop} onClick={() => onAdd()}>
            +
          </Button>
        )}
      </div>
    </div>
  );
};
