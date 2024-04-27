import CustomButton from "@/components/base/Button";
import Form from "@/components/base/Form";
import InputText from "@/components/base/InputText";
import { useForm } from "react-hook-form";
import { IUpdateClass } from "../interfaces";
import { classService } from "../services/class.service";
import { showSuccessNotificationFunction } from "@/common/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { classSchema } from "../schema";
import { useEffect } from "react";

interface Props {
  classId: string;
  isOpenForm: boolean;
  handleClose: () => void;
  updateClassList: () => void;
}

export default function UpdateClass(props: Props) {
  const { isOpenForm, handleClose, updateClassList, classId } = props;

  useEffect(() => {
    const getClassDetail = async () => {
      const response = await classService.getClassDetail(classId);
      reset({
        code: response.class?.code ?? "",
        name: response.class?.name ?? "",
        description: response.class?.description ?? "",
      });
    };

    getClassDetail();
  }, [classId]);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(classSchema),
  });

  const handleUpdate = handleSubmit(async (mclass: any) => {
    const response = await classService.update(classId, mclass);
    if (response?.success) {
      showSuccessNotificationFunction("Sửa lớp học thành công");
      handleClose();
      updateClassList();
    }
  });
  return (
    <Form title="Sửa lớp học" isOpenForm={isOpenForm} handleClose={handleClose}>
      <InputText
        control={control}
        name="code"
        value="code"
        label="Mã lớp học"
        placeholder="Nhập mã lớp học"
        width="430"
      />
      <InputText
        control={control}
        name="name"
        value="name"
        label="Tên lớp học"
        placeholder="Nhập tên lớp học"
        width="430"
      />
      <InputText
        control={control}
        name="description"
        value="description"
        label="Mô tả lớp học"
        placeholder="Nhập mô tả lớp học"
        width="430"
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
}
