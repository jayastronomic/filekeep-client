import { FC } from "react";
import FileCard from "./FileCard";

const ConsoleFileContainer: FC<ConsoleFileContainerProps> = ({ files }) => {
  return (
    <div className="flex flex-col">
      {files.map((file) => {
        return <FileCard file={file} />;
      })}
    </div>
  );
};

export default ConsoleFileContainer;
