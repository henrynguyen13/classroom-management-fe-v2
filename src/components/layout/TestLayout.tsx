import { Outlet } from "react-router-dom";
import { HeaderBar, TestSideBar } from ".";

export const TestLayout = () => {
  return (
    <div className="flex h-full w-full">
      <div className="relative flex-1 m-h-full h-full">
        <HeaderBar />
        <div className="mt-[100px] mx-[50px] grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-3">
            <TestSideBar />
          </div>
          <div className="col-span-12 sm:col-span-9">
            <Outlet />
          </div>
        </div>
      </div>
    </div>

    // <div className=" h-full w-full">
    //   <HeaderBar />
    //   <div className="block h-full">
    //     <TestSideBar />
    //     <div className="ml-[290px] mr-[50px] mt-[100px]">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
  );
};
