import { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  IQuestion,
  QuestionType,
  selectSelectedAnswer,
  setSelectAnswer,
} from "@/features";
import { OutputTiptap } from "./math/OutputTiptap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/plugins";

export interface ISelectAnswer {
  currentIndex: number;
  answers: string[];
}

interface Props {
  currentIndex: number;
  question: IQuestion;
  type?: string;
  onAnswerSelected: (currentIndex: number, selectedAnswer: string[]) => void;
}

export const CardQuestionTest = ({
  question,
  currentIndex,
  type,
  onAnswerSelected,
}: Props) => {
  // const [selectedAnswer, setSelectedAnswer] = useState<ISelectAnswer[]>([]);

  const dispatch = useDispatch();
  const selectedAnswer = useAppSelector(selectSelectedAnswer) ?? [];
  // const selec
  // useEffect(() => {
  //   const existingAnswer = selectedAnswer?.find(
  //     (answer) => answer.currentIndex === currentIndex
  //   );
  //   if (existingAnswer) {
  //     dispatch(
  //       setSelectAnswer((prev: any) =>
  //         prev?.map((answer: any) =>
  //           answer.currentIndex === currentIndex ? existingAnswer : answer
  //         )
  //       )
  //     );
  //   } else {
  //     dispatch(
  //       setSelectAnswer((prev: any) => [...prev, { currentIndex, answers: [] }])
  //     );
  //   }
  // }, [currentIndex]);

  useEffect(() => {
    const existingAnswer = selectedAnswer.find(
      (answer) => answer.currentIndex === currentIndex
    );
    if (!existingAnswer) {
      dispatch(
        setSelectAnswer([...selectedAnswer, { currentIndex, answers: [] }])
      );
    }
  }, [currentIndex]);

  const handleChangeMultipleChoiceAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    answerId: string
  ) => {
    // console.log("selectedAnswer", selectedAnswer);
    let updatedSelectedAnswer = selectedAnswer?.map((answer) => {
      if (answer.currentIndex === currentIndex) {
        let updatedAnswers = [...answer.answers];
        if (type === QuestionType.MULTIPLE_CHOICE) {
          if (event.target.checked) {
            updatedAnswers.push(answerId);
          } else {
            updatedAnswers = updatedAnswers.filter((id) => id !== answerId);
          }
        } else {
          updatedAnswers = [answerId];
        }
        return { ...answer, answers: updatedAnswers };
      }
      return answer;
    });

    dispatch(setSelectAnswer(updatedSelectedAnswer));
    const currentAnswer = updatedSelectedAnswer?.find(
      (answer) => answer.currentIndex === currentIndex
    );
    console.log("-updatedSelectedAnswer", updatedSelectedAnswer);
    onAnswerSelected(currentIndex, currentAnswer?.answers || []);
  };

  // const handleCardClick = (answerId: string) => {
  //   let updatedSelectedAnswer = selectedAnswer.map((answer) => {
  //     if (answer.currentIndex === currentIndex) {
  //       let updatedAnswers = [...answer.answers];
  //       if (type === QuestionType.MULTIPLE_CHOICE) {
  //         if (updatedAnswers.includes(answerId)) {
  //           updatedAnswers = updatedAnswers.filter((id) => id !== answerId);
  //         } else {
  //           updatedAnswers.push(answerId);
  //         }
  //       } else {
  //         updatedAnswers = [answerId];
  //       }
  //       return { ...answer, answers: updatedAnswers };
  //     }
  //     return answer;
  //   });

  //   setSelectedAnswer(updatedSelectedAnswer);
  //   const currentAnswer = updatedSelectedAnswer.find(
  //     (answer) => answer.currentIndex === currentIndex
  //   );
  //   onAnswerSelected(currentIndex, currentAnswer?.answers || []);
  // };

  const currentAnswers =
    selectedAnswer?.find((answer) => answer.currentIndex === currentIndex)
      ?.answers || [];

  const handleChangeShortAnswer = (value: string) => {
    let updatedSelectedAnswer = selectedAnswer.map((answer) => {
      if (answer.currentIndex === currentIndex) {
        return { ...answer, answers: [value] };
      }
      return answer;
    });

    dispatch(setSelectAnswer(updatedSelectedAnswer));
    console.log("-updatedSelectedAnswer", updatedSelectedAnswer);

    onAnswerSelected(currentIndex, [value]);
  };

  const handleChangeTrueFalse = (value: string) => {
    let updatedSelectedAnswer = selectedAnswer.map((answer) => {
      if (answer.currentIndex === currentIndex) {
        return { ...answer, answers: [value] };
      }
      return answer;
    });

    dispatch(setSelectAnswer(updatedSelectedAnswer));
    console.log("-updatedSelectedAnswer", updatedSelectedAnswer);

    onAnswerSelected(currentIndex, [value]);
  };

  return (
    <div>
      <div className="border-solid border-2 rounded items-center cursor-pointer mb-4 mt-2">
        <div className="w-full rounded-lg p-6">
          <div className="flex text-base pb-4">
            <span className="text-base font-medium mr-1">
              Câu {currentIndex + 1}:
            </span>
            <OutputTiptap value={question?.text ?? ""} />
          </div>
        </div>
      </div>

      <div>
        {(type === QuestionType.MULTIPLE_CHOICE ||
          type === QuestionType.SINGLE_CHOICE) && (
          <>
            {question?.answers.map((answer, index) => (
              <div
                key={answer?._id}
                // onClick={() => handleCardClick(answer._id!)}
                className={`flex border-solid border-2 rounded items-center cursor-pointer my-4 p-3 ${
                  currentAnswers.includes(answer._id!)
                    ? "border-[#1D8FE4]"
                    : "border-gray-400"
                }`}
              >
                {type === QuestionType.MULTIPLE_CHOICE && (
                  <Checkbox
                    checked={currentAnswers.includes(answer._id!)}
                    onChange={(event) => {
                      handleChangeMultipleChoiceAnswer(event, answer._id!);
                      console.log("-event", event);
                      console.log("-answerId", answer._id!);
                    }}
                    value={answer._id}
                  />
                )}

                {type === QuestionType.SINGLE_CHOICE && (
                  <Radio
                    checked={currentAnswers.includes(answer._id!)}
                    onChange={(event) =>
                      handleChangeMultipleChoiceAnswer(event, answer._id!)
                    }
                    value={answer._id}
                  />
                )}

                <span className="mr-1">{String.fromCharCode(65 + index)}.</span>
                <OutputTiptap value={answer.text} />
              </div>
            ))}
          </>
        )}

        {type === QuestionType.SHORT_ANSWER && (
          <>
            <div className="italic">Nhập đáp án bên dưới</div>

            <div className="py-3">
              <TextField
                value={currentAnswers[0] || ""}
                onChange={(event: any) =>
                  handleChangeShortAnswer(event.target.value)
                }
              />
            </div>
          </>
        )}
        {type === QuestionType.TRUE_FALSE && (
          <RadioGroup
            row
            className="mb-[20px]"
            value={currentAnswers[0] || ""}
            onChange={(event: any) => handleChangeTrueFalse(event.target.value)}
          >
            <FormControlLabel value="Đúng" control={<Radio />} label="Đúng" />
            <FormControlLabel value="Sai" control={<Radio />} label="Sai" />
          </RadioGroup>
        )}
      </div>
    </div>
  );
};
