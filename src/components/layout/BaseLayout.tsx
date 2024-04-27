import { Outlet } from "react-router-dom";
import HeaderBar from "./components/header/HeaderBar";
export default function BaseLayout() {
  return (
    <div className="flex h-full w-full">
      <div className="relative flex-1 m-h-full h-full">
        <HeaderBar />
        <Outlet />
      </div>
    </div>
  );
}
