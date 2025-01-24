import { PropagateLoader } from "react-spinners";

export const ConsoleLoader = () => {
  return (
    <div className="fixed bg-white flex h-full w-full justify-center items-center">
      <PropagateLoader />
    </div>
  );
};
