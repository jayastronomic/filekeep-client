import { useMutation, useQueryClient } from "@tanstack/react-query";
import FolderEndpoint from "../../endpoints/FolderEndpoint";
import { FC, FormEvent, useState } from "react";
import { FcFolder } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";

const CreateFolderModal: FC<CreateFolderModalProps> = ({
  setIsCreateFolderModalOpen,
}) => {
  const currentFolder = useGetCurrentFolder();
  const [folder, setFolder] = useState<NewFolder>({
    folderName: "",
    parentName: "",
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: FolderEndpoint.createFolder,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [`get-${currentFolder}`] });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(folder);
    setIsCreateFolderModalOpen(false);
  };

  return (
    <div className="z-[11] fixed inset-0 h-full w-full bg-black/50 md:flex md:items-center md:justify-center">
      <div className="flex flex-col w-full h-full md:h-1/2 md:rounded-2xl md:overflow-auto md:max-w-[38rem]">
        <header className="flex items-center justify-between w-full border-b border-gray-700 p-4 bg-[#151B23]">
          <div className="flex space-x-4 items-center">
            <FcFolder className="text-5xl" />
            <h1 className="text-gray-100 font-semibold text-xl">
              Create folder
            </h1>
          </div>
          <div>
            <button
              onClick={() => setIsCreateFolderModalOpen(false)}
              className="flex items-center justify-center hover:bg-gray-700 transition w-8 h-8 rounded-lg"
            >
              <IoClose className="text-gray-100 text-2xl" />
            </button>
          </div>
        </header>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-[#0d1117] flex-1"
        >
          <div className="flex flex-col p-4">
            <label className="font-semibold text-sm mb-2 text-gray-100">
              Name
            </label>
            <input
              value={folder.folderName}
              onChange={(e) =>
                setFolder({
                  folderName: e.target.value,
                  parentName: currentFolder,
                })
              }
              autoFocus
              className="w-full bg-gray-900 focus:outline-none focus:ring-4 rounded px-2 py-1 focus:border-black border border-gray-700 text-gray-100"
            />
          </div>
          <div className="flex space-x-4 justify-end px-4">
            <button
              onClick={() => setIsCreateFolderModalOpen(false)}
              className="text-gray-900 font-semibold bg-gray-400 p-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={folder.folderName.length === 0}
              className={`text-white font-semibold  p-2 rounded-md ${
                folder.folderName.length === 0
                  ? "bg-gray-700 opacity-30 cursor-not-allowed border border-transparent"
                  : "bg-gray-900 opacity-100 border border-gray-800"
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
