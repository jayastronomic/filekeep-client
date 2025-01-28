import { FC, useState } from "react";
import { Link } from "react-router";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import FileEndpoint from "../../endpoints/FileEndpoint";
import { RiFileList2Fill } from "react-icons/ri";
import { TbPdf } from "react-icons/tb";
import { FaImage } from "react-icons/fa";
import { MdOutlineMoreHoriz } from "react-icons/md";
import MoreMenu from "./MoreMenu";

const FileCard: FC<FileCardProps> = ({ file }) => {
  const queryClient = useQueryClient();
  const currentFolder = useGetCurrentFolder();
  const [isOpen, setIsOpen] = useState<string | null>(null); //
  const { mutate } = useMutation({
    mutationFn: FileEndpoint.deleteFile,
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

  const handleMenuToggle = (fileKey: string) => {
    if (isOpen === fileKey) {
      setIsOpen(null);
    } else {
      setIsOpen(fileKey);
    }
  };

  const handleDelete = (fileKey: string) => {
    mutate(fileKey);
    setIsOpen(null);
  };

  const { fileKey, fileName, id, size, mimeType } = file;
  return (
    <div
      key={fileKey}
      className="relative flex border-b py-4 hover:bg-gray-100 text-gray-800 items-center space-x-2 justify-between px-2"
    >
      <div className="flex space-x-2">
        <div className="text-2xl">{getFileIcon(mimeType)}</div>
        <Link to="#">{fileName}</Link>
      </div>
      <button
        onClick={() => handleMenuToggle(fileKey)}
        className="flex items-center justify-center relative hover:bg-gray-300 h-10 w-10 rounded transition"
      >
        <MdOutlineMoreHoriz />
      </button>
      {isOpen === fileKey && (
        <MoreMenu
          file={{ id, size, fileKey, fileName, mimeType }}
          setIsOpen={setIsOpen}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default FileCard;
