import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <Outlet />
    </div>
  );
};

export default AppLayout;
