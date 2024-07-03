import { Outlet } from "react-router-dom";
import { ForumSideBar, HeaderBar } from ".";
import { ScreenType, useBreakpoint } from "@/common";

export const ForumLayout = () => {
  const { isLg } = useBreakpoint(ScreenType.LG);

  return (
    <div className="flex w-full h-screen bg-background-2 ">
      <div className="relative flex-1 m-h-full h-full">
        <HeaderBar />
        {/* <div className="mt-[64px]"></div>
        <Outlet /> */}
        <div className="block bg-background-2">
          {isLg && <ForumSideBar />}
          <div className=" bg-background-2 mx-[16px] md:mx-[30px] lg:ml-[330px] lg:mr-[50px] mt-[64px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
