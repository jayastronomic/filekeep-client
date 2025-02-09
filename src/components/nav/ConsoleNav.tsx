import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { FC, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const ProfileMenu: FC<ProfileMenuProps> = ({ setIsOpen }) => {
  const queryClient = useQueryClient();
  const { authUser } = useAuth();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries({ queryKey: ["is-logged-in"] });
  };
  return (
    <div className="fixed inset-0 h-full w-full overflow-hidden">
      <div className="flex flex-col absolute z-[1] right-4 top-[4.2rem] border border-gray-700 bg-[#151B23] shadow p-2  rounded-lg w-[10rem]">
        <div className="flex flex-col text-gray border-b border-gray-700 pb-5 items-center">
          <span className="font-semibold">User name</span>
          <span className="text-xs">{authUser?.email}</span>
        </div>
        <button
          onClick={handleLogOut}
          className="text-sm hover:bg-gray-800 w-full p-1"
        >
          Log out
        </button>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="w-full h-full"
      ></button>
    </div>
  );
};

const ConsoleNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full flex items-center justify-between p-4 border-b border-gray-800 shadow bg-[#151B23] text-white">
      <div className="flex text-lg">
        <FaBars />
      </div>
      <div className="flex justify-center text-2xl hover:bg-gray-700 h-10 w-10 rounded-full transition hover:shadow">
        <button onClick={() => setIsOpen(true)}>
          <FaUserCircle />
        </button>
      </div>
      {isOpen && <ProfileMenu setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default ConsoleNav;
