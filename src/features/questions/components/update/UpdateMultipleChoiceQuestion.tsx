import { Checkbox, FormControlLabel } from "@mui/material";

import { Controller } from "@/plugins";
import { CustomButton, Tiptap } from "@/components";
import { IQuestionProps } from "../../interfaces";

import { useFunctionMultipleChoice } from "@/features";

export const UpdateMultipleChoiceQuestion = (props: IQuestionProps) => {
  const {
    form,
    letters,
    selectedAnswer,
    tiptapQuestionContent,
    handleChange,
    handleClose,
    handleTiptapQuestionChange,
    handleTiptapAnswersChange,
    tiptapAnswersContent,
    handleUpdate,
    fields,
  } = useFunctionMultipleChoice(props);

  const { control } = form;
  return (
    <>
      <Tiptap
        control={control}
        name="text"
        value={tiptapQuestionContent}
        label="Câu hỏi"
        placeholder="Nhập câu hỏi"
        onChange={handleTiptapQuestionChange}
      />

      {fields.map((field, index) => (
        <div key={index}>
          <Controller
            control={control}
            name={`answers[${index}].isCorrect` as never}
            render={() => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedAnswer.includes(letters[index] as never)}
                      onChange={handleChange}
                      value={letters[index]}
                    />
                  }
                  label={`${letters[index]}`}
                />
              );
            }}
          />

          <Tiptap
            control={control}
            value={tiptapAnswersContent[index]}
            name={`answers[${index}].text`}
            label={`Đáp án ${letters[index]}`}
            placeholder={`Nhập đáp án ${letters[index]}`}
            onChange={(content: string) =>
              handleTiptapAnswersChange(content, index)
            }
          />
        </div>
      ))}

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
