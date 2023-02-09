import { RefreshIcon } from "../icons";

const RenderCount = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="flex w-full justify-end gap-1 text-right text-xs font-light text-slate-200">
      <RefreshIcon
        key={Math.random()}
        color="text-slate-200"
        width="12"
        className="animate-rotate"
      />{" "}
      {children}
    </div>
  );
};

export default RenderCount;
