import { Tooltip } from "antd";
import { IReviewProps } from "../../interface";
import { Add } from "@/assets";
import { useNavigate } from "react-router-dom";

export const ReviewFolder = (props?: IReviewProps) => {
  const navigate = useNavigate();
  const { review } = props!;
  return (
    <div>
      <div className="w-full bg-neutral-6 my-3 p-2 border-l-primary-1 border-l-8 font-medium flex justify-between items-center">
        {review?.name}
        <Tooltip title="Thêm" placement="right">
          <img
            className="cursor-pointer hover:opacity-70 relative mt-2"
            src={Add}
            onClick={() => navigate(`/reviews/${review?._id}`)}
            alt="Add icon"
          />
        </Tooltip>
      </div>
      {review?.section &&
        review?.section.length > 0 &&
        review?.section.map((sec) => (
          <div className="ml-4 my-3 hover:opacity-90 cursor-pointer">
            {sec?.name}
          </div>
        ))}
    </div>
  );
};
