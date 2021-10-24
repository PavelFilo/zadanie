// core
import React from "react";
// libraries
import { useDropzone } from "react-dropzone";
import { useFormikContext } from "formik";
// styles
import css from "./File.module.scss";

export interface IFileProps {
  label?: string;
  name: string;
}

export const File = ({ name, label }: IFileProps) => {
  const { setFieldValue, values } = useFormikContext<any>();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFieldValue(name, acceptedFiles[0]);
    },
  });

  const fileUrl = values[name] ? URL.createObjectURL(values[name]) : undefined;
  return (
    <div>
      {label && (
        <div className={css.wLabel}>
          <label className={css.tLabel} htmlFor={name}>
            {label}
          </label>
        </div>
      )}

      {fileUrl ? (
        <div className={css.image}>
          <img src={fileUrl} alt="Dropped file" />

          <button
            className={css.removeButton}
            onClick={() => {
              setFieldValue(name, undefined);
            }}
          >
            <span>x</span>
          </button>
        </div>
      ) : (
        <div
          {...getRootProps({
            className: `${css.dropBox} ${
              isDragActive ? css.activeDropBox : ""
            }`,
          })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Now drop this file</p>
          ) : (
            <p>Drag the file here ...</p>
          )}
        </div>
      )}
    </div>
  );
};
