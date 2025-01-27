import { FC, useState } from "react";
import { Link } from "react-router";
import { RiFileList2Fill } from "react-icons/ri";
import { FaImage } from "react-icons/fa6";
import { TbPdf } from "react-icons/tb";
import { MdOutlineMoreHoriz } from "react-icons/md";
import MoreMenu from "./MoreMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FileEndpoint from "../../endpoints/FileEndpoint";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";

const ConsoleFileContainer: FC<ConsoleFileContainerProps> = ({ files }) => {
  const [isOpen, setIsOpen] = useState<string | null>(null); // Track which menu is open
  const queryClient = useQueryClient();
  const currentFolder = useGetCurrentFolder();
  const { mutate } = useMutation({
    mutationFn: FileEndpoint.deleteFile,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [`get-${currentFolder}`] });
    },
  });
  if (files.length === 0) return <></>;

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

  return (
    <div className="flex flex-col">
      {files.map((file) => {
        return (
          <div
            key={file.fileKey}
            className="relative flex border-b py-4 hover:bg-gray-100 text-gray-800 items-center justify-between px-2"
          >
            <div className="flex space-x-2">
              <div className="text-2xl">{getFileIcon(file.mimeType)}</div>
              <Link to="#">{file.fileName}</Link>
            </div>
            <button
              onClick={() => handleMenuToggle(file.fileKey)}
              className="flex items-center justify-center relative hover:bg-gray-300 h-10 w-10 rounded transition"
            >
              <MdOutlineMoreHoriz />
            </button>
            {isOpen === file.fileKey && (
              <MoreMenu
                file={file}
                setIsOpen={setIsOpen}
                handleDelete={handleDelete}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ConsoleFileContainer;
