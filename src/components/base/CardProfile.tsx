import { ICard } from "@/common/interfaces";

import { mdiLeadPencil, mdiKey } from "@mdi/js";
import { Card, Chip, IconButton, Tooltip } from "@mui/material";
import Icon from "@mdi/react";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import UpdateProfile from "@/features/profile/components/UpdateProfile";
import { IUser } from "@/features/auth/interfaces";
import ChangePassword from "@/features/profile/components/ChangePassword";
import { ROLES } from "@/common";

interface Props {
  user: IUser;
  title: string;
  list: ICard[];
  updateProfile: () => void;
}

export default function CardProfile({
  title,
  list,
  user,
  updateProfile,
}: Props) {
  const [isUpdateProfile, setIsUpdateProfile] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

  return (
    <>
      <Card>
        <div className="w-full  rounded-lg  p-8 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center  pb-8">
              <Avatar
                sx={{ marginRight: 4, width: 64, height: 64 }}
                src={
                  user?.avatar
                    ? user?.avatar
                    : `/src/assets/images/no-avatar/webp`
                }
              />

              <div className="text-xl ">{title}</div>
            </div>
            <div>
              <Tooltip title="Sửa">
                <IconButton
                  sx={{ color: "#e28d0f" }}
                  onClick={() => {
                    setIsUpdateProfile(true);
                  }}
                >
                  <Icon path={mdiLeadPencil} size={1} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Đổi mật khẩu">
                <IconButton
                  sx={{ color: "#ed3a3a" }}
                  onClick={() => {
                    setIsChangePassword(true);
                  }}
                >
                  <Icon path={mdiKey} size={1} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className="border-[1px] border-border"></div>
          <div className="grid grid-cols-2">
            {list
              .filter((item) => item?.role.includes(user?.role as ROLES))
              .map((item, index) => (
                <div key={index} className="mt-6">
                  <div className="flex mb-2 text-neutral-2">
                    {item.icon}
                    {item.title}
                  </div>
                  {item.title === "Mã người dùng" ? (
                    <Chip
                      label={item.content}
                      variant="outlined"
                      sx={{
                        background: "#1D8FE4",
                        color: "#ffffff",

                        "&. MuiChip-label": {
                          fontSize: "14px",
                        },
                      }}
                    />
                  ) : (
                    <div className="text-neutral-1">{item.content}</div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </Card>
      {isUpdateProfile ? (
        <UpdateProfile
          user={user}
          isOpenForm={isUpdateProfile}
          handleClose={() => setIsUpdateProfile(false)}
          updateProfile={updateProfile}
        />
      ) : null}
      {isChangePassword ? (
        <ChangePassword
          userId={user?._id as string}
          isOpenForm={isChangePassword}
          handleClose={() => setIsChangePassword(false)}
        />
      ) : null}
    </>
  );
}
