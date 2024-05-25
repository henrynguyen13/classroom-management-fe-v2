import { LEVEL_QUESTION, TYPE_QUESTION } from "@/common";
import { CustomDropdown, Form } from "@/components";

import { QuestionType, useFunctionQuestion } from "../../index";
import { UpdateMultipleChoiceQuestion } from "./UpdateMultipleChoiceQuestion";
import { UpdateTrueFalseQuestion } from "./UpdateTrueFalseQuestion";
import { UpdateShortAnswerQuestion } from "./UpdateShortAnswerQuestion";

interface Props {
  classId?: string;
  assignmentId?: string;
  questionId: string;
  questionBankId: string;
  isOpenForm: { id: string; state: boolean };
  handleClose: () => void;
  handleUpdateSuccess: (data: any) => void;
}

export const UpdateQuestion = (props: Props) => {
  const {
    isOpenForm,
    questionId,
    questionBankId,
    handleClose,
    handleUpdateSuccess,
  } = props;

  const {
    selectedTypeQuestion,
    selectedLevelQuestion,
    setSelectedLevelQuestion,
    setSelectedTypeQuestion,
    handleChangeLevelQuestion,
  } = useFunctionQuestion();

  return (
    <Form
      title="Chỉnh sửa câu hỏi"
      width="70%"
      height="90vh"
      isOpenForm={isOpenForm.state}
      handleClose={handleClose}
    >
      <CustomDropdown
        placeholder="Chọn mức độ"
        name="level"
        onChange={handleChangeLevelQuestion}
        options={LEVEL_QUESTION}
        value={{
          id: selectedLevelQuestion,
          label: LEVEL_QUESTION.find(
            (level) => level?.id === selectedLevelQuestion
          )?.label!,
        }}
        label="Mức độ câu hỏi"
      />
      <CustomDropdown
        placeholder="Chọn loại câu hỏi"
        name="type"
        options={TYPE_QUESTION}
        value={{
          id:
            selectedTypeQuestion === QuestionType.SINGLE_CHOICE
              ? QuestionType.MULTIPLE_CHOICE
              : selectedTypeQuestion,
          label: TYPE_QUESTION.find(
            (type) =>
              type?.id ===
              (selectedTypeQuestion === QuestionType.SINGLE_CHOICE
                ? QuestionType.MULTIPLE_CHOICE
                : selectedTypeQuestion)
          )?.label!,
        }}
        disabled
        label="Chọn loại câu hỏi"
      />

      {(selectedTypeQuestion === QuestionType.MULTIPLE_CHOICE ||
        selectedTypeQuestion === QuestionType.SINGLE_CHOICE) && (
        <UpdateMultipleChoiceQuestion
          questionType={selectedTypeQuestion}
          handleQuestionUpdateSuccess={handleUpdateSuccess}
          questionLevel={selectedLevelQuestion}
          questionId={questionId}
          questionBankId={questionBankId}
          handleClose={handleClose}
          setSelectedLevelQuestion={setSelectedLevelQuestion}
          setSelectedTypeQuestion={setSelectedTypeQuestion}
        />
      )}

      {selectedTypeQuestion === QuestionType.SHORT_ANSWER && (
        <UpdateShortAnswerQuestion
          questionType={selectedTypeQuestion}
          handleQuestionUpdateSuccess={handleUpdateSuccess}
          questionLevel={selectedLevelQuestion}
          questionId={questionId}
          questionBankId={questionBankId}
          handleClose={handleClose}
          setSelectedLevelQuestion={setSelectedLevelQuestion}
          setSelectedTypeQuestion={setSelectedTypeQuestion}
        />
      )}

      {selectedTypeQuestion === QuestionType.TRUE_FALSE && (
        <UpdateTrueFalseQuestion
          questionType={selectedTypeQuestion}
          handleQuestionUpdateSuccess={handleUpdateSuccess}
          questionLevel={selectedLevelQuestion}
          questionId={questionId}
          questionBankId={questionBankId}
          handleClose={handleClose}
          setSelectedLevelQuestion={setSelectedLevelQuestion}
          setSelectedTypeQuestion={setSelectedTypeQuestion}
        />
      )}
    </Form>
  );
};
