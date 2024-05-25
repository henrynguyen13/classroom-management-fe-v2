import { IQuestion, IQuestionBank } from "@/features";
import { NoData } from "@/assets";
import { CardQuestion, Form } from "@/components";
import { useState } from "react";

interface Props {
  isOpenForm: boolean;
  id: string;
  handleClose: () => void;
  questionBank: IQuestionBank;
  questions: IQuestion[];
  totalQuestions: number;
  onAddQuestions: (question: IQuestion) => void;
}
export const QuestionModal = ({
  isOpenForm,
  id,
  handleClose,
  questionBank,
  questions,
  totalQuestions,
  onAddQuestions,
}: Props) => {
  return (
    <Form
      title={`${questionBank?.name} (${totalQuestions})`}
      width="80%"
      height="70vh"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
    >
      {questions?.length > 0 ? (
        <>
          <div className="mt-5 mb-3 text-base font-medium">
            Câu hỏi ({totalQuestions})
          </div>

          {questions.map((question, index) => (
            <div key={index}>
              <CardQuestion
                id={question._id}
                index={index + 1}
                text={question.text}
                answers={question.answers}
                type={question.type}
                level={question.level}
                typeButton="add"
                handleAdd={() => onAddQuestions(question)}
                //   handleDelete={() => handleDelete(question._id)}
                //   handleUpdate={() =>
                //     setIsOpenUpdateQuestionForm({
                //       id: question._id,
                //       state: true,
                //     })
                //   }
              />
            </div>
          ))}
        </>
      ) : (
        <div className="mt-14">
          <img src={NoData} className="h-80 flex my-0 mx-auto" alt="No-data" />
          <div className="mt-4 font-medium text-center">
            Hiện chưa có câu hỏi nào.
          </div>
        </div>
      )}
    </Form>
  );
};
