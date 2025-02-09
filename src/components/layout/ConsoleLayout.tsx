import { useState } from "react";
import ConsoleActions from "../console/ConsoleActions";
import ConsoleNav from "../nav/ConsoleNav";
import { Outlet } from "react-router";
import CreateFolderModal from "../../components/console/CreateFolderModal";
import ConsoleControls from "../../components/console/ConsoleControls";
import ProfileMenu from "../../components/console/ProfileMenu";
const ConsoleLayout = () => {
  const [isCreateFolderModalOpen, setIsCreatFolderModalOpen] =
    useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col h-full w-full flex-1 bg-[#0d1117] md:flex-row overflow-hidden">
      <ConsoleNav setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <div className="flex flex-col w-full">
        <ConsoleControls
          setIsProfileMenuOpen={setIsProfileMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <ConsoleActions setIsOpen={setIsCreatFolderModalOpen} />
        <Outlet />
      </div>
      {isCreateFolderModalOpen && (
        <CreateFolderModal setIsOpen={setIsCreatFolderModalOpen} />
      )}
      {isProfileMenuOpen && <ProfileMenu setIsOpen={setIsProfileMenuOpen} />}
    </div>
  );
};

export default ConsoleLayout;
