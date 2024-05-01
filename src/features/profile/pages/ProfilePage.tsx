import { useEffect, useState } from "react";
import { mdiAccount, mdiBarcode, mdiUpdate, mdiEmail } from "@mdi/js";
import Icon from "@mdi/react";

import {
  ALL_MEMBERS,
  formatDate,
  ICard,
  ROLES,
  AuthStorageService,
} from "@/common";
import { CardProfile } from "@/components";
import { IUser } from "@/features";
import { userService } from "../index";

export const ProfilePage = () => {
  const userId = AuthStorageService.getLoginUser()._id;
  const [profile, setProfile] = useState<IUser>();

  useEffect(() => {
    const getMyProfile = async () => {
      const response = await userService.getUserById(userId as string);
      if (response?.success) {
        setProfile(response);
        console.log("response", response);
      }
    };
    getMyProfile();
  }, []);

  const updateProfile = async () => {
    const response = await userService.getUserById(userId as string);
    setProfile(response);
    console.log("responseUpdate", response);
  };

  const listItems: ICard[] = [
    {
      title: "Họ và tên",
      icon: <Icon path={mdiAccount} size={1} className="mr-[10px]" />,
      content: profile?.username ?? "",
      role: ALL_MEMBERS,
    },
    {
      title: profile?.role === ROLES.STUDENT ? "Mã học sinh" : "Mã giáo viên",
      icon: <Icon path={mdiBarcode} size={1} className="mr-[10px]" />,
      content: profile?.code ?? "",
      role: ALL_MEMBERS,
    },
    {
      title: "Email",
      icon: <Icon path={mdiEmail} size={1} className="mr-[10px]" />,
      content: profile?.email ?? "",
      role: ALL_MEMBERS,
    },

    {
      title: "Ngày tham gia",
      icon: <Icon path={mdiUpdate} size={1} className="mr-[10px]" />,
      content: formatDate(profile?.createdAt),
      role: ALL_MEMBERS,
    },
  ];
  return (
    <>
      <CardProfile
        user={profile as IUser}
        title={profile?.username ?? ""}
        list={listItems}
        updateProfile={updateProfile}
      />
    </>
  );
};
