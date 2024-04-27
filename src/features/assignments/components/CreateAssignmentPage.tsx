import CustomButton from "@/components/base/Button";
import InputText from "@/components/base/InputText";
import { useForm } from "react-hook-form";
import { showSuccessNotificationFunction } from "@/common/helpers";
import CustomDatePicker from "@/components/base/DatePicker";
import InputTextArea from "@/components/base/InputTextArea";
import { assignmentService } from "../services/assignment.service";
import { ICreateAssignment } from "../interfaces";
import { useParams } from "react-router-dom";

const defaultValues = {
  name: "",
  description: "",
  expiredAt: new Date(),
};
export default function CreateAssignmentPage() {
  const { id } = useParams();

  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(assignmentSchema),
    defaultValues,
  });

  const handleCreate = handleSubmit(async (dto: ICreateAssignment) => {
    const response = await assignmentService.create(dto, id as string);
    if (response?.success) {
      showSuccessNotificationFunction("Tạo bài tập thành công");
      const assignmentId = response._id;
      setTimeout(() => {
        window.location.href = `/classes/${id}/assignment/${assignmentId}`;
      }, 1000);
    }
  });

  return (
    <div>
      <InputText
        control={control}
        name="name"
        label="Tên bài tập"
        placeholder="Nhập tên bài tập"
        width="500"
      />
      <div className="mb-2">
        <label>
          <span className="text-base font-medium">Hạn bài tập</span>
          <span className="text-red">*</span>
        </label>
      </div>
      <div className="flex justify-between items-center mb-6">
        <CustomDatePicker control={control} name="expiredAt" width="500px" />
      </div>
      <InputTextArea
        control={control}
        label="Mô tả"
        name="description"
        placeholder="Nhập mô tả bài tập "
      />

      <div className="flex justify-end mt-10">
        <span className="mr-3"></span>
        <CustomButton
          text="Tạo"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleCreate()}
        />
      </div>

      {/* <CreateQuestion
        isOpenForm={isOpenCreateQuestion}
        handleClose={() => setIsOpenCreateQuestion(false)}
      /> */}
    </div>
  );
}
