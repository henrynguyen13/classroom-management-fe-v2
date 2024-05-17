import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  CustomButton,
  InputText,
  CustomDatePicker,
  InputTextArea,
  Dropdown,
  Tiptap,
  CardQuestion,
} from "@/components";
import {
  ASSIGNMENT_TYPE,
  ASSIGNMENT,
  showSuccessNotificationFunction,
} from "@/common";
import { assignmentService, BankModal, ICreateAssignment } from "../index";
import { IQuestion } from "@/features";

const defaultValues = {
  name: "",
  description: "",
  type: "",
  expiredAt: new Date(),
};
export const CreateAssignmentPage = () => {
  const { id } = useParams();

  const [type, setType] = useState("");
  const [isOpenBankModal, setIsOpenBankModal] = useState(false);
  const [tiptapQuestionContent, setTiptapQuestionContent] = useState("");

  const [questionsDto, setQuestionsDto] = useState<IQuestion[]>([]);
  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(assignmentSchema),
    defaultValues,
  });

  const handleTiptapQuestionChange = (content: string) => {
    setTiptapQuestionContent(content);
  };

  const handleCreate = handleSubmit(async (dto: ICreateAssignment) => {
    console.log("dto", dto);
    const updatedDto = {
      ...dto,
      type: type,
      description: tiptapQuestionContent,
      questions: questionsDto,
    };
    const response = await assignmentService.create(updatedDto, id as string);
    console.log("RES", response);

    if (response?.success) {
      showSuccessNotificationFunction("Tạo bài tập thành công");
      const assignmentId = response._id;
      setTimeout(() => {
        window.location.href = `/classes/${id}/assignment/${assignmentId}`;
      }, 1000);
    }
  });

  const handleAddQuestionsDto = (question: IQuestion) => {
    const updateQuestions = [...questionsDto, question];
    setQuestionsDto(updateQuestions); // Update the questionsDto state
  };
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

      <Dropdown
        control={control}
        label="Loại bài tập"
        placeholder="Chọn loại bài tập"
        options={ASSIGNMENT_TYPE}
        name="type"
        width="500px"
        setType={setType}
      />

      {type === ASSIGNMENT.ESSAY && (
        <Tiptap
          control={control}
          name="description"
          label="Câu hỏi"
          placeholder="Nhập câu hỏi"
          onChange={handleTiptapQuestionChange}
        />
      )}

      {type === ASSIGNMENT.MULTIPLE_CHOICE && (
        <CustomButton
          width="250px"
          text="Chọn câu hỏi từ ngân hàng"
          onClick={() => setIsOpenBankModal(true)}
        />
      )}

      {questionsDto.map((question, index) => (
        <div key={index}>
          <CardQuestion
            id={question._id}
            index={index + 1}
            text={question.text}
            answers={question.answers}
            type={question.type}
            level={question.level}
            // handleAdd={() => onAddQuestions(question)}
            //   handleDelete={() => handleDelete(question._id)}
            //   handleUpdate={() =>
            //     setIsOpenUpdateQuestionForm({
            //       id: question._id,
            //       state: true,
            //     })
            //   }
          />
        </div>
      ))}

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

      <BankModal
        isOpenForm={isOpenBankModal}
        handleClose={() => setIsOpenBankModal(false)}
        onAddQuestions={handleAddQuestionsDto}
      />
    </div>
  );
};
