import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { useAuth } from "../../hooks/useAuth";
import { FC, useContext } from "react";
import { FaBars } from "react-icons/fa";

const ConsoleControls: FC<ConsoleControlsProps> = ({
  consoleScrollPosition,
}) => {
  const { setModal } = useContext(ConsoleContext);
  const { authUser } = useAuth();
  const { firstName, lastName } = authUser!;
  const initials = firstName.charAt(0) + lastName.charAt(0);
  return (
    <div
      className={`flex w-full py-4 px-4 justify-between md:flex-row-reverse sticky top-0 bg-[#0d1117] transiton-all duration-100 border-gray-800 ${
        consoleScrollPosition > 0
          ? "border-b shadow shadow-gray-800 z-[10]"
          : ""
      }`}
    >
      <button
        onClick={() =>
          setModal((prev) => ({
            ...prev,
            isNavModalOpen: !prev.isNavModalOpen,
          }))
        }
        className="group flex items-center justify-center rounded-full hover:bg-gray-800 h-10 w-10 transition md:hidden"
      >
        <FaBars className="text-gray-100 text-xl transition" />
      </button>
      <button
        onClick={() =>
          setModal((prev) => ({
            ...prev,
            isProfileModalOpen: true,
          }))
        }
        className="text-center rounded-full hover:bg-gray-700 h-10 w-10 transition text-gray-300 border border-gray-800 text-xs"
      >
        {initials}
      </button>
    </div>
  );
};

export default ConsoleControls;
