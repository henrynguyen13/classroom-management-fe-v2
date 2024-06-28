import { Form } from "@/components";
import { ImportQuestions } from "./ImportQuestion";

interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  questionBankId: string;
  handleQuestionCreateSuccess: (data: any) => void;
}

export const ImportQuestionForm = (props: Props) => {
  const {
    isOpenForm,
    handleClose,
    questionBankId,
    handleQuestionCreateSuccess,
  } = props;

  return (
    <Form
      title="Tạo ngân hàng câu hỏi"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
      width="90vw"
      height="700px"
    >
      <a
        target="_blank"
        className="cursor-pointer opacity-90 text-primary-1 underline float-right"
        href="https://docs.google.com/document/d/1JB5DggDfeYwDuaYYJwEAnSkKTcd4oFXDBrUdKsCkYV0/edit?usp=sharing"
      >
        Tải file mẫu
      </a>

      <ImportQuestions
        handleClose={handleClose}
        questionBankId={questionBankId}
        handleQuestionCreateSuccess={handleQuestionCreateSuccess}
      />
    </Form>
  );
};
