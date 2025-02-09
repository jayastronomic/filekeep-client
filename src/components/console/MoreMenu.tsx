import { LiaDownloadSolid } from "react-icons/lia";
import { FaTrash } from "react-icons/fa";
import FileEndpoint from "../../endpoints/FileEndpoint";
import { FC } from "react";

const MoreMenu: FC<MoreMenuProps> = ({
  type,
  asset,
  setIsOpen,
  handleDelete,
}) => {
  const downloadFile = () => {
    const file = asset as FKFile;
    FileEndpoint.downloadFile(file.fileKey, file.fileName);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(null)}
        className="fixed z-[1] inset-0  h-full w-full"
      ></button>
      <div
        className={`text-sm bg-[#151B23] rounded absolute right-4 flex flex-col p-2 shadow-md border border-gray-700 z-[2] ${
          type === "file" ? "-top-20" : "-top-10"
        }`}
      >
        {type === "file" ? (
          <button
            onClick={type === "file" ? () => downloadFile() : undefined}
            className="flex items-center border-b border-gray-700 p-2 hover:bg-gray-800"
          >
            <LiaDownloadSolid className="text-lg mr-2" />
            <span>Download</span>
          </button>
        ) : null}
        <button
          onClick={
            type === "file"
              ? () => handleDelete((asset as FKFile).fileKey)
              : () => handleDelete(asset.id)
          }
          className="flex items-center p-2 hover:bg-gray-800"
        >
          <FaTrash className="text-base mr-2" />
          <span>Delete</span>
        </button>
      </div>
    </>
  );
};

export default MoreMenu;
