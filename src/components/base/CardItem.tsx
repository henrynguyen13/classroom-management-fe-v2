import {
  Card,
  CardContent,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import Icon from "@mdi/react";
import {
  mdiLeadPencil,
  mdiTrashCan,
  mdiLoginVariant,
  mdiDotsVertical,
} from "@mdi/js";
import dayjs from "dayjs";
import { convertStatusClass } from "@/common";
import { useState } from "react";
import { AppStatus } from ".";
import { AssignmentStatus } from "@/features";

export const CardItem = ({
  classItem,
  onEdit,
  onDelete,
  onViewDetails,
}: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      className="shadow-forumBox"
      sx={{
        borderRadius: 8,
        margin: "16px",
        padding: "8px 16px 16px",
        position: "relative",
        backgroundColor: "white",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ paddingBottom: 1 }}>
          {classItem.name}
        </Typography>

        <AppStatus
          label={convertStatusClass(
            dayjs(classItem.duration[0]).toDate(),
            dayjs(classItem.duration[1]).toDate()
          )}
          backgroundColor={`${
            convertStatusClass(
              dayjs(classItem.duration[0]).toDate(),
              dayjs(classItem.duration[1]).toDate()
            ) === AssignmentStatus.HAPPENNING
              ? "#EDFFDF"
              : "#FBEAEA"
          }`}
          dotColor={`${
            convertStatusClass(
              dayjs(classItem.duration[0]).toDate(),
              dayjs(classItem.duration[1]).toDate()
            ) === AssignmentStatus.HAPPENNING
              ? "#57AA16"
              : "#D62828"
          }`}
        />

        <Typography variant="subtitle1">
          Mã lớp học: {classItem.code}
        </Typography>
        <Typography variant="body2">
          Giáo viên: {classItem.teacher.username}
        </Typography>
        <Typography variant="body2">Lịch học:</Typography>
        <ul className="min-h-[50px]">
          {classItem.description.map((i: any, index: any) => (
            <li key={index}>
              Từ {i.from} đến {i.to} {i.date}
            </li>
          ))}
        </ul>
        <Typography variant="body2">
          Ngày khai giảng: {dayjs(classItem.duration[0]).format("DD/MM/YYYY")}
        </Typography>
        <Typography variant="body2">
          Ngày kết thúc: {dayjs(classItem.duration[1]).format("DD/MM/YYYY")}
        </Typography>

        <div style={{ position: "absolute", top: "16px", right: "16px" }}>
          <IconButton onClick={handleClick}>
            <Icon path={mdiDotsVertical} size={1} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                onEdit();
              }}
            >
              <Icon
                style={{ color: "#e28d0f" }}
                path={mdiLeadPencil}
                size={1}
              />
              &nbsp; Sửa
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                onDelete();
              }}
            >
              <Icon style={{ color: "#ED3A3A" }} path={mdiTrashCan} size={1} />
              &nbsp; Xóa
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                onViewDetails();
              }}
            >
              <Icon path={mdiLoginVariant} size={1} />
              &nbsp; Xem chi tiết
            </MenuItem>
          </Menu>
        </div>
      </CardContent>
    </Card>
  );
};
