import { useRef } from "react";
import Dummy from "./Dummy";
import TextInputFast, { type InputType } from "./TextInputFast";

const emailRegex =
  '^(([^<>()[\\].,;:\\s@"]+(.[^<>()[\\].,;:\\s@"]+)*)|(".+"))@(([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3})|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,256}))$';
const phoneRegex = "^[0-9]{8,}$";

const fields = [
  {
    name: "name",
    type: "text" as InputType,
    label: "name",
    rules: { required: true },
  },
  {
    name: "email",
    type: "text" as InputType,
    label: "e-mail",
    rules: { required: true, pattern: emailRegex },
    specialValidationMessage: "Email format is invalid: example@domain.com",
  },
  {
    name: "password",
    type: "password" as InputType,
    label: "password",
    rules: { required: true, minlength: 8 },
  },
  {
    name: "phoneNumber",
    type: "text" as InputType,
    label: "phone number",
    rules: { required: true, pattern: phoneRegex },
  },
];

const FastForm = ({
  isCheckmarkVisibleOnSuccess,
}: {
  isCheckmarkVisibleOnSuccess: boolean;
}): JSX.Element => {
  const renderCounter = useRef(0);
  renderCounter.current += 1;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const _formData = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );

    console.log(_formData);
    // event.currentTarget.reset();
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      className="relative flex flex-col gap-6 p-6"
    >
      <div
        key={Math.random()}
        className=" -z-1 pointer-events-none absolute  left-0 top-0 h-full w-full animate-render-form rounded-lg border-4 border-gray-200"
      ></div>
      {/* register your input into the hook by invoking the "register" function */}

      <Dummy>Custom Form</Dummy>

      {fields.map((field) => (
        <TextInputFast
          key={field.name}
          name={field.name}
          type={field.type}
          label={field.label}
          required={field.rules.required}
          pattern={field.rules.pattern}
          minLength={field.rules.minlength}
          isCheckmarkVisibleOnSuccess={true}
          specialValidationMessage={field.specialValidationMessage}
        />
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

export default FastForm;
