import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { showSuccessNotificationFunction } from "@/common";
import { Form, InputText, CustomButton } from "@/components";
import { questionBankSchema, questionBankService } from "@/features";
import { useEffect } from "react";

interface Props {
  bankId: string;
  isOpenForm: boolean;
  handleClose: () => void;
  updateList: () => void;
}

export const UpdateQuestionBank = (props: Props) => {
  const { bankId, isOpenForm, handleClose, updateList } = props;

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(questionBankSchema),
  });

  useEffect(() => {
    const getBankDetail = async () => {
      const response = await questionBankService.getQuestionBankById(bankId);
      reset({
        name: response.data?.name ?? "",
        description: response.data?.description ?? "",
      });
    };

    getBankDetail();
  }, [bankId]);
  const handleUpdate = handleSubmit(async (dto: any) => {
    const response = await questionBankService.updateQuestionBank(bankId, dto);
    if (response?.success) {
      showSuccessNotificationFunction("Sửa ngân hàng câu hỏi thành công");
      handleClose();
      updateList();
    }
  });

  return (
    <Form
      title="Sửa ngân hàng câu hỏi"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
      width="650px"
    >
      <InputText
        control={control}
        name="name"
        value="name"
        label="Tên ngân hàng câu hỏi"
        placeholder="Nhập tên ngân hàng câu hỏi"
        width="570"
      />
      <InputText
        control={control}
        name="description"
        label="Mô tả"
        value="description"
        isRequired={false}
        placeholder="Nhập mô tả"
        width="570"
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
