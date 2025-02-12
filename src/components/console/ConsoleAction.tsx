import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { FC, useContext } from "react";

const ConsoleAction: FC<ConsoleActionProps> = ({ label, icon, action }) => {
  const { setModal } = useContext(ConsoleContext);
  return (
    <button
      onClick={
        label === "Upload"
          ? action
          : () =>
              setModal((prev) => ({ ...prev, isCreateFolderModalOpen: true }))
      }
      className="flex flex-col border border-gray-800 rounded-xl p-4 hover:bg-gray-800 transition shadow bg-[#151B23] text-white cursor-pointer"
    >
      <div>
        <span>{label}</span>
      </div>
      <div>{icon}</div>
    </button>
  );
};

export default ConsoleAction;
