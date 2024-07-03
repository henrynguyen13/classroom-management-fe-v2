import { Outlet } from "react-router-dom";
import { HeaderBar, SideBar } from ".";
import { ScreenType, useBreakpoint } from "@/common";

export const MainLayout = () => {
  const { isLg } = useBreakpoint(ScreenType.LG);

  return (
    // <div className="flex h-full w-full">
    //   <SideBar />
    //   <div className="relative flex-1 m-h-full h-full">
    //     <HeaderBar pathname={pathname} />
    //     <div className="mt-[20px]  mx-[50px]">{children}</div>
    //   </div>
    // </div>
    <div className=" h-full w-full">
      <HeaderBar />
      <div className="block h-full">
        {isLg && <SideBar />}
        <div className="lg:ml-[290px] md:mx-[30px] mx-[16px] lg:mr-[50px] mt-[100px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
