import { FC, useState } from "react";
import { Link } from "react-router";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "../../endpoints/FileEndpoint";
import { RiFileList2Fill } from "react-icons/ri";
import { TbPdf } from "react-icons/tb";
import { FaImage } from "react-icons/fa";
import { MdOutlineMoreHoriz, MdFolder, MdFolderShared } from "react-icons/md";
import MoreMenu from "./MoreMenu";
import { deleteFolder } from "../../endpoints/FolderEndpoint";

const AssetCard: FC<AssetCardProps> = ({ asset, type }) => {
  const queryClient = useQueryClient();
  const { pathname } = useGetCurrentFolder();
  const [isOpen, setIsOpen] = useState<string | null>(null); //
  const endpoint = type === "file" ? deleteFile : deleteFolder;

  const { mutate } = useMutation({
    mutationFn: endpoint,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [`get-${pathname}`] });
    },
  });

  const getFileIcon = (mimeType: string) => {
    switch (mimeType) {
      case "text":
        return <RiFileList2Fill />;
      case "application":
        return <TbPdf />;
      case "image":
        return <FaImage />;
      default:
        return;
    }
  };

  const handleMenuToggle = (id: string) => {
    if (isOpen === id) setIsOpen(null);
    else setIsOpen(id);
  };

  const handleDelete = (assetId: string) => {
    mutate(assetId);
    setIsOpen(null);
  };

  if (type === "file") {
    const { id, mimeType, fileName, whoCanAccess } = asset as FKFile;
    return (
      <div
        key={id}
        className="relative flex border-b border-gray-700 py-4 hover:bg-gray-800 text-gray-200 items-center space-x-2 pl-2 pr-10 text-sm"
      >
        <div className="w-1/2 flex space-x-2">
          <div className="text-2xl">{getFileIcon(mimeType.split("/")[0])}</div>
          <div className="truncate">{fileName}</div>
        </div>
        <div className="w-1/2 text-sm">
          {whoCanAccess > 1 ? String(whoCanAccess) + " members" : "Only you"}
        </div>
        <button
          onClick={() => handleMenuToggle(id)}
          className="absolute flex items-center justify-center hover:bg-gray-700 h-10 w-10 right-2 rounded transition"
        >
          <MdOutlineMoreHoriz />
        </button>
        {isOpen === id && (
          <MoreMenu
            type={"file"}
            asset={asset}
            setIsOpen={setIsOpen}
            handleDelete={handleDelete}
          />
        )}
      </div>
    );
  } else {
    const { id, folderName, whoCanAccess } = asset as Folder;
    return (
      <div
        key={id}
        className="relative flex border-b border-gray-700 py-4 hover:bg-gray-800 text-gray-200 items-center space-x-2 pl-2 pr-10 justify-between"
      >
        <div className="flex w-1/2 space-x-2">
          <div className="text-2xl">
            {whoCanAccess > 1 ? (
              <MdFolderShared className="text-2xl" />
            ) : (
              <MdFolder className="text-2xl" />
            )}
          </div>
          <Link
            to={pathname + "/" + folderName}
            state={{ currentFolderId: id }}
          >
            {folderName}
          </Link>
        </div>
        <div className="w-1/2 text-sm">
          {whoCanAccess > 1 ? String(whoCanAccess) + " members" : "Only you"}
        </div>
        <button
          onClick={() => handleMenuToggle(id)}
          className="absolute flex items-center justify-center hover:bg-gray-700 h-10 w-10 right-2 rounded transition"
        >
          <MdOutlineMoreHoriz />
        </button>
        {isOpen === id && (
          <MoreMenu
            type={"folder"}
            asset={asset}
            setIsOpen={setIsOpen}
            handleDelete={handleDelete}
          />
        )}
      </div>
    );
  }
};

export default AssetCard;
