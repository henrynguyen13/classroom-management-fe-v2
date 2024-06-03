import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { HeaderMenu } from "./HeaderMenu";
import { IUser, userService } from "@/features";
import { LogoText } from "@/assets";
import { AuthStorageService } from "@/common";
import Icon from "@mdi/react";
import { mdiBellOutline } from "@mdi/js";
import io from "socket.io-client";
import { showSuccessNotificationFunction } from "@/common";
const socket = io("http://localhost:8080");

interface Notification {
  message: string;
  user?: IUser;
  type?: string;
  isRead?: boolean;
  // Add other fields as necessary
}
export const HeaderBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [avatar, setAvatar] = useState("");
  const user = AuthStorageService.getLoginUser();
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const getAvatar = async () => {
      const response = await userService.getUserById(user?._id as string);
      if (response?.success) {
        setAvatar(response?.avatar || "");
      }
    };
    getAvatar();
  }, []);

  useEffect(() => {
    socket.on("notification", (notification: any) => {
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
      showSuccessNotificationFunction(notification?.message);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div className="bg-primary-1 flex h-16 justify-between items-center fixed top-0 left-0 right-0 z-20">
      <div>
        <img src={LogoText} alt="Logo Text" />
      </div>
      {/* <div className=" flex items-center ml-2">
        <span className="text-lg">/ Lớp học</span>
        <HeaderBreadcrumnbs pathname={pathname} />
      </div> */}
      <div className="flex items-center">
        <div
          className="mr-5 hover:cursor-pointer"
          onClick={() => setIsOpenNotification(!isOpenNotification)}
        >
          <Icon path={mdiBellOutline} size={1} color="#FFFFFF" />
          {notifications.length > 0 && (
            <span className="badge">{notifications.length}</span>
          )}
        </div>
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
    </div>
  );
};
