import { useQuery } from "@tanstack/react-query";
import { getFolder, getRootFolder } from "../../endpoints/FolderEndpoint";
import { MdOutlineFileUpload } from "react-icons/md";
import ConsoleFolderContainer from "./ConsoleFolderContainer";
import ConsoleFileContainer from "./ConsoleFIleContainer";
import { useGetCurrentFolder } from "../../hooks/useGetCurrentFolder";
import { Link } from "react-router";

const HomeFolder = () => {
  const currentFolder = useGetCurrentFolder();

  const { data } = useQuery({
    queryKey: [`get-root-folder`],
    queryFn: getRootFolder,
  });

  if (data) {
    const { files, subFolders } = data.data;
    const content =
      files.length === 0 && subFolders.length === 0 ? (
        <div className="border flex flex-col items-center p-24 rounded border-gray-400">
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
        <div className="flex flex-col h-full">
          <div className="flex text-gray-300 text-sm pr-10 mb-2">
            <span className="w-1/2">Name</span>
            <span className="w-1/2">Who can access</span>
          </div>
          <ConsoleFolderContainer folders={subFolders || []} />
          <ConsoleFileContainer files={files || []} />
        </div>
      );

    return (
      <main className="flex flex-col h-full w-full p-4">
        {currentFolder === "home" ? (
          <h1 className="text-2xl font-bold text-gray-400">All Files</h1>
        ) : (
          <Link
            className="text-gray-600 hover:underline hover:text-gray-500 self-start"
            to="/home"
          >
            All files
          </Link>
        )}
        <h2 className="text-3xl font-semibold text-gray-400 mb-4">
          {currentFolder === "home" ? "" : currentFolder}
        </h2>
        {content}
      </main>
    );
  }
};

export default HomeFolder;
