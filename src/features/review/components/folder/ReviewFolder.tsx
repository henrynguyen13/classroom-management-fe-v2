import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { Add, QuestionTest, Document, Pdf } from "@/assets";
import { IReviewProps, Section_Type } from "../../interface";

export const ReviewFolder = (props?: IReviewProps) => {
  const navigate = useNavigate();
  const { review, classId } = props!;
  return (
    <div>
      <div className="w-full bg-neutral-7 my-3 px-2 py-1 border-l-primary-1 border-l-8 rounded-l-sm font-medium flex justify-between items-center ">
        <p className="ml-2">{review?.name}</p>
        <Tooltip title="Thêm" placement="right">
          <img
            className="cursor-pointer hover:opacity-70 relative"
            src={Add}
            onClick={() =>
              navigate(`/classes/${classId}/reviews/${review?._id}`)
            }
            alt="Add icon"
          />
        </Tooltip>
      </div>
      {review?.sections &&
        review?.sections.length > 0 &&
        review?.sections.map((section) => (
          <div
            className="ml-5 hover:opacity-90 py-2 px-5 cursor-pointer rounded hover:text-red hover:bg-neutral-7"
            onClick={() =>
              navigate(
                `/classes/${classId}/reviews/${review?._id}/sections/${section?._id}`
              )
            }
          >
            <div className="flex items-center">
              {section?.type === Section_Type.PDF && (
                <img src={Pdf} alt="Pdf" />
              )}
              {section?.type === Section_Type.QUESTION && (
                <img src={QuestionTest} alt="QuestionTest" />
              )}
              {section?.type === Section_Type.TEXT && (
                <img src={Document} alt="Document" />
              )}
              <span className="ml-3">{section?.name}</span>
            </div>
          </div>
        ))}
    </div>
  );
};
