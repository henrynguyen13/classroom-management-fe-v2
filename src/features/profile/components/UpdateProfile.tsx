import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "react-avatar-edit";
import Icon from "@mdi/react";
import { mdiLeadPencil } from "@mdi/js";
import { IconButton, Tooltip } from "@mui/material";

import {
  showSuccessNotificationFunction,
  showSuccessAlert,
  Roles,
  useBreakpoint,
  ScreenType,
} from "@/common";
import { CustomButton, Form, InputText, Dropdown } from "@/components";
import { IUpdateUser, IUser } from "@/features";
import { userService } from "../index";

interface Props {
  user: IUser;
  isOpenForm: boolean;
  handleClose: () => void;
  updateProfile: () => void;
}

export const UpdateProfile = (props: Props) => {
  const { isOpenForm, handleClose, updateProfile, user } = props;
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [image, setImage] = useState("");
  const [isOpenUpdateButton, setIsOpenUpdateButton] = useState(false);
  const onCrop = (image: string) => {
    setImage(image);
    setIsOpenUpdateButton(true);
  };
  const onClose = () => {
    handleCloseModal();
  };
  useEffect(() => {
    reset({
      username: user?.username ?? "",
      role: user?.role ?? "",
    });
    setImage(user?.avatar ?? "/src/assets/images/no-avatar.webp");
  }, []);

  const { control, handleSubmit, reset } = useForm({});

  const handleUpdate = handleSubmit(async (dto: IUpdateUser) => {
    const response = await userService.updateProfile(user?._id as string, dto);

    if (response?.success) {
      showSuccessNotificationFunction("Cập nhật thông tin cá nhân thành công");
      updateProfile();
      handleClose();
    }
  });

  const uploadAvatar = async () => {
    handleCloseModal();
    setIsOpenUpdateButton(false);
    const [, base64Content] = image.split(",");

    const binaryString = atob(base64Content);

    // Create a Uint8Array from the binary data
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: "image/jpeg" });

    // Create a FormData object and append the Blob as a file
    const formData = new FormData();
    formData.append("file", blob, "avatar.jpg");

    const response = await userService.uploadAvatar(
      user._id as string,
      formData
    );
    if (response?.success) {
      showSuccessAlert({ title: "Cập nhật ảnh đại diện thành công" });
    }
  };
  const { isSm } = useBreakpoint(ScreenType.SM);
  return (
    <Form
      title="Cập nhật thông tin cá nhân"
      width={isSm ? "650px" : "90vw"}
      height="90vh"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center mb-4">
            <img
              width="100px"
              className="rounded-full"
              src={image}
              alt="crop-image"
            />
            <Tooltip title="Sửa">
              <IconButton
                sx={{ color: "#e28d0f" }}
                onClick={() => {
                  handleOpenModal();
                }}
              >
                <Icon path={mdiLeadPencil} size={1} />
              </IconButton>
            </Tooltip>
          </div>

          {isOpenUpdateButton && (
            <CustomButton text="Cập nhật avatar" onClick={uploadAvatar} />
          )}
        </div>
        {open ? (
          <div>
            <Avatar
              width={300}
              height={200}
              onCrop={onCrop}
              onClose={onClose}
            />
          </div>
        ) : null}
      </div>

      {/* <button onClick={handleOpenModal}>choose avatar</button>
      <button onClick={uploadAvatar}>upload avatar</button> */}
      <div className="block sm:flex justify-between mt-16">
        <InputText
          control={control}
          name=""
          value={user?.code ?? ""}
          label="Mã người dùng"
          disabled
        />
        <div className="m-5"></div>
        <InputText
          control={control}
          name=""
          value={user?.email ?? ""}
          label="Email"
          disabled
        />
      </div>

      <InputText
        control={control}
        name="username"
        value="username"
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        minWidth={isSm ? "100%" : "300px"}
      />
      <Dropdown
        control={control}
        name="role"
        placeholder="Vai trò"
        options={Roles}
        label="Vai trò người dùng"
      />

      <div className="flex justify-end mt-10">
        <CustomButton
          text="Hủy"
          backgroundColor="grey"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleClose()}
        />
        <span className="mr-3"></span>
        <CustomButton
          text="Sửa"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleUpdate()}
        />
      </div>
    </Form>
  );
};
