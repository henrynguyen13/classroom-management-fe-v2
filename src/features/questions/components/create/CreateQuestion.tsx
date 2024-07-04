import {
  LEVEL_QUESTION,
  ScreenType,
  TYPE_QUESTION,
  useBreakpoint,
} from "@/common";
import { CustomDropdown, Form } from "@/components";

import { QuestionType } from "../../index";
import {
  CreateMultipleChoiceQuestion,
  CreateTrueFalseQuestion,
  CreateShortAnswerQuestion,
} from ".";

import { useFunctionQuestion } from "@/features";

interface Props {
  classId?: string;
  assignmentId?: string;
  questionBankId?: string;
  isOpenForm: boolean;
  handleClose: () => void;
  handleQuestionCreateSuccess: (data: any) => void;
}

export const CreateQuestion = (props: Props) => {
  const {
    isOpenForm,
    questionBankId,
    handleClose,
    handleQuestionCreateSuccess,
  } = props;
  const { isLg } = useBreakpoint(ScreenType.LG);

  const {
    selectedTypeQuestion,
    selectedLevelQuestion,
    handleChangeLevelQuestion,
    handleChangeTypeQuestion,
  } = useFunctionQuestion();

  // const [selectedTypeQuestion, setSelectedTypeQuestion] = useState(
  //   TYPE_QUESTION?.[0]?.id
  // );

  // const [selectedLevelQuestion, setSelectedLevelQuestion] = useState(
  //   LEVEL_QUESTION?.[0]?.id
  // );

  return (
    <Form
      title="Tạo câu hỏi"
      width={isLg ? "70%" : "90%"}
      height="90vh"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
    >
      <CustomDropdown
        placeholder="Chọn mức độ"
        name="level"
        // onChange={(_, value: any) => {
        //   setSelectedLevelQuestion(value?.id);
        // }}
        value={{
          id: selectedLevelQuestion,
          label: LEVEL_QUESTION.find(
            (level) => level?.id === selectedLevelQuestion
          )?.label!,
        }}
        onChange={handleChangeLevelQuestion}
        options={LEVEL_QUESTION}
        label="Mức độ câu hỏi"
      />
      <CustomDropdown
        placeholder="Chọn loại câu hỏi"
        name="type"
        options={TYPE_QUESTION}
        // onChange={(_, value: any) => {
        //   setSelectedTypeQuestion(value?.id);
        // }}
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
        onChange={handleChangeTypeQuestion}
        defaultValue={TYPE_QUESTION[0]}
        label="Chọn loại câu hỏi"
      />
      {selectedTypeQuestion === QuestionType.MULTIPLE_CHOICE && (
        <CreateMultipleChoiceQuestion
          questionType={selectedTypeQuestion}
          handleQuestionCreateSuccess={handleQuestionCreateSuccess}
          questionLevel={selectedLevelQuestion}
          questionBankId={questionBankId}
          handleClose={handleClose}
        />
      )}

      {selectedTypeQuestion === QuestionType.TRUE_FALSE && (
        <CreateTrueFalseQuestion
          questionType={selectedTypeQuestion}
          handleQuestionCreateSuccess={handleQuestionCreateSuccess}
          questionLevel={selectedLevelQuestion}
          questionBankId={questionBankId}
          handleClose={handleClose}
        />
      )}

      {selectedTypeQuestion === QuestionType.SHORT_ANSWER && (
        <CreateShortAnswerQuestion
          questionType={selectedTypeQuestion}
          handleQuestionCreateSuccess={handleQuestionCreateSuccess}
          questionLevel={selectedLevelQuestion}
          questionBankId={questionBankId}
          handleClose={handleClose}
        />
      )}
    </Form>
  );
};
