import { useEffect, useState } from "react";
import { Avatar, Badge } from "@mui/material";
import { HeaderMenu } from "./HeaderMenu";
import { IUser, userService } from "@/features";
import { LogoText } from "@/assets";
import {
  AuthStorageService,
  ICommonListQuery,
  PAGES,
  Roles,
  ScreenType,
  useBreakpoint,
} from "@/common";
import Icon from "@mdi/react";
import { mdiBellOutline } from "@mdi/js";
import io from "socket.io-client";
import { showSuccessNotificationFunction } from "@/common";
import { ItemList } from "@/components";
import { notificationService } from "@/features/notifications/services/notifications.service";
import { useNavigate } from "react-router-dom";
const user = AuthStorageService.getLoginUser();
// const socket = io("http://localhost:8080", {
//   query: { userId: user._id },
// });

const socket = io(`${import.meta.env.VITE_API}`, {
  query: { userId: user._id },
});
interface Notification {
  _id: string;
  message: string;
  user?: IUser;
  type?: string;
  isRead?: boolean;
  redirectId?: string;
  // Add other fields as necessary
}

export enum NotificationType {
  ADD_TO_CLASS = "add_to_class",
  ADD_TO_GROUP = "add_to_group",
  POST = "post",
}
export const HeaderBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [avatar, setAvatar] = useState("");
  const user = AuthStorageService.getLoginUser();
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isSm } = useBreakpoint(ScreenType.SM);

  const handleItemClick = async (notification: Notification) => {
    await notificationService.updateReadStatus(notification._id, true);

    if (notification.type === NotificationType.ADD_TO_CLASS) {
      navigate(`/classes/${notification.redirectId}`); // Adjust the path as per your routes
    } else if (
      notification.type === NotificationType.ADD_TO_GROUP ||
      notification.type === NotificationType.POST
    ) {
      navigate(`/forum/${notification.redirectId}`); // Adjust the path as per your routes
    }
    getAllNotifications({});
    setIsOpenNotification(false);
  };

  const markAllNotificationsAsRead = async () => {
    await notificationService.markAllAsRead();
    getAllNotifications({});
  };
  useEffect(() => {
    const getAvatar = async () => {
      const response = await userService.getUserById(user?._id as string);
      if (response?.success) {
        setAvatar(response?.avatar || "");
      }
    };
    getAvatar();
  }, []);

  const getAllNotifications = async (query: ICommonListQuery) => {
    const response = await notificationService.getAllNotifications(
      query,
      user?._id!
    );
    setNotifications(response?.notifications ?? []);
  };
  useEffect(() => {
    getAllNotifications({});
  }, []);
  useEffect(() => {
    socket.on("notification", (notification: any) => {
      // setNotifications((prevNotifications) => [
      //   notification,
      //   ...prevNotifications,
      // ]);
      getAllNotifications({});
      showSuccessNotificationFunction(notification?.message);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const navigate = useNavigate();

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;
  return (
    <>
      <div className="bg-primary-1 flex h-16 justify-between items-center fixed top-0 left-0 right-0 z-20">
        <div
          className="cursor-pointer hover:opacity-90"
          onClick={() => navigate(PAGES.DASHBOARD)}
        >
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
            <Badge badgeContent={unreadCount} color="error">
              <Icon path={mdiBellOutline} size={1} color="#FFFFFF" />
            </Badge>
            {/* {notifications.length > 0 && (
              <span className="badge">{notifications.length}</span>
            )} */}
            {isOpenNotification && (
              <ItemList
                markAllNotificationsAsRead={markAllNotificationsAsRead}
                items={notifications}
                onItemClick={handleItemClick}
              />
            )}
          </div>
          <div
            className="mr-3 cursor-pointer "
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <div className="flex items-center">
              {isSm && (
                <div className="mr-4 ml-2 text-white">
                  {user?.username} <br />
                  <div className="text-yellow-500 font-medium text-sm">
                    {Roles.find((item: any) => item?.id === user?.role)?.label}
                  </div>
                </div>
              )}
              <Avatar alt="avatar" src={avatar} />
            </div>
            {isOpenMenu && <HeaderMenu onClose={() => setIsOpenMenu(false)} />}
          </div>
        </div>
      </div>
    </>
  );
};
