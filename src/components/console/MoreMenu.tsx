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
      <div className="text-sm bg-white rounded absolute right-4 -top-20 flex flex-col p-2 shadow-md border z-[2]">
        {type === "file" ? (
          <button
            onClick={type === "file" ? () => downloadFile() : undefined}
            className="flex items-center border-b p-2 hover:bg-gray-200"
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
