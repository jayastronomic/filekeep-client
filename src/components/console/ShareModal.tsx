import { useContext } from "react";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { IoClose } from "react-icons/io5";

const ShareModal = () => {
  return (
    <div className="flex flex-col fixed h-full w-full bg-[#0d1117]">
      <ShareModalHeader />
      <ShareModalContent />
    </div>
  );
};

const ShareModalContent = () => {
  return (
    <div className=" text-gray-100 flex flex-col p-4">
      <h1 className=" font-light text-2xl mb-10">Share this file</h1>
      <div className="flex justify-between">
        <p className="text-sm">
          Anyone with this link <b>can view</b>
        </p>

        <button className="border-b text-sm font-medium hover:border-gray-500 cursor-pointer">
          Settings
        </button>
      </div>
      <div className="w-full mt-8">
        <input
          role="combobox"
          className="w-full text-sm border rounded py-1 px-2"
          placeholder="Add an email"
        />
      </div>
      <div className="flex w-full mt-10 justify-end">
        <button
          disabled
          className="border bg-gray-900 text-lg p-2 rounded-xl cursor-not-allowed text-gray-700 border-gray-800"
        >
          Share file
        </button>
      </div>
    </div>
  );
};

const ShareModalHeader = () => {
  const { setModal } = useContext(ConsoleContext);
  return (
    <header className="flex justify-between p-4 text-gray-100 border-b border-gray-700">
      <span>Filename</span>
      <button
        onClick={() =>
          setModal((prev) => ({ ...prev, isShareModalOpen: false }))
        }
        className="flex items-center justify-center hover:bg-gray-700 transition w-8 h-8 rounded-lg"
      >
        <IoClose className="text-2xl" />
      </button>
    </header>
  );
};

export default ShareModal;
