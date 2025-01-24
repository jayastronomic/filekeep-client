import { FC } from "react";
import { Link } from "react-router";
import { FcFolder } from "react-icons/fc";

const ConsoleFolderContainer: FC<ConsoleFolderContainerProps> = ({
  folders,
}) => {
  if (folders.length === 0) return <></>;

  return (
    <div className="flex flex-col">
      {folders
        .sort((a, b) => a.folderName.localeCompare(b.folderName))
        .map((folder) => {
          return (
            <div
              key={folder.id}
              className="flex border-b py-4 hover:bg-gray-100 text-gray-800 items-center space-x-2 px-2"
            >
              <FcFolder className="text-2xl" />
              <Link to="#">{folder.folderName}</Link>
            </div>
          );
        })}
    </div>
  );
};

export default ConsoleFolderContainer;
