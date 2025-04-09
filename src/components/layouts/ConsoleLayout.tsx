import { useState, UIEvent, useEffect, useContext } from "react";
import ConsoleActions from "../console/ConsoleActions";
import ConsoleNav from "../navs/ConsoleNav";
import { Outlet, useLocation } from "react-router";
import CreateFolderModal from "../console/CreateFolderModal";
import ConsoleControls from "../console/ConsoleControls";
import ProfileModal from "../../components/console/ProfileModal";
import ShareModal from "../../components/console/ShareModal";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import ManageLinkModal from "../../components/console/ManageLinkModal";
import SyncFolderModal from "../../components/console/SyncFolderModal";

const ConsoleLayout = () => {
  const {
    isNavModalOpen,
    isProfileModalOpen,
    isShareModalOpen,
    isCreateFolderModalOpen,
    isManageLinkModalOpen,
    isSyncFolderModalOpen,
    setModal,
  } = useContext(ConsoleContext);

  const [consoleScrollPosition, setConsoleScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { pathname } = useLocation();

  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth >= 768)
        setModal((prev) => ({ ...prev, isNavModalOpen: false }));
    };

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [windowWidth, setModal]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    setConsoleScrollPosition(scrollTop);
  };

  return (
    <div
      onScroll={handleScroll}
      className={`relative flex flex-col h-full w-full flex-1 bg-[#0d1117] md:flex-row  ${
        isNavModalOpen ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      <ConsoleNav />
      <main className="flex flex-col flex-1">
        <ConsoleControls consoleScrollPosition={consoleScrollPosition} />
        <ConsoleActions />
        <Outlet />
      </main>
      {isCreateFolderModalOpen && <CreateFolderModal />}
      {isProfileModalOpen && <ProfileModal />}
      {isShareModalOpen && <ShareModal />}
      {isManageLinkModalOpen && <ManageLinkModal />}
      {isSyncFolderModalOpen && <SyncFolderModal />}
    </div>
  );
};

export default ConsoleLayout;
