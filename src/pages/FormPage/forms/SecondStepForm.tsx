// core
import React from "react";
// components
import { Input } from "../../../components/Input/Input";
import { File } from "../../../components/File/File";
import { Button } from "../../../components/Button/Button";
// styles
import css from "../FormPage.module.scss";
import { NestedItem } from "../partials/NestedItem";
// libraries
import { FieldArray } from "formik";

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

      <FieldArray
        name="nested"
        render={({ push }) => (
          <>
            {Array(nestedCount)
              .fill("")
              .map((_, index) => (
                <NestedItem key={index} index={index} />
              ))}

            {nestedCount < 5 && (
              <Button
                className={css.marginTop}
                onClick={() => {
                  onAdd();
                  push({ name: "", count: 0, price: 0 });
                }}
              >
                +
              </Button>
            )}
          </>
        )}
      />
    </div>
  );
};
