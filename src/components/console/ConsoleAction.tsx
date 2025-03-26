import { FC } from "react";

const ConsoleAction: FC<ConsoleActionProps> = ({ label, icon, action }) => {
  return (
    <button
      onClick={action}
      className="flex flex-col border border-gray-800 rounded-xl p-4 hover:bg-gray-800 transition shadow bg-[#151B23] text-white cursor-pointer space-y-1"
    >
      <span>{label}</span>
      <span>{icon}</span>
    </button>
  );
};

export default ConsoleAction;
