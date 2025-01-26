import { useState } from "react";
import ConsoleProvider from "../../components/providers/ConsoleProvider";
import ConsoleActions from "../console/ConsoleActions";
import ConsoleNav from "../nav/ConsoleNav";
import { Outlet } from "react-router";
import CreateFolderModal from "../../components/console/CreateFolderModal";
const ConsoleLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col h-full w-full">
      <ConsoleProvider>
        <ConsoleNav />
        <ConsoleActions setIsOpen={setIsOpen} />
        <Outlet />
        {isOpen && <CreateFolderModal setIsOpen={setIsOpen} />}
      </ConsoleProvider>
    </div>
  );
};

export default ConsoleLayout;
