import CustomButton from "@/components/base/Button";
import Form from "@/components/base/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { questionSchema } from "../schema";
import { useForm, Controller } from "@/plugins/hook-form";
import { useFieldArray } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { assignmentService } from "@/features/assignments/services/assignment.service";
import { IUpdateQuestion } from "../interfaces";
import { useEffect, useState } from "react";
import { showSuccessNotificationFunction } from "@/common/helpers";
import { Radio } from "@mui/material";
import Tiptap from "@/components/base/math/Tiptap";
interface Props {
  classId?: string;
  assignmentId?: string;
  questionId?: string;
  isOpenForm: { id: string; state: boolean };
  handleClose: () => void;
  handleUpdateSuccess: (data: any) => void;
}

const letters = ["A", "B", "C", "D"];
const defaultValues = {
  text: "",
  answers: Array.from({ length: 4 }, (_, index) => ({
    text: "",
    isCorrect: false,
  })),
};
export default function UpdateQuestion(props: Props) {
  const {
    isOpenForm,
    classId,
    assignmentId,
    questionId,
    handleClose,
    handleUpdateSuccess,
  } = props;

  const [selectedAnswer, setSelectedAnswer] = useState("");
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
  useEffect(() => {
    const getAQuestionDetail = async () => {
      const response = await assignmentService.getAQuestionDetail(
        classId as string,
        assignmentId as string,
        questionId as string
      );
      if (response?.success) {
        const correctAnswerIndex = response.answers.findIndex(
          (answer) => answer.isCorrect
        );
        setTiptapQuestionContent(response?.text);
        setTiptapAnswersContent(response?.answers.map((answer) => answer.text));
        if (correctAnswerIndex !== -1) {
          setSelectedAnswer(letters[correctAnswerIndex]);
        }
      }
    };
    getAQuestionDetail();
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
    setSelectedAnswer(selectedLetter);
  };

  const handleUpdate = handleSubmit(async (dto: IUpdateQuestion) => {
    const updatedDto: IUpdateQuestion = {};

    if (dto.text !== undefined) {
      updatedDto.text = tiptapQuestionContent;
    }

    if (dto.answers !== undefined) {
      updatedDto.answers = dto.answers.map((answer, index) => ({
        ...answer,
        text: tiptapAnswersContent[index],
        isCorrect: selectedAnswer === letters[index],
      }));
    }

    const response = await assignmentService.updateAQuestion(
      props.classId as string,
      props.assignmentId as string,
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
                <Radio
                  checked={selectedAnswer === `${letters[index]}`}
                  onChange={handleChange}
                  value={`${letters[index]}`}
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
}
