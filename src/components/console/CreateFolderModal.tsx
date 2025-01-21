import { FcFolder } from "react-icons/fc";
import { IoClose } from "react-icons/io5";

const CreateFolderModal = () => {
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
            <button className="flex items-center justify-center hover:bg-gray-300 transition w-8 h-8 rounded-lg">
              <IoClose className="text-2xl" />
            </button>
          </div>
        </header>
        <div className="flex flex-col p-4">
          <label className="font-semibold text-sm mb-2">Name</label>
          <input className="w-ful focus:outline-none focus:ring-4 rounded px-2 py-1 focus:border-black border border-gray-300" />
        </div>
        <div className="flex space-x-4 justify-end px-4">
          <button className="text-gray-700 font-semibold bg-gray-200 p-2 rounded-md">
            Cancel
          </button>
          <button
            disabled
            className="text-white font-semibold bg-gray-700 p-2 rounded-md opacity-30"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;
