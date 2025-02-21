import { FC } from "react";
import { Link } from "react-router";

const SharedAssetCard: FC<SharedAssetCardProps> = ({ asset }) => {
  const { assetType } = asset;
  const assetName = assetType === "file" ? asset.fileName : asset.folderName;

  return (
    <Link
      to={`/home/` + assetName}
      className="flex w-full border-b border-gray-700 py-4 px-2 hover:bg-gray-800 text-gray-100 cursor-pointer"
    >
      <span>{assetName}</span>
    </Link>
  );
};

export default SharedAssetCard;
