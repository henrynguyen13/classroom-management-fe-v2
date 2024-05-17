import { useEffect, useState } from "react";
import { useFieldArray, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControlLabel, Radio } from "@mui/material";

import { LEVEL_QUESTION, showSuccessNotificationFunction } from "@/common";
import { CustomButton, Dropdown, Form, Tiptap } from "@/components";
import { assignmentService, questionBankService } from "@/features";
import { useForm, Controller } from "@/plugins";
import { questionSchema, IUpdateQuestion, QuestionType } from "../index";
interface Props {
  classId?: string;
  assignmentId?: string;
  questionId: string;
  questionBankId: string;
  isOpenForm: { id: string; state: boolean };
  handleClose: () => void;
  handleUpdateSuccess: (data: any) => void;
}

const letters = ["A", "B", "C", "D"];
const defaultValues = {
  level: "",
  text: "",
  answers: Array.from({ length: 4 }, (_, index) => ({
    text: "",
    isCorrect: false,
  })),
};
export const UpdateQuestion = (props: Props) => {
  const {
    isOpenForm,
    questionId,
    questionBankId,
    handleClose,
    handleUpdateSuccess,
  } = props;

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [tiptapQuestionContent, setTiptapQuestionContent] = useState("");

  const [tiptapAnswersContent, setTiptapAnswersContent] = useState(
    defaultValues.answers.map((answer) => answer.text)
  );

  const handleTiptapQuestionChange = (content: string) => {
    setTiptapQuestionContent(content);
  };

  const handleTiptapAnswersChange = (content: string, index: number) => {
    const updateAnswersText = [...tiptapAnswersContent];
    updateAnswersText[index] = content;
    setTiptapAnswersContent(updateAnswersText);
  };
  const getQuestionDetail = async () => {
    const response = await questionBankService.getQuestionDetail(
      questionBankId as string,
      questionId as string
    );
    if (response?.success) {
      const correctAnswerIndices = response.answers
        .map((answer, index) => (answer.isCorrect ? index : -1))
        .filter((index) => index !== -1);
      defaultValues.level = response?.level.toString();
      setTiptapQuestionContent(response?.text);
      setTiptapAnswersContent(response?.answers.map((answer) => answer.text));
      setSelectedAnswers(correctAnswerIndices.map((index) => letters[index]));
    }
  };
  useEffect(() => {
    getQuestionDetail();
  }, []);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(questionSchema),
    defaultValues,
  });

  const { fields } = useFieldArray<FieldValues["answers"]>({
    control,
    name: "answers",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLetter = event.target.value;
    setSelectedAnswers((prevSelected) =>
      prevSelected.includes(selectedLetter)
        ? prevSelected.filter((letter) => letter !== selectedLetter)
        : [...prevSelected, selectedLetter]
    );
  };

  const handleUpdate = handleSubmit(async (dto: any) => {
    const updatedDto: IUpdateQuestion = {};

    if (dto.text !== undefined) {
      updatedDto.text = tiptapQuestionContent;
    }

    if (dto.answers !== undefined) {
      updatedDto.answers = dto.answers.map((answer: any, index: number) => ({
        ...answer,
        text: tiptapAnswersContent[index],
        isCorrect: selectedAnswers.includes(letters[index]),
      }));
    }

    if (selectedAnswers.length > 1) {
      updatedDto.type = QuestionType.MULTIPLE_CHOICE;
    } else {
      updatedDto.type = QuestionType.SINGLE_CHOICE;
    }

    const response = await questionBankService.updateQuestion(
      props.questionBankId as string,
      props.questionId as string,
      updatedDto
    );
    if (response?.success) {
      showSuccessNotificationFunction("Cập nhật câu hỏi thành công");
      handleUpdateSuccess(response);
      handleClose();
    }
  });

  return (
    <Form
      title="Chỉnh sửa câu hỏi"
      width="70%"
      height="90vh"
      isOpenForm={isOpenForm.state}
      handleClose={handleClose}
    >
      <Dropdown
        control={control}
        placeholder="Chọn mức độ"
        name="level"
        options={LEVEL_QUESTION}
        label="Mức độ câu hỏi"
      />
      <Tiptap
        control={control}
        name="text"
        label="Câu hỏi"
        value={tiptapQuestionContent}
        onChange={handleTiptapQuestionChange}
      />

      {fields.map((field, index) => (
        <>
          <Controller
            control={control}
            name={`answers[${index}].isCorrect` as never}
            render={() => {
              return (
                // <Radio
                //   checked={selectedAnswer === `${letters[index]}`}
                //   onChange={handleChange}
                //   value={`${letters[index]}`}
                // />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedAnswers.includes(letters[index])}
                      onChange={handleChange}
                      value={letters[index]}
                    />
                  }
                  label={`${letters[index]}`}
                />
              );
            }}
          />

          <Tiptap
            control={control}
            name={`answers[${index}].text`}
            label={`Đáp án ${letters[index]}`}
            value={tiptapAnswersContent[index]}
            onChange={(content: string) =>
              handleTiptapAnswersChange(content, index)
            }
          />
        </>
      ))}

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
          text="Sửa"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleUpdate()}
        />
      </div>
    </Form>
  );
};
