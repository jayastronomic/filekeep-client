import { FC } from "react";
import FileKeepIcon from "../../components/home/FileKeepIcon";
import { Link } from "react-router";

const ConsoleNav: FC<ConsoleNavProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <>
      <nav className="ghost-nav w-[5.5rem] "></nav>
      <nav
        className={`fixed transition-all duration-600 z-[11] items-center w-20  border-b border-gray-800 shadow bg-[#151B23] text-white h-full md:flex md:flex-col md:left-0 md:top-0 md:z-1 ${
          isMenuOpen
            ? "left-0 top-[4.5rem] ease-in-out"
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
          className={`fixed top-[4.5rem] h-full w-full bg-black bg-opacity-50 z-10 md:hidden`}
        ></button>
      )}
    </>
  );
};

export default ConsoleNav;
