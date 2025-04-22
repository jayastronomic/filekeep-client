import { FC, useContext, useEffect, useState } from "react";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { AuthContext } from "../../components/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import SyncEndpoint from "../../endpoints/SyncEndpoint";

const ConsoleProvider: FC<ConsoleProviderProps> = ({ children }) => {
  const { data } = useQuery({
    queryKey: ["sync-status"],
    queryFn: SyncEndpoint.syncStatus,
    enabled: import.meta.env.DEV,
  });

  const { authUser } = useContext(AuthContext);
  const { rootFolderId } = authUser!;
  const [modals, setModal] = useState<ModalsState>({
    isCreateFolderModalOpen: false,
    isNavModalOpen: false,
    isProfileModalOpen: false,
    isShareModalOpen: false,
    isManageLinkModalOpen: false,
    isSyncFolderModalOpen: false,
  });

  const [syncStatus, setSyncStatus] = useState<"off" | "on" | "pending">(
    "pending"
  );

  const [asset, setAsset] = useState({} as FKFile | Folder);

  useEffect(() => {
    if (data) setSyncStatus(data.syncStatus);
  }, [data]);

  console.log(data, syncStatus);
  return (
    <ConsoleContext.Provider
      value={{
        ...modals,
        setModal,
        asset,
        setAsset,
        rootFolderId,
        syncStatus,
        setSyncStatus,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};

export default ConsoleProvider;
