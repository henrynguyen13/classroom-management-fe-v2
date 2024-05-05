import { useState } from "react";
import { Radio } from "@mui/material";

import { IQuestion } from "@/features";
import { OutputTiptap } from "./math/OutputTiptap";
interface Props {
  currentIndex: number;
  question: IQuestion;
  onAnswerSelected: (currentIndex: number, selectedAnswer: string) => void;
}

export const CardQuestionTest = ({
  question,
  currentIndex,
  onAnswerSelected,
}: Props) => {
  const letters = ["A", "B", "C", "D"];

  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLetter = event.target.value;
    const updateSelectedAnswer = [...selectedAnswer];
    updateSelectedAnswer[currentIndex] = selectedLetter;
    setSelectedAnswer(updateSelectedAnswer);

    onAnswerSelected(currentIndex, event.target.value);
  };

  const handleCardClick = (selectedLetter: string) => {
    const updateSelectedAnswer = [...selectedAnswer];
    updateSelectedAnswer[currentIndex] = selectedLetter;
    setSelectedAnswer(updateSelectedAnswer);

    onAnswerSelected(currentIndex, selectedLetter);
  };

  return (
    <div>
      <div className="border-solid border-2 rounded items-center cursor-pointer mb-4 mt-2  ">
        <div className="w-full  rounded-lg  p-6">
          <div className="flex text-base pb-4">
            <span className="text-base font-medium mr-1">
              Câu {currentIndex + 1}:
            </span>{" "}
            <OutputTiptap value={question?.text ?? ""} />
          </div>
        </div>
      </div>

      <div>
        {question?.answers.map((answer, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(`${letters[index]}`)}
            className={`flex border-solid border-2 rounded items-center cursor-pointer my-4 p-3 ${
              selectedAnswer[currentIndex] ===
              `${letters[index] ? "border-[#1D8FE4]" : "border-gray-400"} `
            }`}
          >
            <Radio
              checked={selectedAnswer[currentIndex] === `${letters[index]}`}
              onChange={handleChange}
              value={`${letters[index]}`}
            />{" "}
            <span className="mr-1">{letters[index]}.</span>{" "}
            <OutputTiptap value={answer.text} />
          </div>
        ))}
      </div>
    </div>
  );
};
