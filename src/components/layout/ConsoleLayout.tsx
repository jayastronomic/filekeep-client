import { useState } from "react";
import ConsoleActions from "../console/ConsoleActions";
import ConsoleNav from "../nav/ConsoleNav";
import { Outlet } from "react-router";
import CreateFolderModal from "../../components/console/CreateFolderModal";
const ConsoleLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col h-full w-full flex-1 bg-[#0d1117]">
      <ConsoleNav />
      <ConsoleActions setIsOpen={setIsOpen} />
      <Outlet />
      {isOpen && <CreateFolderModal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ConsoleLayout;
