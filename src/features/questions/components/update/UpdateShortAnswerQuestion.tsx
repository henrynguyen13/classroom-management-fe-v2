import { CustomButton, InputText, Tiptap } from "@/components";

import { IQuestionProps } from "../../interfaces";
import { useFunctionShortAnswer } from "@/features";

export const UpdateShortAnswerQuestion = (props: IQuestionProps) => {
  const {
    form,
    handleTiptapQuestionChange,
    handleClose,
    handleUpdate,
    tiptapQuestionContent,
  } = useFunctionShortAnswer(props);

  const { control } = form;
  return (
    <>
      <Tiptap
        control={control}
        name="text"
        label="Câu hỏi"
        placeholder="Nhập câu hỏi"
        value={tiptapQuestionContent}
        onChange={handleTiptapQuestionChange}
      />

      <InputText
        control={control}
        name="answerShort"
        value="answerShort"
        label="Đáp án"
        placeholder="Nhập đáp án"
        width="500"
      />

      <div className="flex justify-end mt-10">
        <CustomButton
          text="Hủy"
          backgroundColor="grey"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleClose?.()}
        />
        <span className="mr-3"></span>
        <CustomButton
          text="Tạo"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleUpdate()}
        />
      </div>
    </>
  );
};
