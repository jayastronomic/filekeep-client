import { useMutation, useQueryClient } from "@tanstack/react-query";
import FolderEndpoint from "../../endpoints/FolderEndpoint";
import { FC, FormEvent, useContext, useState } from "react";
import { FcFolder } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { useLocation } from "react-router";
import { ConsoleContext } from "../contexts/ConsoleContext";

const CreateFolderModal: FC<CreateFolderModalProps> = ({ setIsOpen }) => {
  const { pathname } = useLocation();
  const { rootFolder } = useContext(ConsoleContext);
  const [folder, setFolder] = useState<NewFolder>({
    folderName: "",
    parentId: "",
  });
  const queryClient = useQueryClient();
  const parentId = pathname === "/home" ? rootFolder.id : "";

  const { mutate } = useMutation({
    mutationFn: FolderEndpoint.createFolder,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-root"] });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(folder);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col fixed inset-0 h-full w-full bg-black bg-opacity-50">
      <div className="flex flex-col w-full h-full bg-white">
        <header className="flex items-center justify-between w-full border-b border-gray-300 p-2">
          <div className="flex space-x-4 items-center">
            <FcFolder className="text-5xl" />
            <h1 className="text-gray-800 font-semibold text-xl">
              Create folder
            </h1>
          </div>
          <div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center hover:bg-gray-300 transition w-8 h-8 rounded-lg"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col p-4">
            <label className="font-semibold text-sm mb-2">Name</label>
            <input
              value={folder.folderName}
              onChange={(e) =>
                setFolder({ folderName: e.target.value, parentId })
              }
              className="w-ful focus:outline-none focus:ring-4 rounded px-2 py-1 focus:border-black border border-gray-300"
            />
          </div>
          <div className="flex space-x-4 justify-end px-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-semibold bg-gray-200 p-2 rounded-md"
            >
              Cancel
            </button>
            <button
              disabled={folder.folderName.length === 0}
              className={`text-white font-semibold  p-2 rounded-md opacity-30 ${
                folder.folderName.length === 0
                  ? "bg-gray-700"
                  : "bg-black opacity-100"
              }`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;
