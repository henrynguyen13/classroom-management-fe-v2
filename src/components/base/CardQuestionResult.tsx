import { IAnswer, QuestionType } from "@/features/questions/interfaces";
import { Card, Radio } from "@mui/material";
import Chip from "@mui/material/Chip";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiCheckboxOutline } from "@mdi/js";
import { IResponse } from "@/features/responses/interfaces";
import OutputTiptap from "./math/OutputTiptap";
interface Props {
  type: QuestionType;
  text: string;
  answers: IAnswer[];
  idx: number;
  id: string;
  studentAnswer: IResponse[];
}

export default function CardQuestionResult({
  type,
  text,
  answers,
  idx,
  studentAnswer,
}: Props) {
  const letters = ["A", "B", "C", "D"];

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
        <div
          className={
            studentAnswer[idx]?.isCorrect
              ? "text-green-600 font-semibold"
              : "text-red font-semibold"
          }
        >
          {studentAnswer[idx] === null
            ? "Sai. Học sinh chưa chọn đáp án."
            : studentAnswer[idx]?.isCorrect
            ? "Đúng"
            : "Sai"}
        </div>
        <div className="flex text-base pb-4">
          <span className="text-base font-medium mr-1">Câu {idx + 1}:</span>{" "}
          <OutputTiptap value={text} />
        </div>
        <div className="grid grid-cols-12 gap-4 ">
          {answers.map((answer, index) => (
            <div key={index} className="mt-6 col-span-3">
              {
                type === QuestionType.SINGLE_CHOICE ? (
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: answer.isCorrect ? "green" : "red",
                      },
                    }}
                    checked={
                      studentAnswer[idx]?.userAnswer === letters[index] ||
                      answer.isCorrect
                    }
                  />
                ) : null
                // <Checkbox
                //   checked={
                //     studentAnswer[idx]?.includes() === letters[index] ||
                //     answer.isCorrect
                //   }
                // />
              }
              {letters[index]}. <OutputTiptap value={answer.text} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
