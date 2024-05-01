import { Outlet } from "react-router-dom";
import { HeaderBar, TestSideBar } from ".";

export const TestLayout = () => {
  return (
    <div className="flex h-full w-full">
      <div className="relative flex-1 m-h-full h-full">
        <HeaderBar />
        <div className="mt-[20px] mx-[50px] grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <TestSideBar />
          </div>
          <div className="col-span-9">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
