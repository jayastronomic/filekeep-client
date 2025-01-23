import { useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

const ProfileMenu: FC<ProfileMenuProps> = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries({ queryKey: ["is-logged-in"] });
    navigate("/login");
  };
  return (
    <div className="fixed inset-0 z-[1] h-full w-full overflow-hidden">
      <div className="absolute z-[3] right-4 top-[4.2rem] border bg-white shadow py-2  rounded-lg w-[10rem]">
        <button
          onClick={handleLogOut}
          className="text-sm hover:bg-gray-200 w-full p-1"
        >
          Log out
        </button>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="absolut w-full h-full"
      ></button>
    </div>
  );
};

const ConsoleNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full flex justify-between p-6 border-b shadow">
      <div className="flex text-lg">
        <FaBars />
      </div>
      <div className="flex text-2xl">
        <button onClick={() => setIsOpen(true)}>
          <FaUserCircle />
        </button>
      </div>
      {isOpen && <ProfileMenu setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default ConsoleNav;
