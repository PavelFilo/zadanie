// core
import React, { useState, useCallback, useMemo } from "react";
// libraries
import * as Yup from "yup";
import { Form, Formik, FormikErrors, FormikHelpers } from "formik";
// components
import { Button } from "../../components/Button/Button";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
// partials
import { FirstStepForm } from "./forms/FirstStepForm";
import { SecondStepForm } from "./forms/SecondStepForm";
import { ThirdStepForm } from "./forms/ThirdStepForm";
import { SuccessCallout } from "./partials/SuccessCallout";
import { OnChange } from "./partials/OnChange";
// styles
import css from "./FormPage.module.scss";

// regex for phone number validation
const phoneRegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;

const formValidationSchema = Yup.object()
  .shape({
    name: Yup.string().ensure().required(),
    address: Yup.string().ensure().required(),
    postalCode: Yup.string().ensure(),
    continent: Yup.string().default("").ensure().required(),

    file: Yup.mixed(),
    description: Yup.string().ensure(),
    nested: Yup.array()
      .of(
        Yup.object()
          .shape({
            name: Yup.string().ensure().required(),
            count: Yup.number().default(0).required().integer().strict(true),
            price: Yup.number().default(0).required(),
          })
          .defined()
      )
      .default([]),

    phone: Yup.string()
      .ensure()
      .matches(phoneRegExp, "Phone number is not valid"),
    email: Yup.string().ensure().email(),
  })
  .defined();

const formFields = [
  ["name", "address", "postalCode", "continent"],

  ["file", "description", "nested"],

  ["email", "phone"],
];

export type IFormValues = Yup.InferType<typeof formValidationSchema>;

const MAX_STEP = 3;
const REQUEST_URL =
  "https://api.softygon.com/webhook?token=VPxJ4QLVVCUxOC7yJf8NhCUZiIqx0IUn7KUOoRIe";

export const FormPage = () => {
  const [step, setStep] = useState<number>(1);
  const [nestedCount, setNestedCount] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const [successCallout, setSuccessCallout] = useState<boolean>(false);

  const onSubmit = useCallback(
    (values: IFormValues, helpers: FormikHelpers<IFormValues>) => {
      delete values.file;

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      fetch(REQUEST_URL, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          if (!response.error) setSuccessCallout(true);
          else setError(response.message);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => helpers.setSubmitting(false));
    },
    []
  );

  const onNextClick = useCallback(
    (
      errors: FormikErrors<IFormValues>,
      setFieldTouched: (field: string) => void
    ) => {
      formFields[step - 1].forEach((field) => setFieldTouched(field));
      const errorKeys = Object.keys(errors);
      if (formFields[step - 1].find((field) => errorKeys.includes(field)))
        setError("First resolve errors in current step to continue to next.");
      else {
        if (error) {
          setError(undefined);
        }

        setStep((prev) => prev + 1);
      }
    },
    [error, step]
  );

  const onBackClick = () => {
    setStep((prev) => prev - 1);
  };

  const onAddNested = () => {
    setNestedCount((prev) => prev + 1);
  };

  const initialValues = useMemo(() => {
    const values = localStorage.getItem("values");

    const parsedValues = values ? JSON.parse(values) : {};

    if (parsedValues.nested?.length)
      setNestedCount(parsedValues.nested?.length);

    return formValidationSchema.cast(parsedValues);
  }, []);

  const steps = [
    <FirstStepForm />,
    <SecondStepForm nestedCount={nestedCount} onAdd={onAddNested} />,
    <ThirdStepForm />,
  ];

  return (
    <div>
      <h1>Form Page</h1>

      {successCallout ? (
        <SuccessCallout />
      ) : (
        <Formik
          validateOnChange
          initialValues={initialValues}
          validationSchema={formValidationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldTouched, errors, isSubmitting }) => (
            <Form className={css.form}>
              <OnChange />

              {steps[step - 1]}

              <ErrorMessage message={error} />

              <div className={css.wButtons}>
                {step > 1 && <Button onClick={onBackClick}>Back</Button>}

                {step < MAX_STEP ? (
                  <Button onClick={() => onNextClick(errors, setFieldTouched)}>
                    Next
                  </Button>
                ) : (
                  <Button disabled={isSubmitting} type="submit">
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
