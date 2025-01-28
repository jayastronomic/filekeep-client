import { FC } from "react";
import { FcFolder } from "react-icons/fc";
import { Link, useLocation } from "react-router";

const FolderCard: FC<FolderCardProps> = ({ folder }) => {
  const { pathname } = useLocation();
  return (
    <div
      key={folder.id}
      className="flex border-b py-4 hover:bg-gray-100 text-gray-800 items-center space-x-2 px-2"
    >
      <FcFolder className="text-2xl" />
      <Link to={pathname + "/" + folder.folderName}>{folder.folderName}</Link>
    </div>
  );
};

export default FolderCard;
