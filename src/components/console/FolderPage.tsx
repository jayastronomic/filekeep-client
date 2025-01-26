import { useQuery } from "@tanstack/react-query";
import FolderEndpoint from "../../endpoints/FolderEndpoint";
import { useLocation } from "react-router";
import { MdOutlineFileUpload } from "react-icons/md";
import ConsoleFolderContainer from "./ConsoleFolderContainer";
import ConsoleFileContainer from "./ConsoleFIleContainer";

const FolderPage = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const currentFolderName = paths[paths.length - 1];
  const { data } = useQuery({
    queryKey: ["get-folder"],
    queryFn: () => FolderEndpoint.getFolder(currentFolderName),
  });

  if (data) {
    const { files, subFolders } = data.data;
    const display =
      files.length === 0 && subFolders.length === 0 ? (
        <div className="border border-dashed flex flex-col items-center p-24 rounded border-gray-400 hover:bg-gray-100">
          <div>
            <MdOutlineFileUpload className="text-gray-500" size={80} />
          </div>
          <div>
            <div className="text-gray-700 text-center">
              There are no files. Upload a file or create folder
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <ConsoleFolderContainer folders={subFolders || []} />
          <ConsoleFileContainer files={files || []} />
        </div>
      );

    return (
      <main className="flex flex-col h-full w-full px-6">
        <div>All Files</div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          {currentFolderName}
        </h1>
        {display}
      </main>
    );
  }
};

export default FolderPage;
