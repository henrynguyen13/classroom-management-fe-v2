import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "@/plugins";
import { questionBankService } from "@/features";
import { showSuccessNotificationFunction } from "@/common";
import { IQuestionProps, questionSchema } from "../../index";

export const useFunctionTrueFalse = (props: IQuestionProps) => {
  const {
    questionType,
    questionLevel,
    questionBankId,
    questionId,
    setSelectedLevelQuestion,
    setSelectedTypeQuestion,
    handleQuestionUpdateSuccess,
    handleQuestionCreateSuccess,
    handleClose,
  } = props;
  const form = useForm({
    resolver: yupResolver(questionSchema),
    defaultValues: {
      answerTF: "Đúng",
    },
  });

  const { handleSubmit, reset } = form;
  const [tiptapQuestionContent, setTiptapQuestionContent] = useState("");
  // const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleTiptapQuestionChange = (content: string) => {
    setTiptapQuestionContent(content);
  };

  const handleCreate = handleSubmit(async (dto: any) => {
    const updatedDto = {
      ...dto,
      text: tiptapQuestionContent,
      type: questionType,
      level: questionLevel,
      answerTF: dto.answerTF,
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

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedAnswer(event.target.value);
  // };

  const handleUpdate = handleSubmit(async (dto: any) => {
    const updatedDto: any = {};

    if (dto.text !== undefined) {
      updatedDto.text = tiptapQuestionContent;
    }

    if (dto.answerTF !== undefined) {
      updatedDto.answerTF = dto.answerTF;
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

      reset({ answerTF: response?.answerTF });
      setSelectedLevelQuestion?.(response?.level.toString()!);
      setSelectedTypeQuestion?.(response?.type);
      setTiptapQuestionContent(response?.text);
      // setSelectedAnswer(response?.answerTF);
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
    // handleChange,
    handleUpdate,
    handleTiptapQuestionChange,
    // selectedAnswer,
    tiptapQuestionContent,
    form,
  };
};
