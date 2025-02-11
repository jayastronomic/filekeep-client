import { useState, UIEvent, useEffect } from "react";
import ConsoleActions from "../console/ConsoleActions";
import ConsoleNav from "../navs/ConsoleNav";
import { Outlet } from "react-router";
import CreateFolderModal from "../console/CreateFolderModal";
import ConsoleControls from "../console/ConsoleControls";
import ProfileMenu from "../console/ProfileMenu";
const ConsoleLayout = () => {
  const [isCreateFolderModalOpen, setIsCreatFolderModalOpen] =
    useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [consoleScrollPosition, setConsoleScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth >= 768) setIsMenuOpen(false);
    };

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [windowWidth]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    setConsoleScrollPosition(scrollTop);
  };

  return (
    <div
      onScroll={handleScroll}
      className={`relative flex flex-col h-full w-full flex-1 bg-[#0d1117] md:flex-row  ${
        isMenuOpen ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      <ConsoleNav setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <div className="flex flex-col flex-1">
        <ConsoleControls
          setIsProfileMenuOpen={setIsProfileMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          consoleScrollPosition={consoleScrollPosition}
        />
        <ConsoleActions
          setIsCreateFolderModalOpen={setIsCreatFolderModalOpen}
        />
        <Outlet />
      </div>
      {isCreateFolderModalOpen && (
        <CreateFolderModal
          setIsCreateFolderModalOpen={setIsCreatFolderModalOpen}
        />
      )}
      {isProfileMenuOpen && (
        <ProfileMenu setIsProfileMenuOpen={setIsProfileMenuOpen} />
      )}
    </div>
  );
};

export default ConsoleLayout;
