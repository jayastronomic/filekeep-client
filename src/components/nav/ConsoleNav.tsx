import FileKeepIcon from "../../components/home/FileKeepIcon";
import { Link } from "react-router";

const ConsoleNav = () => {
  return (
    <nav className="items-center p-4 border-b border-gray-800 shadow bg-[#151B23] text-white hidden md:flex md:flex-col">
      <div>
        <Link to="/home">
          <FileKeepIcon width="60" height="60" viewBox="0 0 375 375" />
        </Link>
      </div>
      {/* <div className="flex justify-center text-2xl hover:bg-gray-700 h-10 w-10 rounded-full transition hover:shadow">
        <button onClick={() => setIsOpen(true)}>
          <FaUserCircle />
        </button>
      </div> */}
      {/* {isOpen && <ProfileMenu setIsOpen={setIsOpen} />} */}
    </nav>
  );
};

export default ConsoleNav;
