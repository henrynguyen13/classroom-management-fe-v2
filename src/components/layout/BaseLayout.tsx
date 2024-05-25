import { Outlet } from "react-router-dom";
import { HeaderBar } from ".";

export const BaseLayout = () => {
  return (
    <div className="flex h-full w-full">
      <div className="relative flex-1 m-h-full h-full">
        <HeaderBar />
        <div className="mt-[200px]"></div>
        <Outlet />
      </div>
    </div>
  );
};
