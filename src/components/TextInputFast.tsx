import clsx from "clsx";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import RenderCount from "./RenderCount";

export type InputType = "text" | "password" | "email";

interface TextInputProps {
  type: InputType;
  label: string;
  name: string;
  required?: boolean;
  isCheckmarkVisibleOnSuccess?: boolean;
  errorMessage?: string;
  [x: string]: unknown;
}

const TextInputFast = ({
  required,
  label,
  isCheckmarkVisibleOnSuccess = true,
  errorMessage,
  ...props
}: TextInputProps): JSX.Element => {
  // const [isInvalid, setIsInvalid] = useState(false);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const renderCounter = useRef(0);
  renderCounter.current += 1;

  // with the :has selector there is no need to check for invalidity with js 🤯
  // const validateField = (e: React.ChangeEvent | React.FocusEvent) => {
  //   const validity = (e.currentTarget as HTMLInputElement).validity.valid;
  //   if (isInvalid === validity) {
  //     setIsInvalid(!validity);
  //   }
  // };

  // const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   touched && validateField(e);
  // };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) return;
    setTouched(true);
    // validateField(e);
  };

  const onInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
    event?.preventDefault();
    inputRef.current?.focus();
    inputRef.current?.blur();
  };

  // with the :has selector there is no need to check for invalidity, we can just check for touched 🤯
  // const _isInvalid = touched && isInvalid;

  return (
    <div className="relative">
      <RenderCount> {renderCounter.current} </RenderCount>
      <div
        className={twMerge(
          clsx(
            "focus-within:shadow-text-input peer relative flex min-h-[60px] min-w-[240px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 transition-shadow sm:min-w-[300px]",
            touched
              ? "[&:has(input:invalid:not(:focus-within))]:border-red-500"
              : ""
          )
        )}
      >
        <div
          key={Math.random()}
          className=" -z-1 pointer-events-none absolute  left-0 top-0 h-full w-full animate-render"
        ></div>
        <input
          className={clsx(
            `peer z-10 block w-full appearance-none border-0 bg-transparent p-0 text-base text-gray-900 placeholder-gray-500 focus:ring-0 focus-visible:outline-none`
          )}
          ref={inputRef}
          aria-label={label}
          aria-required={required}
          // onChange={_onChange}
          onBlur={onBlur}
          placeholder={label}
          required={required}
          onInvalid={onInvalid}
          {...props}
        />

        <label
          className={`transition-opacity,transform block text-xs font-bold uppercase
        text-gray-400 duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0`}
        >
          {label}
        </label>

        {isCheckmarkVisibleOnSuccess && (
          <span
            className={`invisible absolute top-1/2 left-[calc(100%_-_30px)] h-0 w-0 origin-top-left -rotate-45 
          border-b-[3px] border-l-[3px] border-transparent opacity-0 transition-[height,width] delay-[0ms,150ms] 
          peer-valid:visible peer-valid:h-[8px] peer-valid:w-[13px] 
          peer-valid:border-green-500 peer-valid:opacity-100`}
          ></span>
        )}
      </div>
      {touched && (
        <span
          role="alert"
          className="invisible absolute left-0 top-[calc(100%+3px)] text-xs font-semibold text-red-700 peer-[&:has(input:invalid)]:visible"
        >
          {errorMessage || "This field is invalid"}
        </span>
      )}
    </div>
  );
};

export default TextInputFast;
