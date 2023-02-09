/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import TextInput from "./TextInput";
import { type ReactNode, useRef } from "react";
import Dummy from "./Dummy";
import { Formik } from "formik";

interface FormField {
  name: string;
  type: string;
  label: string;
  rules: { required: boolean; minLength?: number; pattern?: RegExp };
  validator: (value: string) => boolean;
}

interface FormValues {
  [key: string]: string;
}

const emailRegex = new RegExp("^[a-zA-Z0-9].+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
const phoneRegex = new RegExp("^[0-9]{8,}$");

const fields: FormField[] = [
  {
    name: "name",
    type: "text",
    label: "name",
    rules: { required: true },
    validator: (value: string) => value?.length > 0,
  },
  {
    name: "email",
    type: "text",
    label: "e-mail",
    rules: { required: true, pattern: emailRegex },
    validator: (value: string) => emailRegex.test(value),
  },
  {
    name: "password",
    type: "password",
    label: "password",
    rules: { required: true, minLength: 8 },
    validator: (value: string) => value?.length > 7,
  },
  {
    name: "phoneNumber",
    type: "text",
    label: "phone number",
    rules: { required: true, pattern: phoneRegex },
    validator: (value: string) => phoneRegex.test(value),
  },
];

const FormFormik = (): JSX.Element => {
  const renderCounter = useRef(0);
  renderCounter.current += 1;

  return (
    <Formik
      initialValues={fields.reduce(
        (acc, field) => ({ ...acc, [field.name]: "" }),
        {}
      )}
      validate={(values: FormValues) => {
        const errors: { [key: string]: string } = {};
        fields.forEach((field) => {
          if (field.rules.required && !values[field.name]) {
            errors[field.name] = "Required";
          }
          if (
            field.rules.minLength &&
            values[field.name].length < field.rules.minLength
          ) {
            errors[field.name] = "Too short";
          }
          if (
            field.rules.pattern &&
            !field.rules.pattern.test(values[field.name])
          ) {
            errors[field.name] = "Invalid";
          }
        });

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        /* and other goodies */
      }) => (
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-6 p-6"
        >
          {/* for animation purposes on every render 👇 */}
          <div
            key={Math.random()}
            className=" -z-1 pointer-events-none absolute  left-0 top-0 h-full w-full animate-render-form"
          ></div>

          <Dummy>Formik</Dummy>

          {fields.map((field) => (
            <div className="relative" key={field.name}>
              <TextInput
                name={field.name}
                type={field.type}
                label={field.label}
                onChange={handleChange}
                onBlur={handleBlur}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                isInvalid={!!errors[field.name] && touched[field.name]}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                isValid={!errors[field.name] && values[field.name].length > 0}
              />
              {errors[field.name] && touched[field.name] && (
                <span className="absolute left-0 top-[calc(100%+3px)] text-xs font-semibold text-orange-400">
                  <span className="italic">{errors[field.name]}</span>
                </span>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 rounded-md bg-indigo-500 py-3 text-white transition-colors hover:bg-indigo-400"
          >
            submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default FormFormik;
