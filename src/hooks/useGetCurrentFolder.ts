import { useLocation } from "react-router";

export function useGetCurrentFolder(): CurrentFolderData {
  const { pathname, state } = useLocation();
  const paths = pathname.split("/");
  const currentFolder = paths[paths.length - 1];
  return { folderName: currentFolder, state };
}
