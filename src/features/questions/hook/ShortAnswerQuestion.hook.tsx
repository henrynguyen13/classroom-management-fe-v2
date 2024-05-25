import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "@/plugins";
import {
  questionBankService,
  IQuestionProps,
  questionSchema,
} from "@/features";
import { showSuccessNotificationFunction } from "@/common";

export const useFunctionShortAnswer = (props: IQuestionProps) => {
  const {
    questionType,
    questionLevel,
    questionBankId,
    questionId,
    handleQuestionUpdateSuccess,
    setSelectedLevelQuestion,
    setSelectedTypeQuestion,
    handleQuestionCreateSuccess,
    handleClose,
  } = props;
  const form = useForm({
    resolver: yupResolver(questionSchema),
    // defaultValues,
  });

  const { handleSubmit, reset } = form;
  const [tiptapQuestionContent, setTiptapQuestionContent] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleTiptapQuestionChange = (content: string) => {
    setTiptapQuestionContent(content);
  };

  const handleCreate = handleSubmit(async (dto: any) => {
    const updatedDto = {
      ...dto,
      text: tiptapQuestionContent,
      type: questionType,
      level: questionLevel,
      answerShort: dto?.answerShort,
    };
    console.log("-dto", dto);

    const response = await questionBankService.createQuestion(
      questionBankId as string,
      updatedDto
    );

    console.log("-response", response);
    if (response?.success) {
      showSuccessNotificationFunction("Tạo câu hỏi thành công");
      handleQuestionCreateSuccess?.(response);
      handleClose?.();
    }
  });

  const handleUpdate = handleSubmit(async (dto: any) => {
    const updatedDto: any = {};

    console.log("-ddddd", dto);

    if (dto.text !== undefined) {
      updatedDto.text = tiptapQuestionContent;
    }

    if (dto.answerShort !== undefined) {
      updatedDto.answerShort = dto.answerShort;
    }

    updatedDto.level = questionLevel;

    const response = await questionBankService.updateQuestion(
      props.questionBankId as string,
      props.questionId as string,
      updatedDto
    );
    if (response?.success) {
      showSuccessNotificationFunction("Cập nhật câu hỏi thành công");
      handleQuestionUpdateSuccess?.(response);
      handleClose?.();
    }
  });

  const getQuestionDetail = async () => {
    const response = await questionBankService.getQuestionDetail(
      questionBankId as string,
      questionId as string
    );
    if (response?.success) {
      console.log("responseQuestion", response);
      reset({ answerShort: response?.answerShort });

      setSelectedLevelQuestion?.(response?.level.toString()!);
      setSelectedTypeQuestion?.(response?.type);
      setTiptapQuestionContent(response?.text);
      setSelectedAnswer(response?.answerShort);
    }
  };

  {
    questionId !== undefined &&
      useEffect(() => {
        getQuestionDetail();
      }, [questionId]);
  }

  return {
    questionType,
    handleCreate,
    handleClose,
    handleTiptapQuestionChange,
    tiptapQuestionContent,
    form,
    selectedAnswer,
    handleUpdate,
  };
};
