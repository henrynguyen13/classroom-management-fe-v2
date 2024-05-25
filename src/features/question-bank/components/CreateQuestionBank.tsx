import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { showSuccessNotificationFunction } from "@/common";
import { Form, InputText, CustomButton } from "@/components";
import { questionBankSchema, questionBankService } from "@/features";

interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  updateList: () => void;
}

const defaultValues = {
  name: "",
  description: "",
};

export const CreateQuestionBank = (props: Props) => {
  const { isOpenForm, handleClose, updateList } = props;

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(questionBankSchema),
    defaultValues,
  });

  const handleCreate = handleSubmit(async (mclass: any) => {
    const response = await questionBankService.create(mclass);
    if (response?.success) {
      showSuccessNotificationFunction("Tạo ngân hàng câu hỏi thành công");
      reset({
        name: defaultValues.name,
        description: defaultValues.description,
      });
      handleClose();
      updateList();
    }
  });

  return (
    <Form
      title="Tạo ngân hàng câu hỏi"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
      width="650px"
    >
      <InputText
        control={control}
        name="name"
        label="Tên ngân hàng câu hỏi"
        placeholder="Nhập tên ngân hàng câu hỏi"
        width="570"
      />
      <InputText
        control={control}
        name="description"
        label="Mô tả"
        placeholder="Nhập mô tả"
        width="570"
        isRequired={false}
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
