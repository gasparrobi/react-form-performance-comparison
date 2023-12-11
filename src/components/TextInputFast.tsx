import clsx from "clsx";
import { useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const renderCounter = useRef(0);
  renderCounter.current += 1;

  const onInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
    event?.preventDefault();
    inputRef.current?.focus();
    inputRef.current?.blur();
  };

  // with the :has selector there is no need to check for invalidity, we can just check for touched 🤯
  // const _isInvalid = touched && isInvalid;

  // with the user-invalid pseudo class we don't even have to check for touched 🤯

  return (
    <div className="relative">
      <RenderCount> {renderCounter.current} </RenderCount>
      <div
        className={twMerge(
          "focus-within:shadow-text-input peer relative flex min-h-[60px] min-w-[240px] flex-col-reverse justify-center rounded-md border border-slate-500 px-3 py-2 transition-shadow sm:min-w-[300px] [&:has(input:user-invalid)]:border-orange-400"
        )}
      >
        <div
          key={Math.random()}
          className=" -z-1 pointer-events-none absolute  left-0 top-0 h-full w-full animate-render"
        ></div>
        <input
          className={clsx(
            `peer z-10 block w-full appearance-none border-0 bg-transparent p-0 text-base text-slate-200 placeholder-slate-400 focus:ring-0 focus-visible:outline-none`
          )}
          ref={inputRef}
          aria-label={label}
          aria-required={required}
          placeholder={label}
          required={required}
          onInvalid={onInvalid}
          {...props}
        />

        <label
          className={`transition-opacity,transform block text-xs font-bold uppercase
        text-slate-400 duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0`}
        >
          {label}
        </label>

        {isCheckmarkVisibleOnSuccess && (
          <span
            className={`_transition-[height,width] _delay-[0ms,150ms] invisible absolute top-1/2 left-[calc(100%_-_30px)] h-0 w-0 
          origin-top-left -rotate-45 border-b-[3px] border-l-[3px] border-transparent opacity-0 
          peer-valid:visible peer-valid:h-[8px] peer-valid:w-[13px] 
          peer-valid:border-green-500 peer-valid:opacity-100`}
          ></span>
        )}
      </div>

      <span
        role="alert"
        className="invisible absolute left-0 top-[calc(100%+3px)] text-xs font-normal text-orange-400 peer-[&:has(input:user-invalid)]:visible"
      >
        {errorMessage || "This field is invalid"}
      </span>
    </div>
  );
};

export default TextInputFast;
