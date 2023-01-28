import { RefreshIcon } from "../icons";

const RenderCount = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="flex w-full justify-end gap-1 text-right text-xs font-light text-gray-500">
      <RefreshIcon
        key={Math.random()}
        color="black"
        width="12"
        className="animate-rotate"
      />{" "}
      {children}
    </div>
  );
};

export default RenderCount;
