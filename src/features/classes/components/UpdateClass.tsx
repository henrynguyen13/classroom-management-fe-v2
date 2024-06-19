import { useEffect, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { mdiTrashCan } from "@mdi/js";
import Icon from "@mdi/react";
import { IconButton, Tooltip } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  showSuccessNotificationFunction,
  IOption,
  ROLES,
  date,
  time,
} from "@/common";
import { Add } from "@/assets";
import { Form, InputText, CustomButton, Dropdown } from "@/components";
import { IUser, userService } from "@/features";
import { classService, classSchema } from "../index";

interface Props {
  classId: string;
  isOpenForm: boolean;
  handleClose: () => void;
  updateClassList: () => void;
}

export const UpdateClass = (props: Props) => {
  const { isOpenForm, handleClose, updateClassList, classId } = props;
  const [teachers, setTeachers] = useState<IOption[]>([]);

  const getAllTeachers = async () => {
    try {
      const response = await userService.getAllUserWithoutPagination({});
      if (response?.success) {
        setTeachers(
          response.users
            .filter((user: IUser) => user.role === ROLES.TEACHER)
            .map((user: IUser) => ({ id: user._id, label: user.username }))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  useEffect(() => {
    const getClassDetail = async () => {
      const response = await classService.getClassDetail(classId, {});
      reset({
        code: response.class?.code ?? "",
        name: response.class?.name ?? "",
        description: response.class?.description ?? "",
        teacher: response.class?.teacher?._id ?? "",
      });
    };

    getClassDetail();
    getAllTeachers();
  }, [classId]);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(classSchema),
  });

  const { fields, append, remove } = useFieldArray<FieldValues["description"]>({
    control,
    name: "description",
  });
  const handleUpdate = handleSubmit(async (mclass: any) => {
    const response = await classService.update(classId, mclass);
    if (response?.success) {
      showSuccessNotificationFunction("Sửa lớp học thành công");
      handleClose();
      updateClassList();
    }
  });

  const handleAddDescription = () => {
    append({
      from: "",
      to: "",
      date: "",
    });
  };

  const handleDeleteDescription = (index: number) => {
    remove(index);
  };
  return (
    <Form
      title="Sửa lớp học"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
      width="650px"
      height="700px"
    >
      <InputText
        control={control}
        name="code"
        value="code"
        label="Mã lớp học"
        placeholder="Nhập mã lớp học"
        width="570"
      />
      <InputText
        control={control}
        name="name"
        value="name"
        label="Tên lớp học"
        placeholder="Nhập tên lớp học"
        width="570"
      />
      <Tooltip title="Thêm" placement="right">
        <img
          className="cursor-pointer hover:opacity-70 relative mt-2"
          src={Add}
          onClick={handleAddDescription}
          alt="Add icon"
        />
      </Tooltip>
      {fields.map((_field, index) => (
        <div
          key={index}
          className="flex justify-between items-center w-[570px]"
        >
          <Dropdown
            control={control}
            placeholder="Từ"
            name={`description[${index}].from`}
            options={time}
            width="140px"
            label="Thời gian"
          />
          <Dropdown
            control={control}
            name={`description[${index}].to`}
            placeholder="Đến"
            options={time}
            width="140px"
          />
          <Dropdown
            control={control}
            name={`description[${index}].date`}
            placeholder="Ngày"
            options={date}
            width="170px"
          />
          <div className="w-[200px]">
            {index !== 0 && (
              <Tooltip title="Xóa">
                <IconButton
                  sx={{ color: "#ED3A3A", marginLeft: 2, marginBottom: 1 }}
                  onClick={() => handleDeleteDescription(index)}
                >
                  <Icon path={mdiTrashCan} size={1} />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      ))}

      <Dropdown
        control={control}
        name="teacher"
        placeholder="Giáo viên"
        options={teachers}
        label="Giáo viên giảng dạy"
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
          text="Tạo"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleUpdate()}
        />
      </div>
    </Form>
  );
};
