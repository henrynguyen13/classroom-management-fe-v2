import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiLoginVariant, mdiTrashCan } from "@mdi/js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";

import {
  isAdminOrAffair,
  showAlert,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  IStudent,
  ICommonListQuery,
} from "@/common";
import { NoData } from "@/assets";
import { CustomButton } from "@/components";
import { classService, IClass } from "@/features";
import { AddStudentToClass } from "./AddStudentToClass";

interface Props {
  id: string;
  students: IStudent[];
  total: number;
  allStudents: IStudent[];
  setStudents: (e: any) => void;
  updateStudentList?: () => void;
}
export const StudentList = ({
  id,
  students,
  total,
  allStudents,
  updateStudentList,
  setStudents,
}: Props) => {
  const navigate = useNavigate();

  const [isOpenAddStudent, setIsOpenAddStudent] = useState(false);
  const rowsPerPage = 10;
  const [page, setPage] = useState(0);

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    const query: ICommonListQuery = {
      page: newPage + 1,
      limit: rowsPerPage,
    };
    const response = await classService.getClassDetail(id as string, query);

    setStudents(response?.class?.users);
  };
  const handleClickDelete = (id: string) => {
    showAlert({
      title: "Bạn có chắc muốn xóa học sinh này ra khỏi lớp học",
    }).then((result) => {
      if (result.isConfirmed) {
        return handleDelete(id);
      }
    });
  };

  const handleDelete = async (studentId: string) => {
    const response = await classService.deleteFromClass(id, studentId);
    if (response?.success) {
      showSuccessNotificationFunction("Xóa học sinh thành công");
      if (updateStudentList) {
        updateStudentList();
        handleChangePage(null, 0);
      }
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra. Vui lòng kiểm tra lại");
    }
  };

  const isAdminOrAffairRole = isAdminOrAffair();
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-black">Danh sách học sinh </div>
        {isAdminOrAffairRole && (
          <CustomButton
            onClick={() => {
              setIsOpenAddStudent(true);
            }}
            text="Thêm học sinh vào lớp"
          ></CustomButton>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div>Tổng số: {total} học sinh</div>
        <TablePagination
          sx={{
            "& .MuiTablePagination-selectLabel": {
              display: "none",
            },
            "& .MuiTablePagination-input": {
              display: "none",
            },
            "& .MuiButtonBase-root:hover": {
              backgroundColor: "#1D8FE4",
              opacity: 0.8,
              color: "#FFFFFF",
            },
          }}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          labelDisplayedRows={({ page, count }: any) => {
            const totalPages = count !== 0 ? Math.ceil(count / rowsPerPage) : 1;
            return `Trang ${page + 1}/${totalPages} `;
          }}
        />
      </div>
      <TableContainer
        sx={{
          maxHeight: "70vh",
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#E1E3E9",
            borderRadius: 2,
          },
        }}
        component={Paper}
      >
        <Table
          sx={{
            minWidth: 650,
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
              <TableCell sx={{ backgroundColor: "#e3e1e1" }} width="5%">
                STT
              </TableCell>

              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="20%"
                align="center"
              >
                Tên học sinh
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="25%"
                align="center"
              >
                Email
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="25%"
                align="center"
              >
                Mã học sinh
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="25%"
                align="center"
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.length > 0 ? (
              students.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell width="5%">{index + 1}</TableCell>

                  <TableCell
                    width="20%"
                    align="left"
                    sx={{ "&:hover": { cursor: "pointer", opacity: 0.7 } }}
                    onClick={() => navigate(`/users/${user._id}`)}
                  >
                    <div className="flex flex-start items-center text-sm">
                      <Avatar
                        sx={{ marginRight: 1, width: 32, height: 32 }}
                        src={
                          user?.avatar
                            ? user?.avatar
                            : `/src/assets/images/no-avatar/webp`
                        }
                      />
                      {user.username}
                    </div>
                  </TableCell>
                  <TableCell width="25%" align="center">
                    {user.email}
                  </TableCell>
                  <TableCell width="25%" align="center" padding="none">
                    <Chip
                      label={user.code}
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
                  <TableCell width="25%" align="center" padding="none">
                    {isAdminOrAffairRole && (
                      <Tooltip title="Xóa">
                        <IconButton
                          sx={{ color: "#ED3A3A" }}
                          onClick={() => handleClickDelete(user._id)}
                        >
                          <Icon path={mdiTrashCan} size={1} />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Tooltip title="Xem chi tiết">
                      <IconButton
                        onClick={() => navigate(`/users/${user._id}`)}
                      >
                        <Icon path={mdiLoginVariant} size={1} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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

      <AddStudentToClass
        handleClose={() => setIsOpenAddStudent(false)}
        id={id}
        isOpenForm={isOpenAddStudent}
        updateStudentList={updateStudentList}
        studentsInClass={allStudents}
      />
    </>
  );
};
