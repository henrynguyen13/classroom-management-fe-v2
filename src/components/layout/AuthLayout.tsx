import { ImageLogin, LogoText } from "@/assets/icons";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-primary-1 ">
        <img
          src={LogoText}
          width={400}
          className="mx-auto mt-14"
          alt="Picture of the author"
        />
        <div className="text-white mt-[150px] text-center font-semibold text-4xl">
          Nền tảng quản lý lớp học trực tuyến
        </div>
        <div className="text-white mt-[30px] text-center text-xl">
          Quản lý lớp học trực tuyến chưa bao giờ dễ dàng đến thế
        </div>

        <img
          src={ImageLogin}
          className="mx-auto mt-[50px]"
          alt="Picture of the author"
        />
      </div>
      <div className="mx-auto flex flex-col  min-h-screen justify-center ">
        <Outlet />
      </div>
    </div>
  );
}
