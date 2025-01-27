import { LiaDownloadSolid } from "react-icons/lia";
import { FaTrash } from "react-icons/fa";
import FileEndpoint from "../../endpoints/FileEndpoint";
import { FC } from "react";

const MoreMenu: FC<MoreMenuProps> = ({ file, setIsOpen, handleDelete }) => {
  const downloadFile = (fileKey: string, fileName: string) => {
    FileEndpoint.downloadFile(fileKey, fileName);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(null)}
        className="fixed z-[1] inset-0  h-full w-full"
      ></button>
      <div className="text-sm bg-white rounded absolute right-4 -top-20 flex flex-col p-2 shadow-md border z-[2]">
        <button
          onClick={() => downloadFile(file.fileKey, file.fileName)}
          className="flex items-center border-b p-2 hover:bg-gray-200"
        >
          <LiaDownloadSolid className="text-lg mr-2" />
          <span>Download</span>
        </button>
        <button
          onClick={() => handleDelete(file.fileKey)}
          className="flex items-center p-2 hover:bg-gray-200"
        >
          <FaTrash className="text-base mr-2" />
          <span>Delete</span>
        </button>
      </div>
    </>
  );
};

export default MoreMenu;
