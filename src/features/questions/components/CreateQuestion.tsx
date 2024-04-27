import CustomButton from "@/components/base/Button";
import Form from "@/components/base/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { questionSchema } from "../schema";
import { useForm, Controller } from "@/plugins/hook-form";
import { useFieldArray } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { assignmentService } from "@/features/assignments/services/assignment.service";
import { ICreateQuestion } from "../interfaces";
import { useState } from "react";
import { showSuccessNotificationFunction } from "@/common/helpers";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tiptap from "@/components/base/math/Tiptap";
interface Props {
  classId?: string;
  assignmentId?: string;
  isOpenForm: boolean;
  handleClose: () => void;
  handleQuestionCreateSuccess: (data: any) => void;
}

const defaultValues = {
  text: "",
  answers: Array.from({ length: 4 }, () => ({ text: "", isCorrect: false })),
};
const letters = ["A", "B", "C", "D"];
export default function CreateQuestion(props: Props) {
  const { isOpenForm, handleClose, handleQuestionCreateSuccess } = props;
  const [tiptapQuestionContent, setTiptapQuestionContent] = useState("");
  const [tiptapAnswersContent, setTiptapAnswersContent] = useState(
    defaultValues.answers.map((answer) => answer.text)
  );
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(questionSchema),
    defaultValues,
  });

  const handleTiptapQuestionChange = (content: string) => {
    setTiptapQuestionContent(content);
  };

  const handleTiptapAnswersChange = (content: string, index: number) => {
    const updateAnswersText = [...tiptapAnswersContent];
    updateAnswersText[index] = content;
    setTiptapAnswersContent(updateAnswersText);
  };
  const { fields } = useFieldArray<FieldValues["answers"]>({
    control,
    name: "answers",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    console.log("selectedAns", answer);
    // const currentIndex = selectedAnswer.indexOf(answer as never);
    // const newSelectedAnswers = [...selectedAnswer];

    // if (currentIndex === -1) {
    //   newSelectedAnswers.push(answer as never);
    // } else {
    //   newSelectedAnswers.splice(currentIndex, 1);
    // }

    const newSelectedAnswer = [...selectedAnswer];
    if (newSelectedAnswer.includes(answer as never)) {
      const index = newSelectedAnswer.indexOf(answer as never);
      newSelectedAnswer.splice(index, 1);
    } else {
      newSelectedAnswer.push(answer as never);
    }
    setSelectedAnswer(newSelectedAnswer);
  };

  const handleCreate = handleSubmit(async (dto: any) => {
    const updatedDto = {
      ...dto,
      text: tiptapQuestionContent,
      answers: dto.answers.map((answer: any, index: number) => ({
        ...answer,
        text: tiptapAnswersContent[index],
        isCorrect: selectedAnswer.includes(letters[index] as never),
        idx: index,
      })),
    };

    const response = await assignmentService.createAQuestion(
      props.classId as string,
      props.assignmentId as string,
      updatedDto
    );
    if (response?.success) {
      showSuccessNotificationFunction("Tạo câu hỏi thành công");
      handleQuestionCreateSuccess(response);
      handleClose();
    }
  });

  return (
    <Form
      title="Tạo câu hỏi"
      width="70%"
      height="90vh"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
    >
      <Tiptap
        control={control}
        name="text"
        label="Câu hỏi"
        placeholder="Nhập câu hỏi"
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
                      checked={selectedAnswer.includes(letters[index] as never)}
                      onChange={handleChange}
                      value={letters[index]}
                    />
                  }
                  label={`${letters[index]}`}
                />
                // <Checkbox
                //   checked={selectedAnswer === `${letters[index]}`}
                //   onChange={handleChange}
                //   label={`${letters[index]}`}
                // />
              );
            }}
          />

          <Tiptap
            control={control}
            name={`answers[${index}].text`}
            label={`Đáp án ${letters[index]}`}
            placeholder={`Nhập đáp án ${letters[index]}`}
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
          text="Tạo"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleCreate()}
        />
      </div>
    </Form>
  );
}
