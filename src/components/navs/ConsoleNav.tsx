import { useContext } from "react";
import FileKeepIcon from "../home/FileKeepIcon";
import { Link, useLocation } from "react-router";
import { RiArchiveStackLine } from "react-icons/ri";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";

const ConsoleNav = () => {
  const { isNavModalOpen, setModal } = useContext(ConsoleContext);
  const { pathname } = useLocation();
  return (
    <>
      <div className="hidden ghost-nav w-[16rem] md:block"></div>
      <div
        className={`fixed flex z-[11] h-full top-[4.5rem] text-white md:left-0 md:top-0 md:z-1  ${
          isNavModalOpen
            ? "duration-200 left-0 ease-in-out"
            : "duration-200 ease-in -left-[100%] top-20 md:duration-0"
        }`}
      >
        <nav className={`items-center shadow bg-[#151B23]`}>
          <div>
            <Link to="/home">
              <FileKeepIcon width="60" height="60" viewBox="0 0 375 375" />
            </Link>
          </div>
        </nav>
        <div className="flex flex-col bg-[#151B23] w-[12.25rem] h-full border-l border-gray-700 p-4">
          <h1 className="font-semibold mb-8">Folders</h1>
          <div className="flex flex-col">
            <Link
              to="/home"
              className={`flex items-center space-x-4 rounded-xl p-2 hover:bg-gray-600 ${
                pathname === "/home" ? "bg-gray-600" : ""
              }`}
            >
              <span>All files</span>
              <RiArchiveStackLine />
            </Link>
          </div>
        </div>
      </div>
      {isNavModalOpen && (
        <button
          onClick={() =>
            setModal((prev) => ({ ...prev, isNavModalOpen: false }))
          }
          className={`fixed top-[4.5rem] h-full w-full bg-black/50 z-10 md:hidden`}
        ></button>
      )}
    </>
  );
};

export default ConsoleNav;
