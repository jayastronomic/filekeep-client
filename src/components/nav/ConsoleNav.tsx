import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const ConsoleNav = () => {
  return (
    <nav className="w-full flex justify-between p-6">
      <div className="flex text-lg">
        <FaBars />
      </div>
      <div className="flex text-2xl">
        <FaUserCircle />
      </div>
    </nav>
  );
};

export default ConsoleNav;
