import { IAnswer, QuestionType } from "@/features/questions/interfaces";
import { Card, IconButton, Radio, Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import Icon from "@mdi/react";
import {
  mdiCheckCircleOutline,
  mdiCheckboxOutline,
  mdiLeadPencil,
  mdiTrashCan,
} from "@mdi/js";
import { showAlert } from "@/common/helpers";
import OutputTiptap from "./math/OutputTiptap";
import Checkbox from "@mui/material/Checkbox";
interface Props {
  text: string;
  answers: IAnswer[];
  type: QuestionType;
  index?: number;
  id: string;
  handleDelete: (id: string) => void;
  handleUpdate: () => void;
}

export default function CardQuestion({
  type,
  text,
  answers,
  index,
  id,
  handleDelete,
  handleUpdate,
}: Props) {
  const letters = ["A", "B", "C", "D"];

  const handleClickDelete = (id: string) => {
    showAlert({
      title: "Bạn có chắc muốn xóa câu hỏi này",
    }).then((result) => {
      if (result.isConfirmed) {
        return handleDelete(id);
      }
    });
  };

  return (
    <Card className="mt-2  mb-4">
      <div className="w-full  rounded-lg  p-6">
        <div className="mb-3 flex justify-between items-center">
          <div>
            <Chip
              icon={
                <Icon
                  path={
                    type === QuestionType.SINGLE_CHOICE
                      ? mdiCheckCircleOutline
                      : mdiCheckboxOutline
                  }
                  size={1}
                />
              }
              label={
                type === QuestionType.SINGLE_CHOICE
                  ? "Single choice"
                  : "Multiple choice"
              }
              variant="outlined"
              sx={{ color: "#1D8FE4", borderColor: "#1D8FE4", marginLeft: -1 }}
            />
            <Chip
              label="1 điểm"
              variant="outlined"
              sx={{ color: "#ed3a3a", borderColor: "#ed3a3a", marginLeft: 2 }}
            />
          </div>
          <div>
            <Tooltip title="Sửa">
              <IconButton
                sx={{ color: "#e28d0f" }}
                onClick={() => {
                  handleUpdate();
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
          </div>
        </div>
        <div className="text-base pb-4 flex">
          <div className="min-w-20">
            <span className="text-base font-medium mr-1">Câu {index}:</span>{" "}
          </div>
          <OutputTiptap value={text} />
        </div>
        <div className="grid grid-cols-12 gap-4">
          {answers.map((answer, index) => (
            <div key={index} className="mt-6 col-span-3 flex items-center">
              {type === QuestionType.SINGLE_CHOICE ? (
                <Radio checked={answer.isCorrect} />
              ) : (
                <Checkbox checked={answer.isCorrect} />
              )}
              {letters[index]}. <OutputTiptap value={answer.text} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
