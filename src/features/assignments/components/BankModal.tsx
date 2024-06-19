import { NoData } from "@/assets";
import { ICommonListQuery } from "@/common";
import { Form } from "@/components";
import {
  IQuestion,
  IQuestionBank,
  QuestionModal,
  questionBankService,
} from "@/features";
import { useEffect, useState } from "react";

interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  onAddQuestions: (question: IQuestion) => void;
}
export const BankModal = ({
  isOpenForm,
  handleClose,
  onAddQuestions,
}: Props) => {
  const [questionBankList, setQuestionBankList] = useState<IQuestionBank[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isOpenQuestionModal, setIsOpenQuestionModal] = useState(false);
  const [currentId, setCurrentId] = useState<string>("");

  //Question Bank detail
  const [questionBank, setQuestionBank] = useState<IQuestionBank>();
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const getQuestionBankList = async (query: ICommonListQuery) => {
    const response = await questionBankService.getAllQuestionBanks(query);
    setQuestionBankList(response.data?.items);
    setTotalItems(response.data?.totalItems);
  };

  const getQuestionBankById = async () => {
    const response = await questionBankService.getQuestionBankById(currentId!);
    if (response?.success) {
      setQuestionBank(response?.data);
      setTotalQuestions(response?.totalQuestions);
      setQuestions(response?.data?.questions);
    }
  };

  useEffect(() => {
    getQuestionBankList({});
  }, []);

  useEffect(() => {
    getQuestionBankById();
  }, [currentId]);

  return (
    <div>
      <Form
        title={`Ngân hàng câu hỏi (${totalItems})`}
        width="70%"
        height="70vh"
        isOpenForm={isOpenForm}
        handleClose={handleClose}
      >
        {questionBankList?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {questionBankList.map((row) => (
              <div
                key={row?._id}
                onClick={() => {
                  setIsOpenQuestionModal(true), setCurrentId(row?._id);
                }}
                className="border border-l-[8px] border-l-[#1D8FE4] rounded-[8px] p-4 cursor-pointer hover:opacity-80"
              >
                <div className="font-medium h-[48px]">{row.name}</div>
                <div>Số lượng câu hỏi: {row.questions.length}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="block mx-auto">
            <img
              src={NoData}
              className="h-80 flex my-0 mx-auto"
              alt="No-data"
            />
            <div className="mt-2 font-medium text-center">
              Hiện chưa có ngân hàng câu hỏi nào.
            </div>
          </div>
        )}
      </Form>
      <QuestionModal
        id={currentId}
        isOpenForm={isOpenQuestionModal}
        handleClose={() => setIsOpenQuestionModal(false)}
        questions={questions}
        questionBank={questionBank!}
        totalQuestions={totalQuestions}
        onAddQuestions={onAddQuestions}
      />
    </div>
  );
};
