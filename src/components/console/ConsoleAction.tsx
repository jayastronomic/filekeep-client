import { FC } from "react";

const ConsoleAction: FC<ConsoleActionProps> = ({
  label,
  icon,
  clickHandler,
}) => {
  return (
    <button
      onClick={clickHandler || (() => {})}
      className="flex flex-col border rounded-xl p-4 hover:bg-gray-100 transition shadow"
    >
      <div>
        <span>{label}</span>
      </div>
      <div>{icon}</div>
    </button>
  );
};

export default ConsoleAction;