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
        <h1 className="text-2xl font-bold text-gray-400 px-2">Shared</h1>
        <SharedFolderContainer sharedAssets={sharedAssets} />
      </main>
    );
  }
};

export default SharedFolder;
