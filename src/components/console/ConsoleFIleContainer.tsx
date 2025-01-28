import { FC } from "react";
import AssetCard from "./AssetCard";

const ConsoleFileContainer: FC<ConsoleFileContainerProps> = ({ files }) => {
  return (
    <div className="flex flex-col">
      {files.map((file) => {
        return <AssetCard asset={file} type={"file"} />;
      })}
    </div>
  );
};

export default ConsoleFileContainer;
