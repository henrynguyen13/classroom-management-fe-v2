import {
  Card,
  IconButton,
  Radio,
  Tooltip,
  Chip,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import Icon from "@mdi/react";
import {
  mdiCheckCircleOutline,
  mdiCheckboxOutline,
  mdiLeadPencil,
  mdiTrashCan,
  mdiPlus,
} from "@mdi/js";

import { LEVEL_QUESTION, showAlert } from "@/common";
import { IAnswer, QuestionType } from "@/features";
import { OutputTiptap } from "./math/OutputTiptap";
import { useLocation } from "react-router-dom";
import { InputText } from "./InputText";
interface Props {
  text: string;
  answers?: IAnswer[];
  answerTF?: string;
  answerShort?: string;
  type: QuestionType;
  index?: number;
  id: string;
  level?: string;
  handleDelete?: (id: string) => void;
  handleUpdate?: () => void;
  handleAdd?: () => void;
  typeButton?: string;
}

export const CardQuestion = ({
  type,
  text,
  answers,
  answerTF,
  answerShort,
  index,
  id,
  level,
  typeButton,
  handleDelete,
  handleUpdate,
  handleAdd,
}: Props) => {
  const location = useLocation();
  const letters = ["A", "B", "C", "D"];

  const handleClickDelete = (id: string) => {
    showAlert({
      title: "Bạn có chắc muốn xóa câu hỏi này",
    }).then((result) => {
      if (result.isConfirmed) {
        if (handleDelete) {
          return handleDelete(id);
        }
      }
    });
  };

  const getTypeQuestion = () => {
    switch (type) {
      case QuestionType.SINGLE_CHOICE:
        return "Trắc nghiệm";
      case QuestionType.MULTIPLE_CHOICE:
        return "Trắc nghiệm nhiều đáp án";
      case QuestionType.TRUE_FALSE:
        return "Trắc nghiệm Đúng/Sai";
      case QuestionType.SHORT_ANSWER:
        return "Câu trả lời ngắn";
    }
  };

  return (
    <Card className="mt-2  mb-4">
      <div className="w-full  rounded-lg  p-6">
        <div className="mb-3 flex justify-between items-center">
          <div>
            <Chip
              label={getTypeQuestion()}
              variant="outlined"
              sx={{ color: "#1D8FE4", borderColor: "#1D8FE4", marginLeft: -1 }}
            />
            <Chip
              label={
                LEVEL_QUESTION.find((i) => i?.id === level?.toString())?.label
              }
              variant="outlined"
              sx={{ color: "#ed3a3a", borderColor: "#ed3a3a", marginLeft: 2 }}
            />
          </div>
          <div>
            {typeButton === "add" && (
              <Tooltip title="Thêm">
                <IconButton
                  sx={{ color: "#e28d0f" }}
                  onClick={() => {
                    if (handleAdd) {
                      handleAdd();
                    }
                  }}
                >
                  <Icon path={mdiPlus} size={1} />
                </IconButton>
              </Tooltip>
            )}
            {typeButton === "delete" && (
              <Tooltip title="Xóa">
                <IconButton
                  sx={{ color: "#e28d0f" }}
                  onClick={() => handleClickDelete(id)}
                >
                  <Icon path={mdiTrashCan} size={1} />
                </IconButton>
              </Tooltip>
            )}
            {!location.pathname.includes("/assignment") && (
              <>
                <Tooltip title="Sửa">
                  <IconButton
                    sx={{ color: "#e28d0f" }}
                    onClick={() => {
                      if (handleUpdate) {
                        handleUpdate();
                      }
                    }}
                  >
                    <Icon path={mdiLeadPencil} size={1} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                  <IconButton
                    sx={{ color: "#ED3A3A" }}
                    onClick={() => {
                      handleClickDelete(id);
                    }}
                  >
                    <Icon path={mdiTrashCan} size={1} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        </div>
        <div className="text-base pb-4 flex">
          <div className="min-w-20">
            <span className="text-base font-medium mr-1">Câu {index}:</span>{" "}
          </div>
          <OutputTiptap value={text} />
        </div>
        <div className="grid grid-cols-12 gap-4">
          {(type === QuestionType.SINGLE_CHOICE ||
            type === QuestionType.MULTIPLE_CHOICE) &&
            answers?.map((answer, index) => (
              <div key={index} className="mt-6 col-span-3 flex items-center">
                {type === QuestionType.SINGLE_CHOICE ? (
                  <Radio checked={answer.isCorrect} />
                ) : (
                  // <Checkbox checked={answer.isCorrect} />
                  <Checkbox checked={answer.isCorrect} />
                )}
                {letters[index]}. <OutputTiptap value={answer.text} />
              </div>
            ))}

          {type === QuestionType.TRUE_FALSE && (
            <RadioGroup row defaultValue={answerTF} className="mb-[20px]">
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
                checked={answerTF === "Đúng"}
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
                checked={answerTF === "Sai"}
              />
            </RadioGroup>
          )}

          {type === QuestionType.SHORT_ANSWER && (
            <TextField value={answerShort} />
          )}
        </div>
      </div>
    </Card>
  );
};
