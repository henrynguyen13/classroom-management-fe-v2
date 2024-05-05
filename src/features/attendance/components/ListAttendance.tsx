import { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Chip,
  Typography,
  LinearProgress,
  linearProgressClasses,
  styled,
} from "@mui/material";

import { showSuccessNotificationFunction, IStudent } from "@/common";
import { NoData } from "@/assets";
import { CustomButton } from "@/components";
import { ICreateAttendance, attendanceService } from "../index";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
interface Props {
  classId: string;
  students: IStudent[];
}
export const ListAttendance = ({ classId, students }: Props) => {
  const [changeButton, setChangeButton] = useState<boolean>(false);
  const [attendanceList, setAttendanceList] = useState<ICreateAttendance[]>([]);

  useEffect(() => {
    const getListAttendance = async () => {
      const response = await attendanceService.getAttendanceByClassId(classId);
      if (response.success) {
        setAttendanceList(response?.data.items ?? []);
      }
    };

    getListAttendance();
  }, []);

  const createAttendance = () => {
    setChangeButton((changeButton) => !changeButton);
    setAttendanceList((prevAttendanceList) => [
      ...prevAttendanceList,
      {
        name: dayjs().format("HH:mm DD/MM/YYYY"),
        students: students.map((student) => ({
          ...student,
          attendance: true,
        })),
      },
    ]);
  };

  const updateAttendance = async () => {
    const response = await attendanceService.getAttendanceByClassId(classId);
    if (response?.success) {
      setAttendanceList(response?.data.items ?? []);
    }
  };

  const submitAttendance = async () => {
    if (attendanceList.length > 0) {
      const dto: ICreateAttendance = {
        name: attendanceList[attendanceList.length - 1].name,
        students: attendanceList[attendanceList.length - 1].students,
      };
      const response = await attendanceService.create(dto, classId);
      if (response?.success) {
        setChangeButton((changeButton) => !changeButton);
        showSuccessNotificationFunction("Tạo điểm danh thành công");

        updateAttendance();
      }
    }
  };

  const changeAttendance = (code: string, attendanceIndex: number) => {
    setAttendanceList((prevAttendanceList) => {
      const updatedAttendanceList = [...prevAttendanceList];
      const updatedStudents = { ...updatedAttendanceList[attendanceIndex] };
      updatedStudents.students = updatedStudents.students.map((student) =>
        student.code === code
          ? {
              ...student,
              attendance: !student.attendance,
            }
          : student
      );

      updatedAttendanceList[attendanceIndex] = updatedStudents;
      return updatedAttendanceList;
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>Tổng số: {students.length} học sinh</div>

        {!changeButton ? (
          <CustomButton
            text="Tạo điểm danh"
            width="150"
            onClick={createAttendance}
          />
        ) : (
          <CustomButton text="Lưu" width="100" onClick={submitAttendance} />
        )}
      </div>

      <TableContainer
        sx={{
          maxHeight: "70vh",
          maxWidth: "73vw",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            width: 2,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#E1E3E9",
            borderRadius: 0,
          },
        }}
        component={Paper}
      >
        <Table
          sx={{
            border: "1px solid #ccc",
          }}
          aria-label="sticky table"
          stickyHeader
        >
          <TableHead>
            <TableRow
              sx={{
                color: "#1b1b33",
              }}
            >
              <TableCell
                sx={{ backgroundColor: "#e3e1e1", whiteSpace: "nowrap" }}
                width="5%"
              >
                STT
              </TableCell>

              <TableCell
                sx={{ backgroundColor: "#e3e1e1", whiteSpace: "nowrap" }}
                width="15%"
                align="center"
              >
                Tên học sinh
              </TableCell>

              <TableCell
                sx={{ backgroundColor: "#e3e1e1", whiteSpace: "nowrap" }}
                width="10%"
                align="center"
              >
                Mã học sinh
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1", whiteSpace: "nowrap" }}
                width="15%"
                align="center"
              >
                Thống kê
              </TableCell>
              {attendanceList.length > 0
                ? attendanceList.map((list, index) => (
                    <TableCell
                      key={index}
                      sx={{ backgroundColor: "#e3e1e1" }}
                      width={65 / attendanceList.length + "%"}
                      align="center"
                    >
                      {list.name}
                    </TableCell>
                  ))
                : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{student.username}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={student.code}
                      variant="outlined"
                      sx={{
                        color: "#1D8FE4",
                        borderColor: "#1D8FE4",

                        "&. MuiChip-label": {
                          fontSize: "14px",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <div>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ minWidth: 35, marginRight: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {
                              attendanceList.filter(
                                (list) =>
                                  list.students.find(
                                    (user) => user.code === student.code
                                  )?.attendance === true
                              ).length
                            }{" "}
                            /{attendanceList.length}
                          </Typography>
                        </Box>
                        <Box sx={{ width: "100%", mr: 1 }}>
                          <BorderLinearProgress
                            variant="determinate"
                            value={Math.round(
                              (attendanceList.filter(
                                (list) =>
                                  list.students.find(
                                    (user) => user.code === student.code
                                  )?.attendance === true
                              ).length /
                                attendanceList.length) *
                                100
                            )}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >{`${
                            attendanceList.length === 0
                              ? 0
                              : Math.round(
                                  (attendanceList.filter(
                                    (list) =>
                                      list.students.find(
                                        (user) => user.code === student.code
                                      )?.attendance === true
                                  ).length /
                                    attendanceList.length) *
                                    100
                                )
                          }%`}</Typography>
                        </Box>
                      </Box>
                    </div>
                  </TableCell>
                  {attendanceList.map((list, index) => (
                    <TableCell key={index} align="center">
                      <Button
                        variant="text"
                        onClick={() => changeAttendance(student.code, index)}
                        sx={{
                          color: list.students.find(
                            (user) => user.code === student.code
                          )?.attendance
                            ? "#1D8FE4"
                            : "red",
                        }}
                      >
                        {list.students.find(
                          (user) => user.code === student.code
                        )?.attendance
                          ? "X"
                          : "-"}
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <img
                    src={NoData}
                    className="h-80 flex my-0 mx-auto"
                    alt="No-data"
                  />
                  <div className="mt-2 font-medium">
                    Hiện chưa có học sinh nào.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
