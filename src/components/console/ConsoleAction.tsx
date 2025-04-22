import { FC } from "react";

const ConsoleAction: FC<ConsoleActionProps> = ({ label, icon, action }) => {
  return (
    <button
      onClick={action}
      className="flex flex-col border border-gray-800 rounded-xl p-4 hover:bg-gray-800 transition shadow bg-[#151B23] text-white cursor-pointer space-y-1"
    >
      <span>{label}</span>
      <div className="flex justify-between items-center">
        <span>{icon}</span>
        {label === "Unsync Folder" && (
          <span className="flex items-center space-x-1">
            <div className="text-xs text-gray-700">synced</div>
            <div className="rounded-full bg-green-500 w-2 h-2 animate-pulse"></div>
          </span>
        )}
      </div>
    </button>
  );
};

export default ConsoleAction;
