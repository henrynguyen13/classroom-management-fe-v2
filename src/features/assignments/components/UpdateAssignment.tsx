import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  ASSIGNMENT,
  ASSIGNMENT_TYPE,
  showSuccessNotificationFunction,
} from "@/common";
import {
  CustomButton,
  InputText,
  CustomDatePicker,
  InputTextArea,
  Dropdown,
  Tiptap,
} from "@/components";
import { assignmentService, IUpdateAssignment } from "../index";
import { IQuestion } from "@/features";

interface Props {
  setIsUpdate: any;
  onUpdateSuccess: (data: any) => void;
}

export const UpdateAssignment = ({ setIsUpdate, onUpdateSuccess }: Props) => {
  const { id, assignmentId } = useParams();

  const [expiredAt, setExpiredAt] = useState<Date>();
  const [type, setType] = useState<string>("");
  const [tiptapQuestionContent, setTiptapQuestionContent] = useState("");

  useEffect(() => {
    const getAssignmentDetail = async () => {
      const response = await assignmentService.getAssignmentById(
        id as string,
        assignmentId as string
      );
      if (response?.success) {
        console.log("response", response);
        reset({
          name: response?.name ?? "",
          description: response?.description ?? "",
          expiredAt: response?.expiredAt ?? Date.now(),
          type: response?.type ?? "",
        });
        setExpiredAt(response?.expiredAt ?? Date.now());
        setType(response?.type ?? "");
        setTiptapQuestionContent(response?.description ?? "");
      }
    };

    getAssignmentDetail();
  }, [assignmentId]);

  const { control, handleSubmit, reset } = useForm({
    // resolver: yupResolver(homeWorkSchema),
  });
  const handleUpdate = handleSubmit(async (dto: any) => {
    console.log("--des", tiptapQuestionContent);
    const updatedDto = {
      ...dto,
      description: tiptapQuestionContent,
    };
    const response = await assignmentService.update(
      id as string,
      assignmentId as string,
      updatedDto
    );
    if (response?.success) {
      showSuccessNotificationFunction("Cập nhật bài tập thành công");
      setIsUpdate(false);
      onUpdateSuccess(dto);
    }
  });

  const handleTiptapQuestionChange = (content: string) => {
    setTiptapQuestionContent(content);
  };

  //BUG: KHI ĐANG Ở TRẠNG THÁI TỰ LUẬN MÀ THÊM CÂU HỎI LÀ CHUYỂN SANG TRẮC NGHIỆM

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
      <div className="mb-2">
        <label>
          <span className="text-base font-medium">Hạn bài tập</span>
          <span className="text-red">*</span>
        </label>
      </div>
      <div className="flex justify-between items-center mb-5">
        <CustomDatePicker
          control={control}
          value={expiredAt}
          name="expiredAt"
          width="500px"
        />
      </div>

      <Dropdown
        control={control}
        label="Loại bài tập"
        placeholder="Chọn loại bài tập"
        options={ASSIGNMENT_TYPE}
        disabled={true}
        name="type"
        width="500px"
        setType={setType}
      />
      <Tiptap
        control={control}
        name="description"
        label="Câu hỏi"
        placeholder="Nhập câu hỏi"
        value={tiptapQuestionContent}
        onChange={handleTiptapQuestionChange}
      />

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
};
