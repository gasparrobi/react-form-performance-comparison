import { type SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./TextInput";
import { type ReactNode, useRef } from "react";
import Dummy from "./Dummy";

interface FormField {
  name: string;
  type: string;
  label: string;
  rules: { required: boolean; minLength?: number; pattern?: RegExp };
  validator: (value: string) => boolean;
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

const Form = ({
  isCheckmarkVisibleOnSuccess,
}: {
  isCheckmarkVisibleOnSuccess: boolean;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const renderCounter = useRef(0);
  renderCounter.current += 1;

  // const watchers = {
  //   name: watch("name") as string,
  //   email: watch("email") as string,
  //   password: watch("password") as string,
  //   phoneNumber: watch("phoneNumber") as string,
  // }; // same 👆👇
  const watchers = isCheckmarkVisibleOnSuccess
    ? fields.reduce((acc: { [x: string]: unknown }, field) => {
        acc[field.name] = watch(field.name) as unknown;
        return acc;
      }, {})
    : {};

  const getIsValid = (name: string): boolean | undefined => {
    const field = fields.find((field) => field.name === name);
    return field?.validator(watchers[field.name] as string);
  };

  const onSubmit: SubmitHandler<{ [x: string]: unknown }> = (data) =>
    console.log(data);

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-6 p-6"
    >
      {/* for animation purposes on every render 👇 */}
      <div
        key={Math.random()}
        className=" -z-1 pointer-events-none absolute  left-0 top-0 h-full w-full animate-render-form rounded-lg border-4 border-gray-200"
      ></div>

      <Dummy>react-hook-form</Dummy>

      {fields.map((field) => (
        <div className="relative" key={field.name}>
          <TextInput
            {...register(field.name, field.rules)}
            name={field.name}
            type={field.type}
            label={field.label}
            isInvalid={Boolean(errors[field.name])}
            isValid={isCheckmarkVisibleOnSuccess && getIsValid(field.name)}
          />
          {errors[field.name] && (
            <span className="absolute left-0 top-[calc(100%+3px)] text-xs font-semibold text-red-700">
              This field is invalid:{" "}
              <span className="italic">
                {errors[field.name]?.type as ReactNode}
              </span>
            </span>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="mt-4 rounded-md bg-slate-500 p-4 text-white"
      >
        submit
      </button>
    </form>
  );
};

export default Form;
