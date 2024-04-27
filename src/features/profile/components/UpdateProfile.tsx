import CustomButton from "@/components/base/Button";
import Form from "@/components/base/Form";
import InputText from "@/components/base/InputText";
import { useForm } from "react-hook-form";
import {
  showSuccessNotificationFunction,
  showSuccessAlert,
} from "@/common/helpers";
import { useEffect, useState } from "react";
import { userService } from "../services/profile.service";
import { IUpdateUser, IUser } from "@/features/auth/interfaces";
import { mdiLeadPencil } from "@mdi/js";
import { IconButton, Tooltip } from "@mui/material";
import Icon from "@mdi/react";
import Avatar from "react-avatar-edit";
import { ROLES } from "@/common";

interface Props {
  user: IUser;
  isOpenForm: boolean;
  handleClose: () => void;
  updateProfile: () => void;
}

export default function UpdateProfile(props: Props) {
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
    });
    setImage(user?.avatar ?? "/no-avatar.webp");
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
  return (
    <Form
      title="Cập nhật thông tin cá nhân"
      width="650px"
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
      <div className="flex justify-between mt-16">
        <InputText
          control={control}
          name=""
          value={user?.code ?? ""}
          label={user?.role === ROLES.TEACHER ? "Mã giáo viên" : "Mã học sinh"}
          disabled
          width="250"
        />
        <InputText
          control={control}
          name=""
          value={user?.email ?? ""}
          label="Email"
          disabled
          width="250"
        />
      </div>

      <InputText
        control={control}
        name="username"
        value="username"
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        width="540"
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
}
