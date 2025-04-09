import { useQuery } from "@tanstack/react-query";
import SharedAccessEndpoint from "../../endpoints/SharedAccessEndpoint";
import SharedFolderContainer from "./SharedFolderContainer";
import { MdOutlineFileUpload } from "react-icons/md";

const SharedFolder = () => {
  const { data } = useQuery({
    queryKey: ["get-shared-assets"],
    queryFn: SharedAccessEndpoint.getSharedAssets,
  });

  if (data) {
    const { data: sharedAssets } = data;
    return (
      <main className="flex flex-col h-full w-full p-4">
        <h1 className="text-2xl font-bold text-gray-400">Shared</h1>
        {sharedAssets.length !== 0 ? (
          <>
            <h1 className="text-2xl font-bold text-gray-400 mb-4">Shared</h1>
            <div className="flex justify-between text-gray-300 text-sm pr-10 mb-2">
              <span className="w-1/3">Name</span>
              <span className="w-1/3">Who can access</span>
              <span className="w-1/3">SharedOn</span>
            </div>
            <SharedFolderContainer sharedAssets={sharedAssets} />
          </>
        ) : (
          <div className="border flex flex-col items-center p-24 rounded border-gray-400 mt-4">
            <div>
              <MdOutlineFileUpload className="text-gray-500" size={80} />
            </div>
            <div>
              <div className="text-gray-700 text-center">
                There are no shared files.
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }
};

export default SharedFolder;
