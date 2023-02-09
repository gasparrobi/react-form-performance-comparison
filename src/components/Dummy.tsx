import { useRef } from "react";
import RenderCount from "./RenderCount";

const Dummy = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const renderCounter = useRef(0);
  renderCounter.current++;

  return (
    <div className="cursor-default">
      <RenderCount> {renderCounter.current} </RenderCount>
      <div className="0 relative w-full overflow-hidden rounded-md px-4 py-2 text-center">
        <div
          key={Math.random()}
          className=" -z-1 pointer-events-none absolute  left-0 top-0 h-full w-full animate-render"
        ></div>
        <p className="font-semibold text-slate-400">{children}</p>
      </div>
    </div>
  );
};

export default Dummy;
