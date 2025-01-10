import { Outlet } from "react-router";
import Nav from "../nav/Nav";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
