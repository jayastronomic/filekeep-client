import { FC } from "react";
import { FaUserCircle } from "react-icons/fa";

const ConsoleControls: FC<ConsoleControlsProps> = ({
  setIsProfileMenuOpen,
}) => {
  return (
    <div className="flex w-full pt-4 px-4 flex-row-reverse">
      <button
        onClick={() => setIsProfileMenuOpen(true)}
        className="group flex items-center justify-center rounded-full hover:bg-gray-700 h-10 w-10 transition"
      >
        <FaUserCircle className="text-gray-100 text-3xl group-hover:text-gray-400 transition" />
      </button>
    </div>
  );
};

export default ConsoleControls;
