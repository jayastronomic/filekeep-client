import { FC } from "react";
import { Link } from "react-router";
import { RiFileList2Fill } from "react-icons/ri";
import { FaImage } from "react-icons/fa6";
import { TbPdf } from "react-icons/tb";

export const ConsoleFileContainer: FC<ConsoleFileContainerProps> = ({
  files,
}) => {
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

  return (
    <div className="flex flex-col">
      {files.map((file) => {
        return (
          <div
            key={file.fileKey}
            className="flex border-b py-4 hover:bg-gray-100 text-gray-800 items-center space-x-2 px-2"
          >
            <div className="text-2xl">{getFileIcon(file.mimeType)}</div>
            <Link to="#">{file.fileName}</Link>
          </div>
        );
      })}
    </div>
  );
};
