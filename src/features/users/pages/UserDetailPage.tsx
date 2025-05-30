import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiBarcode,
  mdiUpdate,
  mdiEmail,
  mdiCardAccountDetails,
} from "@mdi/js";
import { useParams } from "react-router-dom";

import {
  ALL_MEMBERS,
  convertUserRole,
  formatDate,
  ICard,
  openLoading,
  closeLoading,
} from "@/common";
import { CardProfile } from "@/components";
import { userService, IUser } from "@/features";
import { useAppDispatch } from "@/plugins";

export const UserDetailPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<IUser>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getMyProfile = async () => {
      dispatch(openLoading());

      try {
        const response = await userService.getUserById(id as string);
        if (response?.success) {
          setProfile(response);
        }
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(closeLoading());
      }
    };
    getMyProfile();
  }, []);

  const updateProfile = async () => {
    const response = await userService.getUserById(id as string);
    setProfile(response);
  };

  const listItems: ICard[] = [
    {
      title: "Họ và tên",
      icon: <Icon path={mdiAccount} size={1} className="mr-[10px]" />,
      content: profile?.username ?? "",
      role: ALL_MEMBERS,
    },
    {
      title: "Mã người dùng",
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
      title: "Vai trò",
      icon: (
        <Icon path={mdiCardAccountDetails} size={1} className="mr-[10px]" />
      ),
      content: convertUserRole(profile?.role!) ?? "",
      role: ALL_MEMBERS,
    },

    {
      title: "Ngày tham gia",
      icon: <Icon path={mdiUpdate} size={1} className="mr-[10px]" />,
      content: formatDate(profile?.createdAt),
      role: ALL_MEMBERS,
    },
    {
      title: "Cập nhật lần cuối",
      icon: <Icon path={mdiUpdate} size={1} className="mr-[10px]" />,
      content: formatDate(profile?.updatedAt),
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
