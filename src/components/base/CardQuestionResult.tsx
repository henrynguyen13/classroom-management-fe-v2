import {
  Card,
  Radio,
  Chip,
  FormControlLabel,
  RadioGroup,
  TextField,
  Checkbox,
} from "@mui/material";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiCheckboxOutline } from "@mdi/js";

import { IAnswer, QuestionType, IResponse } from "@/features";
import { OutputTiptap } from "./math/OutputTiptap";
import { AppStatus } from "./AppStatus";
interface Props {
  type: QuestionType;
  text: string;
  answers?: IAnswer[];
  answerTF?: string;
  answerShort?: string;
  idx: number;
  id: string;
  userAnswer: string[];
  correctAnswer: string[];
}

export const CardQuestionResult = ({
  type,
  text,
  answers,
  answerTF,
  answerShort,
  idx,
  userAnswer,
  correctAnswer,
}: Props) => {
  const letters = ["A", "B", "C", "D"];

  const trueAnswer =
    correctAnswer.length === userAnswer.length &&
    correctAnswer.every((id) => userAnswer.includes(id));

  return (
    <Card className="mt-2  mb-4">
      <div className="w-full  rounded-lg  p-6">
        <div className="mb-3 flex justify-between items-center">
          <div>
            <Chip
              icon={
                <Icon
                  path={
                    type === QuestionType.SINGLE_CHOICE
                      ? mdiCheckCircleOutline
                      : mdiCheckboxOutline
                  }
                  size={1}
                />
              }
              label={
                type === QuestionType.SINGLE_CHOICE
                  ? "Single choice"
                  : "Multiple choice"
              }
              variant="outlined"
              sx={{ color: "#1D8FE4", borderColor: "#1D8FE4", marginLeft: -1 }}
            />
            <Chip
              label="1 điểm"
              variant="outlined"
              sx={{ color: "#ed3a3a", borderColor: "#ed3a3a", marginLeft: 2 }}
            />
          </div>
        </div>
        <AppStatus
          label={`${trueAnswer ? "Đúng" : "Sai"}`}
          backgroundColor={`${trueAnswer ? "#EDFFDF" : "#FBEAEA"}`}
          dotColor={`${trueAnswer ? "#57AA16" : "#D62828"}`}
        />
        {/* <div
          className={
            correctAnswer.length === userAnswer.length &&
            correctAnswer.every((id) => userAnswer.includes(id))
              ? "text-green-600 font-semibold"
              : "text-red font-semibold"
          }
        >
          {correctAnswer.length === userAnswer.length &&
          correctAnswer.every((id) => userAnswer.includes(id))
            ? "Đúng"
            : "Sai"}
        </div> */}
        <div className="flex text-base pb-4 mt-2">
          <span className="text-base font-medium mr-1">Câu {idx + 1}:</span>{" "}
          <OutputTiptap value={text} />
        </div>
        <div className="grid grid-cols-12 gap-4">
          {(type === QuestionType.SINGLE_CHOICE ||
            type === QuestionType.MULTIPLE_CHOICE) &&
            answers?.map((answer, index) => (
              <div key={index} className="mt-6 col-span-3 flex items-center">
                {type === QuestionType.SINGLE_CHOICE ? (
                  // <Radio checked={answer.isCorrect} />
                  <Radio checked={userAnswer?.includes(answer?._id!)} />
                ) : (
                  // <Checkbox checked={answer.isCorrect} />
                  <Checkbox checked={userAnswer?.includes(answer?._id!)} />
                )}
                {letters[index]}. <OutputTiptap value={answer.text} />
              </div>
            ))}

          {type === QuestionType.TRUE_FALSE && (
            <RadioGroup
              row
              defaultValue={userAnswer[0] === answerTF}
              className="mb-[20px]"
            >
              <FormControlLabel
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    marginRight: "20px",
                  },
                }}
                value="Đúng"
                control={<Radio />}
                label="Đúng"
                checked={answerTF === "Đúng"}
              />
              <FormControlLabel
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                  },
                }}
                value="Sai"
                control={<Radio />}
                label="Sai"
                checked={answerTF === "Sai"}
              />
            </RadioGroup>
          )}

          {type === QuestionType.SHORT_ANSWER && (
            <TextField value={userAnswer[0]} />
          )}
        </div>
      </div>
    </Card>
  );
};
