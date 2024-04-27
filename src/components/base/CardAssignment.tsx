import { Card } from "@mui/material";
import CustomButton from "./Button";
interface Props {
  title: string;
  count: number;
}

export default function CardAssignment({ title, count }: Props) {
  return (
    <Card>
      <div className="w-full  rounded-lg  p-8 ">
        <div className="text-xl pb-8">{title}</div>
        <div className="border-[1px] border-border"></div>
        <div>Bài tập về nhà gồm {count} câu hỏi</div>

        <CustomButton text="Bắt đầu làm bài" />
      </div>
    </Card>
  );
}
