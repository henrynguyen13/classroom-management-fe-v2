import { useForm } from "@/plugins";
import { ISectionProps } from "../interface";
import { showSuccessNotificationFunction } from "@/common";
import { useState } from "react";
import { IQuestion } from "@/features";
import { sectionService } from "../services/section.service";

export const useCreateQuestionSection = (props: ISectionProps) => {
  const { type, reviewId, handleClose, update } = props;
  const form = useForm({
    // resolver: yupResolver(questionSchema),
    // defaultValues,
    //need to validate
  });
  const [isOpenBankModal, setIsOpenBankModal] = useState(false);
  const [questionsDto, setQuestionsDto] = useState<IQuestion[]>([]);
  const { handleSubmit, reset } = form;

  const handleCreate = handleSubmit(async (dto: any) => {
    const updatedDto = {
      name: dto.name,
      type: type,
      duration: dto.duration,
    };

    const response = await sectionService.createSection(
      reviewId as string,
      updatedDto,
      undefined,
      questionsDto!
    );

    if (response?.success) {
      showSuccessNotificationFunction("Tạo thành công");
      //   handleQuestionCreateSuccess?.(response);
      handleClose?.();
      update?.();
      //navigate
    }
  });

  const handleAddQuestionsDto = (question: IQuestion) => {
    const updateQuestions = [...questionsDto, question];
    setQuestionsDto(updateQuestions); // Update the questionsDto state
  };

  const handleDelete = (questionId: string) => {
    const updateQuestions = questionsDto.filter(
      (question) => question?._id !== questionId
    );
    setQuestionsDto(updateQuestions);
  };

  return {
    form,
    isOpenBankModal,
    setIsOpenBankModal,
    handleAddQuestionsDto,
    handleCreate,
    questionsDto,
    setQuestionsDto,
    handleDelete,
    handleClose,
  };
};
