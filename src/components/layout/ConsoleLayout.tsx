import ConsoleNav from "../nav/ConsoleNav";
import { Outlet } from "react-router";
const ConsoleLayout = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <ConsoleNav />
      <Outlet />
    </div>
  );
};

export default ConsoleLayout;
