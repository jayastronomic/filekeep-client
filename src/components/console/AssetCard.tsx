import { FC, useState } from "react";
import { Link, useLocation } from "react-router";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import FileEndpoint from "../../endpoints/FileEndpoint";
import { RiFileList2Fill } from "react-icons/ri";
import { TbPdf } from "react-icons/tb";
import { FaImage } from "react-icons/fa";
import { MdOutlineMoreHoriz } from "react-icons/md";
import MoreMenu from "./MoreMenu";
import { FcFolder } from "react-icons/fc";
import FolderEndpoint from "../../endpoints/FolderEndpoint";

const AssetCard: FC<AssetCardProps> = ({ asset, type }) => {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const currentFolder = useGetCurrentFolder();
  const [isOpen, setIsOpen] = useState<string | null>(null); //
  const endpoint =
    type === "file" ? FileEndpoint.deleteFile : FolderEndpoint.deleteFolder;
  const { mutate } = useMutation({
    mutationFn: endpoint,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [`get-${currentFolder}`] });
    },
  });

  const getFileIcon = (mimeType: string) => {
    switch (mimeType) {
      case "text/plain":
        return <RiFileList2Fill />;
      case "application/pdf":
        return <TbPdf />;
      case "image/png":
        return <FaImage />;
      default:
        return;
    }
  };

  const handleMenuToggle = (id: string) => {
    if (isOpen === id) {
      setIsOpen(null);
    } else {
      setIsOpen(id);
    }
  };

  const handleDelete = (assetId: string) => {
    mutate(assetId);
    setIsOpen(null);
  };

  if (type === "file") {
    const file = asset as FKFile;
    return (
      <div
        key={file.id}
        className="relative flex border-b border-gray-700 py-4 hover:bg-gray-800 text-gray-200 items-center space-x-2 justify-between px-2"
      >
        <div className="flex space-x-2">
          <div className="text-2xl">{getFileIcon(file.mimeType)}</div>
          <Link to="#">{file.fileName}</Link>
        </div>
        <button
          onClick={() => handleMenuToggle(file.id)}
          className="flex items-center justify-center relative hover:bg-gray-700 h-10 w-10 rounded transition"
        >
          <MdOutlineMoreHoriz />
        </button>
        {isOpen === file.id && (
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
    const folder = asset as Folder;
    return (
      <div
        key={folder.id}
        className="relative flex border-b border-gray-700 py-4 hover:bg-gray-800 text-gray-200 items-center space-x-2 justify-between px-2"
      >
        <div className="flex space-x-2">
          <div className="text-2xl">
            <FcFolder className="text-2xl" />
          </div>
          <Link to={pathname + "/" + folder.folderName}>
            {folder.folderName}
          </Link>
        </div>
        <button
          onClick={() => handleMenuToggle(folder.id)}
          className="flex items-center justify-center relative hover:bg-gray-700 h-10 w-10 rounded transition"
        >
          <MdOutlineMoreHoriz />
        </button>
        {isOpen === folder.id && (
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
