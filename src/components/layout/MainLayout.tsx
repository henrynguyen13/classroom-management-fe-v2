import { Outlet } from "react-router-dom";
import HeaderBar from "./components/header/HeaderBar";
import SideBar from "./components/sidebar/SideBar";

export default function MainLayout() {
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
        <SideBar />
        <div className="ml-[290px] mr-[50px] mt-[100px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
