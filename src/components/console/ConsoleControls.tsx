import { FC } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";

const ConsoleControls: FC<ConsoleControlsProps> = ({
  setIsProfileMenuOpen,
  setIsMenuOpen,
  consoleScrollPosition,
}) => {
  return (
    <div
      className={`flex w-full py-4 px-4 justify-between md:flex-row-reverse sticky top-0 bg-[#0d1117] transiton-all duration-100 border-gray-800 ${
        consoleScrollPosition > 0
          ? "border-b shadow shadow-gray-800 z-[10]"
          : ""
      }`}
    >
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="group flex items-center justify-center rounded-full hover:bg-gray-700 h-10 w-10 transition md:hidden"
      >
        <FaBars className="text-gray-100 text-xl group-hover:text-gray-400 transition" />
      </button>
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
