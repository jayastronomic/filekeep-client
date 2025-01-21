import ConsoleActions from "./ConsoleActions";
import { useQuery } from "@tanstack/react-query";
import FolderEndpoint from "../../endpoints/FolderEndpoint";
import ConsoleAssets from "./ConsoleAssets";
import CreateFolderModal from "./CreateFolderModal";
const Console = () => {
  const { data } = useQuery({
    queryKey: ["get-root"],
    queryFn: FolderEndpoint.getRoot,
  });

  const { data: root } = data || {};
  return (
    <main className="flex flex-col h-full w-full relative px-6">
      <ConsoleActions selectedFolderId={root?.id} />
      <h1 className="font-semibold text-2xl my-4 text-gray-700">All files</h1>
      <ConsoleAssets rootFolder={root!} />
      <CreateFolderModal />
    </main>
  );
};

export default Console;
