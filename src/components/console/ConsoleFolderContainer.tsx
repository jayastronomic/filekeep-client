import { FC } from "react";
import ConsoleFolderCard from "./FolderCard";

const ConsoleFolderContainer: FC<ConsoleFolderContainerProps> = ({
  folders,
}) => {
  return (
    <div className="flex flex-col">
      {folders
        .sort((a, b) => a.folderName.localeCompare(b.folderName))
        .map((folder) => {
          return <ConsoleFolderCard folder={folder} />;
        })}
    </div>
  );
};

export default ConsoleFolderContainer;
