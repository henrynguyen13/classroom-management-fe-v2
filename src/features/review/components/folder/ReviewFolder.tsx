import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { Add, QuestionTest, Document, Pdf } from "@/assets";
import { IReviewProps, Section_Type } from "../../interface";
import { IconButton } from "@mui/material";
import Icon from "@mdi/react";
import { mdiLeadPencil, mdiTrashCan } from "@mdi/js";
import { ROLES, Roles, showAlert } from "@/common";
import { UpdateFolder } from "./UpdateFolder";

export const ReviewFolder = (props?: any) => {
  const navigate = useNavigate();
  const { review, classId, handleDelete, openUpdateForm, role } = props;

  const handleClickDelete = (id: string) => {
    showAlert({
      title: "Bạn có chắc muốn xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        if (handleDelete) {
          return handleDelete(id);
        }
      }
    });
  };
  return (
    <div>
      <div className="w-full bg-neutral-7 my-3 px-2 py-1 border-l-primary-1 border-l-8 rounded-l-sm font-medium flex justify-between items-center ">
        <p className="ml-2">{review?.name}</p>
        {role === ROLES.TEACHER && (
          <div className="flex">
            <Tooltip title="Sửa">
              <IconButton
                sx={{ color: "#e28d0f" }}
                onClick={() => openUpdateForm(review?._id)}
              >
                <Icon path={mdiLeadPencil} size={1} />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Xóa">
            <IconButton
              sx={{ color: "#ED3A3A" }}
              onClick={() => {
                handleClickDelete(id);
              }}
            >
              <Icon path={mdiTrashCan} size={1} />
            </IconButton>
          </Tooltip> */}
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
        )}
      </div>
      {review?.sections &&
        review?.sections.length > 0 &&
        review?.sections.map((section: any) => (
          <div className="ml-5 hover:opacity-90 py-2 px-5 cursor-pointer rounded hover:text-red hover:bg-neutral-7">
            <div className="flex items-center justify-between">
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
                <span
                  onClick={() =>
                    navigate(
                      `/classes/${classId}/reviews/${review?._id}/sections/${section?._id}`
                    )
                  }
                  className="ml-3"
                >
                  {section?.name}
                </span>
              </div>

              {role === ROLES.TEACHER && (
                <Tooltip title="Xóa" placement="right">
                  <IconButton
                    sx={{ color: "#e28d0f" }}
                    onClick={() => handleClickDelete(section?._id)}
                  >
                    <Icon path={mdiTrashCan} size={1} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
