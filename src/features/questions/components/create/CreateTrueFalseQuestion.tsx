import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

import { Controller } from "@/plugins";
import { CustomButton, Tiptap } from "@/components";
import { IQuestionProps } from "../../interfaces";
import { useFunctionTrueFalse } from "@/features";

export const CreateTrueFalseQuestion = (props: IQuestionProps) => {
  const { handleCreate, handleTiptapQuestionChange, handleClose, form } =
    useFunctionTrueFalse(props);

  const { control } = form;
  return (
    <>
      <Tiptap
        control={control}
        name="text"
        label="Câu hỏi"
        placeholder="Nhập câu hỏi"
        onChange={handleTiptapQuestionChange}
      />

      <Controller
        control={control}
        name={"answerTF" as never}
        render={({ field }) => (
          <RadioGroup row {...field} defaultValue="Đúng" className="mb-[20px]">
            <FormControlLabel
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  marginRight: "20px",
                },
              }}
              value="Đúng"
              control={<Radio />}
              label="Đúng"
            />
            <FormControlLabel
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                },
              }}
              value="Sai"
              control={<Radio />}
              label="Sai"
            />
          </RadioGroup>
        )}
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
          onClick={() => handleCreate()}
        />
      </div>
    </>
  );
};
