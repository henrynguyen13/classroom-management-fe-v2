// import { useEffect, useState } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useFieldArray, FieldValues } from "react-hook-form";

// import { useForm } from "@/plugins";
// import { showSuccessNotificationFunction } from "@/common";
// import {
//   questionBankService,
//   IQuestionProps,
//   questionSchema,
// } from "@/features";

// export const useFunctionMultipleChoice = (props: IQuestionProps) => {
//   const {
//     questionType,
//     questionLevel,
//     questionBankId,
//     questionId,
//     handleQuestionCreateSuccess,
//     handleQuestionUpdateSuccess,
//     handleClose,
//     setSelectedLevelQuestion,
//     setSelectedTypeQuestion,
//   } = props;
//   const letters = ["A", "B", "C", "D"];

//   const form = useForm({
//     resolver: yupResolver(questionSchema),
//     defaultValues: {
//       answers: Array.from({ length: 4 }, () => ({
//         text: "",
//         isCorrect: false,
//       })),
//     },
//   });
//   const { control, handleSubmit, reset } = form;
//   const [tiptapQuestionContent, setTiptapQuestionContent] = useState("");

//   const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
//   const [tiptapAnswersContent, setTiptapAnswersContent] = useState(
//     Array.from({ length: 4 }, () => ({ text: "", isCorrect: false })).map(
//       (answer) => answer.text
//     )
//   );

//   const handleTiptapAnswersChange = (content: string, index: number) => {
//     const updateAnswersText = [...tiptapAnswersContent];
//     updateAnswersText[index] = content;
//     setTiptapAnswersContent(updateAnswersText);
//   };

//   const handleTiptapQuestionChange = (content: string) => {
//     setTiptapQuestionContent(content);
//   };

//   const { fields } = useFieldArray<FieldValues["answers"]>({
//     control,
//     name: "answers",
//   });

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const answer = event.target.value;
//     const newSelectedAnswer = [...selectedAnswer];
//     if (newSelectedAnswer.includes(answer as never)) {
//       const index = newSelectedAnswer.indexOf(answer as never);
//       newSelectedAnswer.splice(index, 1);
//     } else {
//       newSelectedAnswer.push(answer as never);
//     }
//     setSelectedAnswer(newSelectedAnswer);
//   };

//   const handleCreate = handleSubmit(async (dto: any) => {
//     const updatedDto = {
//       ...dto,
//       text: tiptapQuestionContent,
//       type: questionType,
//       level: questionLevel,
//       answers: dto.answers.map((answer: any, index: number) => ({
//         ...answer,
//         text: tiptapAnswersContent[index],
//         isCorrect: selectedAnswer.includes(letters[index] as never),
//         idx: index,
//       })),
//     };
//     console.log("-dto", dto);

//     const response = await questionBankService.createQuestion(
//       questionBankId as string,
//       updatedDto
//     );

//     console.log("-response", response);
//     if (response?.success) {
//       showSuccessNotificationFunction("Tạo câu hỏi thành công");
//       handleQuestionCreateSuccess?.(response);
//       handleClose?.();
//     }
//   });

//   const handleUpdate = handleSubmit(async (dto: any) => {
//     const updatedDto: any = {};

//     if (dto.text !== undefined) {
//       updatedDto.text = tiptapQuestionContent;
//     }

//     if (dto.answers !== undefined) {
//       updatedDto.answers = dto.answers.map((answer: any, index: number) => ({
//         ...answer,
//         text: tiptapAnswersContent[index],
//         isCorrect: selectedAnswer.includes(letters[index]),
//       }));
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
//       const correctAnswerIndices = response.answers
//         .map((answer, index) => (answer.isCorrect ? index : -1))
//         .filter((index) => index !== -1);
//       // defaultValues.level = response?.level.toString();

//       // reset({ level: response?.level.toString() });
//       setSelectedLevelQuestion?.(response?.level.toString()!);
//       setSelectedTypeQuestion?.(response?.type);
//       setTiptapQuestionContent(response?.text);
//       setTiptapAnswersContent(response?.answers.map((answer) => answer.text));
//       setSelectedAnswer(correctAnswerIndices.map((index) => letters[index]));
//     }
//   };

//   {
//     questionId !== undefined &&
//       useEffect(() => {
//         getQuestionDetail();
//       }, [questionId]);
//   }

//   return {
//     questionType,
//     handleCreate,
//     handleChange,
//     handleTiptapQuestionChange,
//     handleTiptapAnswersChange,
//     handleClose,
//     handleUpdate,
//     fields,
//     form,
//     letters,
//     selectedAnswer,
//     tiptapQuestionContent,
//     tiptapAnswersContent,
//   };
// };

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, FieldValues } from "react-hook-form";

import { useForm } from "@/plugins";
import { showSuccessNotificationFunction } from "@/common";
import {
  questionBankService,
  IQuestionProps,
  questionSchema,
} from "@/features";

export const useFunctionMultipleChoice = (props: IQuestionProps) => {
  const {
    questionType,
    questionLevel,
    questionBankId,
    questionId,
    handleQuestionCreateSuccess,
    handleQuestionUpdateSuccess,
    handleClose,
    setSelectedLevelQuestion,
    setSelectedTypeQuestion,
  } = props;

  const form = useForm({
    resolver: yupResolver(questionSchema),
    defaultValues: {
      answers: Array.from({ length: 4 }, () => ({
        text: "",
        isCorrect: false,
      })),
    },
  });
  const { control, handleSubmit } = form;
  const [tiptapQuestionContent, setTiptapQuestionContent] = useState("");

  const [selectedAnswer, setSelectedAnswer] = useState<number[]>([]);
  const [tiptapAnswersContent, setTiptapAnswersContent] = useState(
    Array.from({ length: 4 }, () => ({ text: "", isCorrect: false })).map(
      (answer) => answer.text
    )
  );

  const handleTiptapAnswersChange = (content: string, index: number) => {
    const updateAnswersText = [...tiptapAnswersContent];
    updateAnswersText[index] = content;
    setTiptapAnswersContent(updateAnswersText);
  };

  const handleTiptapQuestionChange = (content: string) => {
    setTiptapQuestionContent(content);
  };

  const { fields } = useFieldArray<FieldValues["answers"]>({
    control,
    name: "answers",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(event.target.value, 10);
    const newSelectedAnswer = [...selectedAnswer];
    if (newSelectedAnswer.includes(index)) {
      const i = newSelectedAnswer.indexOf(index);
      newSelectedAnswer.splice(i, 1);
    } else {
      newSelectedAnswer.push(index);
    }
    setSelectedAnswer(newSelectedAnswer);
  };

  const handleCreate = handleSubmit(async (dto: any) => {
    const updatedDto = {
      ...dto,
      text: tiptapQuestionContent,
      type: questionType,
      level: questionLevel,
      answers: dto.answers.map((answer: any, index: number) => ({
        ...answer,
        text: tiptapAnswersContent[index],
        isCorrect: selectedAnswer.includes(index),
        idx: index,
      })),
    };

    const response = await questionBankService.createQuestion(
      questionBankId as string,
      updatedDto
    );

    if (response?.success) {
      showSuccessNotificationFunction("Tạo câu hỏi thành công");
      handleQuestionCreateSuccess?.(response);
      setSelectedLevelQuestion?.(null);
      setSelectedTypeQuestion?.(null);
      handleClose?.();
    }
  });

  const handleUpdate = handleSubmit(async (dto: any) => {
    const updatedDto: any = {};

    if (dto.text !== undefined) {
      updatedDto.text = tiptapQuestionContent;
    }

    if (dto.answers !== undefined) {
      updatedDto.answers = dto.answers.map((answer: any, index: number) => ({
        ...answer,
        text: tiptapAnswersContent[index],
        isCorrect: selectedAnswer.includes(index),
      }));
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
      const correctAnswerIndices = response.answers
        .map((answer, index) => (answer.isCorrect ? index : -1))
        .filter((index) => index !== -1);

      setSelectedLevelQuestion?.(response?.level.toString()!);
      setSelectedTypeQuestion?.(response?.type);
      setTiptapQuestionContent(response?.text);
      setTiptapAnswersContent(response?.answers.map((answer) => answer.text));
      setSelectedAnswer(correctAnswerIndices);
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
    handleChange,
    handleTiptapQuestionChange,
    handleTiptapAnswersChange,
    handleClose,
    handleUpdate,
    fields,
    form,
    selectedAnswer,
    tiptapQuestionContent,
    tiptapAnswersContent,
  };
};
