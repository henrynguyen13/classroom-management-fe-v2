import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import HeaderMenu from "./HeaderMenu";
import { userService } from "@/features/profile/services/profile.service";
import { LogoText } from "@/assets/icons";
import authStorageService from "@/common/storages/authStorage.service";
export default function HeaderBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [avatar, setAvatar] = useState("");
  const user = authStorageService.getLoginUser();

  useEffect(() => {
    const getAvatar = async () => {
      const response = await userService.getUserById(user?._id as string);
      if (response?.success) {
        setAvatar(response?.avatar || "");
      }
    };
    getAvatar();
  });
  return (
    <div className="bg-primary-1 flex h-16 justify-between items-center fixed top-0 left-0 right-0 z-20">
      <div>
        <img src={LogoText} alt="Logo Text" />
      </div>
      {/* <div className=" flex items-center ml-2">
        <span className="text-lg">/ Lớp học</span>
        <HeaderBreadcrumnbs pathname={pathname} />
      </div> */}
      <div
        className="mr-3 cursor-pointer "
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <div className="flex items-center">
          <div className="mr-2 text-white">{user?.username}</div>
          <Avatar alt="avatar" src={avatar} />
        </div>
        {isOpenMenu && <HeaderMenu onClose={() => setIsOpenMenu(false)} />}
      </div>
    </div>
  );
}
