import { useState } from "react";
import mammoth from "mammoth";
import { CardQuestion, CustomButton } from "@/components";
import { questionBankService } from "../services";
import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  openLoading,
  closeLoading,
} from "@/common";
import { useAppDispatch } from "@/plugins";

interface IProps {
  questionBankId: string;
  handleClose: () => void;
  handleQuestionCreateSuccess: (data: any) => void;
}
export const ImportQuestions = (props: IProps) => {
  const { questionBankId, handleClose, handleQuestionCreateSuccess } = props;
  const [_file, setFile] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const arrayBuffer = event.target.result as any;
        try {
          const result = await mammoth.extractRawText({ arrayBuffer });

          const lines = result.value.split("\n");

          const importedQuestions = [];
          let currentQuestionText = "";
          let currentAnswers: any[] = [];
          let currentLevel = 1;
          let isShortAnswer = false;
          let shortAnswerText = "";

          lines.forEach((line) => {
            if (line.startsWith("Câu ")) {
              if (currentQuestionText !== "") {
                const question = {
                  text: JSON.stringify({
                    type: "doc",
                    content: [
                      {
                        type: "paragraph",
                        content: [
                          { type: "text", text: currentQuestionText.trim() },
                        ],
                      },
                    ],
                  }),
                  answers: isShortAnswer ? [] : currentAnswers,
                  answerShort: isShortAnswer ? shortAnswerText : "",
                  type: isShortAnswer
                    ? "SHORT_ANSWER"
                    : currentAnswers.filter((a) => a.isCorrect).length > 1
                    ? "MULTIPLE_CHOICE"
                    : "SINGLE_CHOICE",
                  level: currentLevel,
                };
                importedQuestions.push(question);
              }
              currentQuestionText = line.replace(/Câu \d+: /, "");
              currentAnswers = [];
              isShortAnswer = false;
              shortAnswerText = "";
            } else if (line.startsWith("Mức độ:")) {
              currentLevel = parseInt(
                line.split(":")[1].trim().replace("/", "")
              );
            } else if (line.startsWith("Đáp án đúng:")) {
              const correctAnswers = line
                .split(":")[1]
                .split(",")
                .map((a) => a.trim().replace(/"/g, ""));
              correctAnswers.forEach((index) => {
                console.log("index", index);
                const idx = parseInt(index) - 1;
                if (!isNaN(idx) && currentAnswers[idx]) {
                  currentAnswers[idx].isCorrect = true;
                } else if (index.startsWith('"') && index.endsWith('"')) {
                  isShortAnswer = true;
                  shortAnswerText = index.slice(1, -1);
                  console.log("shortAnswerText", shortAnswerText);
                }
              });
            } else if (line.trim() !== "") {
              const answerOption = {
                text: JSON.stringify({
                  type: "doc",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: line.trim().replace(/^\d+\//, ""),
                        },
                      ],
                    },
                  ],
                }),
                isCorrect: false,
              };
              currentAnswers.push(answerOption);
            }
          });

          if (currentQuestionText !== "") {
            const question = {
              text: JSON.stringify({
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: currentQuestionText.trim() },
                    ],
                  },
                ],
              }),
              answers: isShortAnswer ? [] : currentAnswers,
              answerShort: isShortAnswer ? shortAnswerText : "",
              type: isShortAnswer
                ? "SHORT_ANSWER"
                : currentAnswers.filter((a) => a.isCorrect).length > 1
                ? "MULTIPLE_CHOICE"
                : "SINGLE_CHOICE",
              level: currentLevel,
            };
            importedQuestions.push(question);
          }

          setQuestions(importedQuestions);
        } catch (e) {
          console.error("Error parsing file", e);
        }
      }
    };

    if (selectedFile) {
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleImport = async () => {
    dispatch(openLoading());
    try {
      const promises = questions.map((question) =>
        questionBankService.createQuestion(questionBankId, question)
      );

      const responses = await Promise.all(promises);

      const successfulQuestions = responses
        .filter((response) => response.success)
        .map((response) => response);

      successfulQuestions.forEach((newQuestion) => {
        handleQuestionCreateSuccess(newQuestion);
      });

      showSuccessNotificationFunction("Tạo câu hỏi thành công");
      handleClose();
    } catch (error) {
      showErrorNotificationFunction("Có lỗi xảy ra, vui lòng kiểm tra lại");
      console.error("Error importing questions:", error);
    } finally {
      dispatch(closeLoading());
    }
  };

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <div>
        {questions.map((question, index) => (
          <CardQuestion
            key={index}
            id={index.toString()}
            index={index + 1}
            text={question.text}
            answers={question.answers}
            answerShort={question.answerShort}
            type={question.type}
            level={question.level}
          />
        ))}
      </div>

      {questions.length > 0 && (
        <div className="flex justify-end">
          <CustomButton text="Tạo" onClick={handleImport} />
        </div>
      )}
    </div>
  );
};
