import { useQuery } from "@tanstack/react-query";
import { ConsoleContext } from "../contexts/ConsoleContext";
import FolderEndpoint from "../../endpoints/FolderEndpoint";
import { FC } from "react";

const ConsoleProvider: FC<ConsoleProviderProps> = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-root"],
    queryFn: FolderEndpoint.getRoot,
  });

  if (isLoading) return <p>Loading...</p>;

  if (data) {
    const { data: rootFolder } = data;
    return (
      <ConsoleContext.Provider value={{ rootFolder, isLoading }}>
        {children}
      </ConsoleContext.Provider>
    );
  }
};

export default ConsoleProvider;