import { LiaDownloadSolid } from "react-icons/lia";
import { FaTrash } from "react-icons/fa";
import FileEndpoint from "../../endpoints/FileEndpoint";
import { IoShareOutline } from "react-icons/io5";

import { FC, useContext } from "react";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";

const MoreMenu: FC<MoreMenuProps> = ({
  type,
  asset,
  setIsOpen,
  handleDelete,
}) => {
  const { setModal } = useContext(ConsoleContext);

  const downloadFile = () => {
    const file = asset as FKFile;
    FileEndpoint.downloadFile(file.fileKey, file.fileName);
  };

  const handleShareModal = () => {
    setModal((prev) => ({ ...prev, isShareModalOpen: true }));
    setIsOpen(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(null)}
        className="fixed z-[1] inset-0  h-full w-full"
      ></button>
      <div
        className={`text-sm bg-[#151B23] rounded absolute right-4 flex flex-col p-2 shadow-md border border-gray-700 z-20 w-56 ${
          type === "file" ? "-top-30" : "-top-10"
        }`}
      >
        {type === "file" ? (
          <>
            <button
              onClick={type === "file" ? handleShareModal : undefined}
              className="flex items-center border-b border-gray-700 p-2 hover:bg-gray-800 z-[2] cursor-pointer"
            >
              <IoShareOutline className="text-lg mr-2" />

              <span>Share</span>
            </button>
            <button
              onClick={type === "file" ? () => downloadFile() : undefined}
              className="flex items-center border-b border-gray-700 p-2 hover:bg-gray-800 z-[2] cursor-pointer"
            >
              <LiaDownloadSolid className="text-lg mr-2" />
              <span>Download</span>
            </button>
          </>
        ) : null}
        <button
          onClick={
            type === "file"
              ? () => handleDelete((asset as FKFile).fileKey)
              : () => handleDelete(asset.id)
          }
          className="flex items-center p-2 hover:bg-gray-800 cursor-pointer"
        >
          <FaTrash className="text-base mr-2" />
          <span>Delete</span>
        </button>
      </div>
    </>
  );
};

export default MoreMenu;
