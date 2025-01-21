import { FC } from "react";
import { Link } from "react-router";

export const ConsoleFileContainer: FC<ConsoleFileContainerProps> = ({
  files,
}) => {
  if (files.length === 0) return <></>;

  return (
    <div className="flex flex-col">
      {files.map((file) => {
        return (
          <div className="border-b py-4 hover:bg-gray-100 text-gray-800">
            <Link to="#">{file.fileName}</Link>
          </div>
        );
      })}
    </div>
  );
};
