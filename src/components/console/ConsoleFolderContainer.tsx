import { FC } from "react";

const ConsoleFolderContainer: FC<ConsoleFolderContainerProps> = ({
  folders,
}) => {
  if (folders.length === 0) return <></>;

  return (
    <div className="flex flex-col">
      {folders.map((folder) => {
        return (
          <div className="border-b text-gray-700">{folder.folderName}</div>
        );
      })}
    </div>
  );
};

export default ConsoleFolderContainer;
