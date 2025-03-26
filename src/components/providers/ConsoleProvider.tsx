import { FC, useContext, useState } from "react";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";
import { AuthContext } from "../../components/contexts/AuthContext";

const ConsoleProvider: FC<ConsoleProviderProps> = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  const { rootFolderId } = authUser!;
  const [modals, setModal] = useState<ModalsState>({
    isCreateFolderModalOpen: false,
    isNavModalOpen: false,
    isProfileModalOpen: false,
    isShareModalOpen: false,
    isManageLinkModalOpen: false,
  });

  const [asset, setAsset] = useState({} as FKFile | Folder);

  return (
    <ConsoleContext.Provider
      value={{
        ...modals,
        setModal,
        asset,
        setAsset,
        rootFolderId,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};

export default ConsoleProvider;
