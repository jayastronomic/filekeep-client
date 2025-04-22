import { FC } from "react";
import AssetCard from "./AssetCard";

const ConsoleFolderContainer: FC<ConsoleFolderContainerProps> = ({
  folders,
}) => {
  return (
    <div className="flex flex-col">
      {folders
        .sort((a, b) =>
          a.folderName.localeCompare(b.folderName, undefined, {
            sensitivity: "base",
          })
        )
        .map((folder) => {
          return <AssetCard key={folder.id} asset={folder} type={"folder"} />;
        })}
    </div>
  );
};

export default ConsoleFolderContainer;
