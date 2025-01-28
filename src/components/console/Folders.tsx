import { useQuery } from "@tanstack/react-query";
import FolderEndpoint from "../../endpoints/FolderEndpoint";
import { MdOutlineFileUpload } from "react-icons/md";
import ConsoleFolderContainer from "./ConsoleFolderContainer";
import ConsoleFileContainer from "./ConsoleFIleContainer";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";
import { Link } from "react-router";

const Folders = () => {
  const currentFolder = useGetCurrentFolder();

  const { data } = useQuery({
    queryKey: [`get-${currentFolder}`],
    queryFn: () => FolderEndpoint.getFolder(currentFolder),
  });

  if (data) {
    const { files, subFolders } = data.data;
    const content =
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
      <main className="flex flex-col h-full w-full ">
        {currentFolder === "home" ? (
          <h1 className="text-gray-800 text-2xl font-bold">All Files</h1>
        ) : (
          <Link
            className="text-gray-600 hover:underline hover:text-black"
            to="/home"
          >
            All files
          </Link>
        )}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          {currentFolder === "home" ? "" : currentFolder}
        </h2>
        {content}
      </main>
    );
  }
};

export default Folders;
