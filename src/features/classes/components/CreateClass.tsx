import { useEffect, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import {
  IOption,
  ROLES,
  date,
  showSuccessNotificationFunction,
  time,
} from "@/common";
import { Form, InputText, CustomButton, Dropdown } from "@/components/base";
import Icon from "@mdi/react";
import { mdiTrashCan } from "@mdi/js";
import { yupResolver } from "@hookform/resolvers/yup";
import { classSchema } from "../schema";
import { Add } from "@/assets/icons";
import { IconButton, Tooltip } from "@mui/material";
import { userService } from "@/features/profile/services/profile.service";
import { IUser } from "@/features/auth/interfaces";
import { classService } from "../services/class.service";
interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  updateClassList: () => void;
}

const defaultValues = {
  code: "",
  name: "",
  description: Array.from({ length: 1 }, () => ({
    from: "",
    to: "",
    date: "",
  })),
  teacher: "",
};
export default function CreateClass(props: Props) {
  const { isOpenForm, handleClose, updateClassList } = props;

  const [teachers, setTeachers] = useState<IOption[]>([]);
  useEffect(() => {
    const getAllTeachers = async () => {
      try {
        const response = await userService.getAllUser({});
        if (response?.success) {
          console.log("-----", response.users);
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

    getAllTeachers();
  }, []);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(classSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray<FieldValues["description"]>({
    control,
    name: "description",
  });
  const handleCreate = handleSubmit(async (mclass: any) => {
    console.log("---------", mclass);
    console.log("iii");
    const response = await classService.create(mclass);
    console.log("----res", response);
    if (response?.success) {
      showSuccessNotificationFunction("Tạo lớp học thành công");
      reset({
        code: defaultValues.code,
        name: defaultValues.name,
        description: defaultValues.description,
      });
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
      title="Tạo lớp học"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
      width="650px"
      height="700px"
    >
      <InputText
        control={control}
        name="code"
        label="Mã lớp học"
        placeholder="Nhập mã lớp học"
        width="570"
      />
      <InputText
        control={control}
        name="name"
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
      {fields.map((field, index) => (
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
      {/* <InputText
        control={control}
        name="description"
        label="Mô tả lớp học"
        placeholder="Nhập mô tả lớp học"
        width="430"
      /> */}

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
          onClick={() => handleCreate()}
        />
      </div>
    </Form>
  );
}
