import { FC } from "react";
import SharedAssetCard from "./SharedAssetCard";

const SharedFolderContainer: FC<SharedFolderContainerProps> = ({
  sharedAssets,
}) => {
  return (
    <div className="flex flex-col">
      {sharedAssets.map((asset) => {
        return <SharedAssetCard asset={asset} />;
      })}
    </div>
  );
};

export default SharedFolderContainer;
