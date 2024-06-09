import { GroupStatus, showSuccessNotificationFunction } from "@/common";
import { CustomButton, Dropdown, Form, InputText } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { groupSchema } from "../schema";
import { groupService } from "../services";

interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  updateGroupList: () => void;
}

const defaultValues = {
  name: "",
  status: "",
};

export const CreateGroupForm = (props: Props) => {
  const { isOpenForm, handleClose, updateGroupList } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(groupSchema),
    defaultValues,
  });

  const handleCreate = handleSubmit(async (dto: any) => {
    console.log("dto", dto);
    const response = await groupService.create(dto);
    if (response?.success) {
      showSuccessNotificationFunction("Tạo nhóm thành công");
      reset({
        name: defaultValues.name,
        status: defaultValues.status,
      });
      handleClose();
      updateGroupList();
    }
  });
  return (
    <Form
      title="Tạo nhóm mới"
      width="650px"
      height="500px"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
    >
      <InputText
        control={control}
        name="name"
        label="Tên nhóm"
        placeholder="Nhập tên nhóm"
        width="578"
      />

      <Dropdown
        control={control}
        placeholder="Trạng thái"
        name="status"
        options={GroupStatus}
        width="578px"
        label="Trạng thái"
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
          onClick={() => handleCreate()}
        />
      </div>
    </Form>
  );
};
