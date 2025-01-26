import { FC } from "react";
import ConsoleFolderCard from "./ConsoleFolderCard";

const ConsoleFolderContainer: FC<ConsoleFolderContainerProps> = ({
  folders,
}) => {
  if (folders.length === 0) return <></>;

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
