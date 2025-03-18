import { useQuery } from "@tanstack/react-query";
import SharedAccessEndpoint from "../../endpoints/SharedAccessEndpoint";
import SharedFolderContainer from "./SharedFolderContainer";

const SharedFolder = () => {
  const { data } = useQuery({
    queryKey: ["get-shared-assets"],
    queryFn: SharedAccessEndpoint.getSharedAssets,
  });

  if (data) {
    const { data: sharedAssets } = data;
    return (
      <main className="flex flex-col h-full w-full p-4">
        <h1 className="text-2xl font-bold text-gray-400 mb-4">Shared</h1>
        <div className="flex justify-between text-gray-300 text-sm pr-10 mb-2">
          <span className="w-1/3">Name</span>
          <span className="w-1/3">Who can access</span>
          <span className="w-1/3">SharedOn</span>
        </div>
        <SharedFolderContainer sharedAssets={sharedAssets} />
      </main>
    );
  }
};

export default SharedFolder;
