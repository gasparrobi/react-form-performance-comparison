import clsx from "clsx";
import { forwardRef, useRef } from "react";
import RenderCount from "./RenderCount";

interface TextInputProps {
  label: string;
  name: string;
  type: string;
  isInvalid?: boolean;
  isValid?: boolean;
}

const TextInput = forwardRef(
  ({ isInvalid, isValid = false, ...props }: TextInputProps, ref) => {
    const renderCounter = useRef(0);
    renderCounter.current += 1;

    return (
      <>
        <RenderCount> {renderCounter.current} </RenderCount>
        <div
          // key={Math.random()}
          className={clsx(
            "relative flex min-h-[60px] min-w-[240px] flex-col-reverse justify-center overflow-hidden rounded-md border border-slate-500 px-3 py-2 shadow-sm  focus-within:shadow-inner sm:min-w-[300px]",
            isInvalid ? "border-orange-400 " : ""
          )}
        >
          <div
            key={Math.random()}
            className=" -z-1 pointer-events-none absolute  left-0 top-0 h-full w-full animate-render"
          ></div>
          <input
            ref={ref as unknown as React.Ref<HTMLInputElement>}
            className={clsx(
              "peer z-10 block w-full border-0 bg-transparent p-0 text-base text-slate-200 placeholder-slate-400 focus:ring-0"
            )}
            placeholder={props.label}
            {...props}
          />
          <label
            htmlFor="email"
            className={` transition-opacity,transform block text-xs font-bold uppercase text-slate-400
          duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0`}
          >
            {props.label}
          </label>
          {isValid && (
            <span
              className={`invisible absolute top-1/2 left-[calc(100%_-_30px)] h-0 w-0 origin-top-left -rotate-45 
          border-b-[3px] border-l-[3px] border-transparent opacity-0 transition-[height,width] delay-[0ms,150ms] 
          peer-valid:visible peer-valid:h-[8px] 
          peer-valid:w-[13px] peer-valid:border-green-500 peer-valid:opacity-100`}
            ></span>
          )}
        </div>
      </>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
