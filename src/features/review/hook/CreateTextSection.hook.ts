import { useState } from "react";

import { useForm } from "@/plugins";

import { showSuccessNotificationFunction } from "@/common";
import { ISectionProps } from "../interface";
import { sectionService } from "../services/section.service";

export const useFunctionTextSection = (props: ISectionProps) => {
  const { type, reviewId, handleClose, update } = props;
  const form = useForm({
    // resolver: yupResolver(questionSchema),
    // defaultValues,
    //need to validate
  });

  const { handleSubmit } = form;
  const [tiptapSectionContent, setTiptapSectionContent] = useState("");
  const handleTiptapSectionChange = (content: string) => {
    setTiptapSectionContent(content);
  };

  const handleCreate = handleSubmit(async (dto: any) => {
    const updatedDto = {
      name: dto.name,
      type: type,
    };

    const response = await sectionService.createSection(
      reviewId as string,
      updatedDto,
      undefined,
      tiptapSectionContent!
    );

    if (response?.success) {
      showSuccessNotificationFunction("Tạo thành công");
      //   handleQuestionCreateSuccess?.(response);
      handleClose?.();
      update?.();
      //navigate
    }
  });

  //   const handleUpdate = handleSubmit(async (dto: any) => {
  //     const updatedDto: any = {};

  //     console.log("-ddddd", dto);

  //     if (dto.text !== undefined) {
  //       updatedDto.text = tiptapQuestionContent;
  //     }

  //     if (dto.answerShort !== undefined) {
  //       updatedDto.answerShort = dto.answerShort;
  //     }

  //     updatedDto.level = questionLevel;

  //     const response = await questionBankService.updateQuestion(
  //       props.questionBankId as string,
  //       props.questionId as string,
  //       updatedDto
  //     );
  //     if (response?.success) {
  //       showSuccessNotificationFunction("Cập nhật câu hỏi thành công");
  //       handleQuestionUpdateSuccess?.(response);
  //       handleClose?.();
  //     }
  //   });

  //   const getQuestionDetail = async () => {
  //     const response = await questionBankService.getQuestionDetail(
  //       questionBankId as string,
  //       questionId as string
  //     );
  //     if (response?.success) {
  //       console.log("responseQuestion", response);
  //       reset({ answerShort: response?.answerShort });

  //       setSelectedLevelQuestion?.(response?.level.toString()!);
  //       setSelectedTypeQuestion?.(response?.type);
  //       setTiptapQuestionContent(response?.text);
  //       setSelectedAnswer(response?.answerShort);
  //     }
  //   };

  //   {
  //     questionId !== undefined &&
  //       useEffect(() => {
  //         getQuestionDetail();
  //       }, [questionId]);
  //   }

  return {
    type,
    reviewId,
    form,
    tiptapSectionContent,
    handleCreate,
    handleClose,
    handleTiptapSectionChange,
  };
};
