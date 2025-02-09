import { FC } from "react";
import FileKeepIcon from "../../components/home/FileKeepIcon";
import { Link } from "react-router";

const ConsoleNav: FC<ConsoleNavProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <>
      <nav
        className={`absolute transition-all duration-600 z-10 items-center p-4 border-b border-gray-800 shadow bg-[#151B23] text-white h-full md:flex md:flex-col md:relative md:left-0 md:top-0 ${
          isMenuOpen
            ? "left-0 top-20 ease-in-out"
            : "ease-in -left-[100%] top-20"
        }`}
      >
        <div>
          <Link to="/home">
            <FileKeepIcon width="60" height="60" viewBox="0 0 375 375" />
          </Link>
        </div>
      </nav>
      {isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(false)}
          className={`absolute top-20 h-full w-full bg-black bg-opacity-50 md:hidden`}
        ></button>
      )}
    </>
  );
};

export default ConsoleNav;
