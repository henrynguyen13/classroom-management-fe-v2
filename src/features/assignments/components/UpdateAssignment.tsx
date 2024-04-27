import CustomButton from "@/components/base/Button";
import InputText from "@/components/base/InputText";
import { useForm } from "react-hook-form";
import { showSuccessNotificationFunction } from "@/common/helpers";
import CustomDatePicker from "@/components/base/DatePicker";
import InputTextArea from "@/components/base/InputTextArea";
import { useEffect, useState } from "react";
import { assignmentService } from "../services/assignment.service";
import { IUpdateAssignment } from "../interfaces";
import { useParams } from "react-router-dom";

interface Props {
  setIsUpdate: any;
  onUpdateSuccess: (data: any) => void;
}
export default function UpdateAssignment({
  setIsUpdate,
  onUpdateSuccess,
}: Props) {
  const { id, assignmentId } = useParams();

  const [expiredAt, setExpiredAt] = useState<Date>();

  const { control, handleSubmit, reset } = useForm({
    // resolver: yupResolver(homeWorkSchema),
  });

  useEffect(() => {
    const getAssignmentDetail = async () => {
      const response = await assignmentService.getAssignmentById(
        id as string,
        assignmentId as string
      );
      reset({
        name: response?.name ?? "",
        description: response?.description ?? "",
        expiredAt: response?.expiredAt ?? Date.now(),
      });
      setExpiredAt(response?.expiredAt ?? Date.now());
    };

    getAssignmentDetail();
  }, [assignmentId]);

  const handleUpdate = handleSubmit(async (dto: IUpdateAssignment) => {
    const response = await assignmentService.update(
      id as string,
      assignmentId as string,
      dto
    );
    if (response?.success) {
      showSuccessNotificationFunction("Cập nhật bài tập thành công");
      setIsUpdate(false);
      onUpdateSuccess(dto);
    }
  });

  return (
    <div>
      <InputText
        control={control}
        name="name"
        value="name"
        label="Tên bài tập"
        placeholder="Nhập tên bài tập"
        width="500"
      />

      <InputTextArea
        control={control}
        label="Mô tả"
        value="description"
        name="description"
        placeholder="Nhập mô tả bài tập "
      />
      <div className="mb-2">
        <label>
          <span className="text-base font-medium">Hạn bài tập</span>
          <span className="text-red">*</span>
        </label>
      </div>
      <div className="flex justify-between items-center">
        <CustomDatePicker
          control={control}
          value={expiredAt}
          name="expiredAt"
          width="500px"
        />
      </div>

      <div className="flex justify-end mt-10">
        <CustomButton
          text="Hủy"
          size="large"
          width="120"
          backgroundColor="grey"
          borderRadius="20"
          onClick={() => setIsUpdate(false)}
        />
        <span className="mr-3"></span>
        <CustomButton
          text="Cập nhật"
          size="large"
          width="120"
          borderRadius="20"
          onClick={() => handleUpdate()}
        />
      </div>
    </div>
  );
}
