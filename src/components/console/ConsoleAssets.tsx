import { FC } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import ConsoleFolderContainer from "./ConsoleFolderContainer";
import { ConsoleFileContainer } from "./ConsoleFileContainer";

const ConsoleAssets: FC<ConsoleAssetsProps> = ({ rootFolder }) => {
  const { files, subFolders } = rootFolder || { files: [], subFolders: [] };

  if (files.length === 0 && subFolders.length === 0) {
    return (
      <div className="border border-dashed flex flex-col items-center p-24 rounded border-gray-400 hover:bg-gray-100">
        <div>
          <MdOutlineFileUpload className="text-gray-500" size={80} />
        </div>
        <div>
          <span className="text-gray-700">Drop files here to upload</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="font-bold border-b">Name</div>
      <ConsoleFolderContainer folders={subFolders} />
      <ConsoleFileContainer files={files} />
    </div>
  );
};

export default ConsoleAssets;