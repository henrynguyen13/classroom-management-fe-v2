import { ImageLogin, LogoText } from "@/assets/icons";
import { ScreenType, useBreakpoint } from "@/common";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const { isSm } = useBreakpoint(ScreenType.SM);
  return (
    <div className="grid  lg:grid-cols-2 h-screen">
      <div className="bg-primary-1 h-screen">
        <img
          src={LogoText}
          width={`${!isSm ? 300 : 400}`}
          className="sm:w-auto mx-auto mt-14"
          alt="Picture of the author"
        />
        <div className="text-white mx-[30px] sm:mx-0 mt-[60px] sm:mt-[150px] text-center font-semibold text-2xl sm:text-4xl">
          Nền tảng quản lý lớp học trực tuyến
        </div>
        <div className="text-white mt-[30px] mx-[30px] sm:mx-0  text-center text-xl">
          Quản lý lớp học trực tuyến chưa bao giờ dễ dàng đến thế
        </div>

        <img
          src={ImageLogin}
          className="mx-auto mt-[50px]  hidden lg:block"
          alt="Picture of the author"
        />
      </div>
      <div className="mx-auto flex flex-col  lg:min-h-screen justify-center relative top-[-472px]  sm:top-[-522px] lg:top-0 bg-white p-8 sm:p-10 rounded-[20px]">
        <Outlet />
      </div>
    </div>
  );
};
