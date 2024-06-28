import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { questionBankService, IQuestionBank } from "..";
import { CardQuestion, CustomButton } from "@/components";
import { IQuestion, CreateQuestion, UpdateQuestion } from "@/features";
import React from "react";
import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
} from "@/common";
import { NoData } from "@/assets";
import { ImportQuestionForm } from "../components/ImportQuestionForm";

export const QuestionBankDetailPage = () => {
  const { id } = useParams();
  const [questionBank, setQuestionBank] = useState<IQuestionBank>();
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [isOpenCreateQuestionForm, setIsOpenCreateQuestionForm] =
    useState(false);
  const [isOpenImportForm, setIsOpenImportForm] = useState(false);

  const [isOpenUpdateQuestionForm, setIsOpenUpdateQuestionForm] = useState<{
    id: string;
    state: boolean;
  }>({ id: "", state: false });
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const getQuestionBankById = async () => {
    const response = await questionBankService.getQuestionBankById(id!);
    if (response?.success) {
      setQuestionBank(response?.data);
      setTotalQuestions(response?.totalQuestions);
      setQuestions(response?.data?.questions);
    }
  };

  const handleDelete = async (questionId: string) => {
    const response = await questionBankService.deleteQuestion(
      id as string,
      questionId
    );
    if (response?.success) {
      showSuccessNotificationFunction("Xóa câu hỏi thành công");
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
      );
      setTotalQuestions((prevTotal) => prevTotal - 1);
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra. Vui lòng kiểm tra lại");
    }
  };
  const handleQuestionCreateSuccess = (newQuestion: IQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setTotalQuestions((prevTotal) => prevTotal + 1);
  };
  const handleQuestionUpdateSuccess = (updatedQuestion: IQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === updatedQuestion._id ? updatedQuestion : question
      )
    );
  };
  useEffect(() => {
    getQuestionBankById();
  }, [id]);
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2>Ngân hàng câu hỏi: {questionBank?.name} </h2>
          <h3>Mô tả: {questionBank?.description} </h3>
        </div>
        <div className="flex">
          <div className="mr-2">
            <CustomButton
              onClick={() => setIsOpenImportForm(true)}
              text="Tải file lên"
              width="160"
            />
          </div>
          <CustomButton
            onClick={() => setIsOpenCreateQuestionForm(true)}
            text="Tạo câu hỏi mới"
          />
        </div>
      </div>

      {questions.length > 0 ? (
        <>
          <div className="mt-5 mb-3 text-base font-medium">
            Câu hỏi ({totalQuestions})
          </div>

          {questions.map((question, index) => (
            <React.Fragment key={index}>
              <div key={index}>
                <CardQuestion
                  id={question._id}
                  index={index + 1}
                  text={question.text}
                  answers={question?.answers}
                  answerTF={question?.answerTF}
                  answerShort={question?.answerShort}
                  type={question.type}
                  level={question.level}
                  handleDelete={() => handleDelete(question._id)}
                  handleUpdate={() =>
                    setIsOpenUpdateQuestionForm({
                      id: question._id,
                      state: true,
                    })
                  }
                />
              </div>

              {isOpenUpdateQuestionForm.state &&
                isOpenUpdateQuestionForm.id === question._id && (
                  <UpdateQuestion
                    isOpenForm={isOpenUpdateQuestionForm}
                    handleClose={() =>
                      setIsOpenUpdateQuestionForm({
                        id: question._id,
                        state: false,
                      })
                    }
                    questionId={question._id as string}
                    questionBankId={id as string}
                    handleUpdateSuccess={handleQuestionUpdateSuccess}
                  />
                )}
            </React.Fragment>
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

      {isOpenCreateQuestionForm && (
        <CreateQuestion
          isOpenForm={isOpenCreateQuestionForm}
          handleClose={() => setIsOpenCreateQuestionForm(false)}
          handleQuestionCreateSuccess={handleQuestionCreateSuccess}
          questionBankId={id as string}
        />
      )}

      <ImportQuestionForm
        handleQuestionCreateSuccess={handleQuestionCreateSuccess}
        questionBankId={id!}
        isOpenForm={isOpenImportForm}
        handleClose={() => setIsOpenImportForm(false)}
      />
    </>
  );
};
