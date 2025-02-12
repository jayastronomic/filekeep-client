import { FC, useState } from "react";
import { ConsoleContext } from "../../components/contexts/ConsoleContext";

const ConsoleProvider: FC<ConsoleProviderProps> = ({ children }) => {
  const [modals, setModal] = useState<ModalsState>({
    isCreateFolderModalOpen: false,
    isNavModalOpen: false,
    isProfileModalOpen: false,
    isShareModalOpen: false,
  });

  return (
    <ConsoleContext.Provider value={{ ...modals, setModal }}>
      {children}
    </ConsoleContext.Provider>
  );
};

export default ConsoleProvider;
