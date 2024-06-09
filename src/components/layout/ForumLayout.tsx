import { Outlet } from "react-router-dom";
import { ForumSideBar, HeaderBar } from ".";

export const ForumLayout = () => {
  return (
    <div className="flex w-full h-screen bg-background-2 ">
      <div className="relative flex-1 m-h-full h-full">
        <HeaderBar />
        {/* <div className="mt-[64px]"></div>
        <Outlet /> */}
        <div className="block bg-background-2">
          <ForumSideBar />
          <div className=" bg-background-2 ml-[330px] mr-[50px] mt-[64px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
