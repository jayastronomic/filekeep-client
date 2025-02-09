import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { FC } from "react";

const ProfileMenu: FC<ProfileMenuProps> = ({ setIsOpen }) => {
  const queryClient = useQueryClient();
  const { authUser } = useAuth();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries({ queryKey: ["is-logged-in"] });
  };
  return (
    <div className="fixed inset-0 h-full w-full overflow-hidden bg-black bg-opacity-50">
      <div className="flex flex-col absolute z-[1] right-5 top-[3.5rem] border border-gray-700 bg-[#151B23] shadow p-2  rounded-lg w-[10rem]">
        <div className="flex flex-col text-gray-100 border-b border-gray-700 pb-5 items-center">
          <span className="font-semibold">User name</span>
          <span className="text-xs">{authUser?.email}</span>
        </div>
        <button
          onClick={handleLogOut}
          className="text-sm hover:bg-gray-800 w-full p-1 text-gray-100"
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

export default ProfileMenu;
