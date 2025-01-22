import ConsoleProvider from "../providers/ConsoleProvider";
import ConsoleActions from "./ConsoleActions";
import ConsoleAssets from "./ConsoleAssets";
import CreateFolderModal from "./CreateFolderModal";
import { useState } from "react";
const Console = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <ConsoleProvider>
      <main className="flex flex-col h-full w-full relative px-6">
        <ConsoleActions setIsOpen={setIsOpen} />
        <h1 className="font-semibold text-2xl my-4 text-gray-700">All files</h1>
        <ConsoleAssets />
        {isOpen && <CreateFolderModal setIsOpen={setIsOpen} />}
      </main>
    </ConsoleProvider>
  );
};

export default Console;
