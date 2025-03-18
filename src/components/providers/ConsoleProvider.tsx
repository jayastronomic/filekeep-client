import { FC, useState } from "react";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";

const ConsoleProvider: FC<ConsoleProviderProps> = ({ children }) => {
  const [modals, setModal] = useState<ModalsState>({
    isCreateFolderModalOpen: false,
    isNavModalOpen: false,
    isProfileModalOpen: false,
    isShareModalOpen: false,
    isManageLinkModalOpen: false,
  });

  const [asset, setAsset] = useState({} as FKFile | Folder);

  return (
    <ConsoleContext.Provider value={{ ...modals, setModal, asset, setAsset }}>
      {children}
    </ConsoleContext.Provider>
  );
};

export default ConsoleProvider;
