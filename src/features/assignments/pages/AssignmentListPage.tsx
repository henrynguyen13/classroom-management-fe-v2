import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { mdiTrashCan, mdiLoginVariant, mdiCircleSmall } from "@mdi/js";
import Icon from "@mdi/react";

import {
  convertStatusAssignment,
  formatDate,
  isTeacher,
  showAlert,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  ICommonListQuery,
} from "@/common";
import { NoData } from "@/assets";
import { CustomButton } from "@/components";
import {
  assignmentService,
  AssignmentStatus,
  IAssignment,
  CreateAssignment,
  CreateAssignmentPage,
} from "../index";

export const AssignmentListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assignmentList, setAssignmentList] = useState<IAssignment[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isOpenCreateAssignmentForm, setIsOpenCreateAssignmentForm] =
    useState(false);

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    const assignmentList = async () => {
      const response = await assignmentService.getAllAssignments(
        id as string,
        {}
      );
      if (response?.success) {
        setAssignmentList(response?.data.items);
        setTotalItems(response?.data.totalItems);
      }
    };
    assignmentList();
  }, [id]);

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    const query: ICommonListQuery = {
      page: newPage + 1,
      limit: rowsPerPage,
    };
    const response = await assignmentService.getAllAssignments(
      id as string,
      query
    );
    setAssignmentList(response.data.items);
  };

  const updateAssignmentList = async () => {
    const query: ICommonListQuery = {
      page: page + 1,
      limit: rowsPerPage,
    };
    const response = await assignmentService.getAllAssignments(
      id as string,
      query
    );
    setAssignmentList(response.data?.items);
    setTotalItems(response.data?.totalItems);
  };
  const handleClickDelete = (id: string) => {
    showAlert({
      title: "Bạn có chắc muốn xóa bài tập này",
    }).then((result) => {
      if (result.isConfirmed) {
        return handleDelete(id);
      }
    });
  };

  const handleDelete = async (assignmentId: string) => {
    const response = await assignmentService.delete(id as string, assignmentId);
    if (response?.success) {
      showSuccessNotificationFunction("Xóa bài tập thành công");
      updateAssignmentList();
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra. Vui lòng kiểm tra lại");
    }
  };

  const convertStatusColor = (status: string) => {
    return status === AssignmentStatus.HAPPENNING ? "#008000" : "#ed3a3a";
  };

  const isTeacherRole = isTeacher();
  return (
    <div>
      <div className="flex justify-end mb-4">
        {isTeacherRole && (
          <div>
            <CustomButton
              onClick={() => navigate(`/classes/${id}/assignment`)}
              text="Tạo mới"
              width="100"
            />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div>Tổng số: {totalItems} bài tập</div>

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
          count={totalItems}
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
                Tên bài tập
              </TableCell>

              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="25%"
                align="center"
              >
                Ngày tạo
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="25%"
                align="center"
              >
                Ngày hết hạn
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="10%"
                align="left"
              >
                Trạng thái
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="15%"
                align="center"
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignmentList?.length > 0 ? (
              assignmentList.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell width="5%">{index + 1}</TableCell>

                  <TableCell
                    width="15%"
                    align="center"
                    sx={{ "&:hover": { cursor: "pointer", opacity: 0.7 } }}
                    onClick={() =>
                      navigate(`/classes/${id}/assignment/${row._id}`)
                    }
                  >
                    <div className="line-clamp-2">{row.name}</div>
                  </TableCell>

                  <TableCell width="20%" align="center">
                    {formatDate(row.createdAt)}
                  </TableCell>
                  <TableCell width="20%" align="center">
                    {formatDate(row.expiredAt)}
                  </TableCell>

                  <TableCell padding="none" width="15%" align="center">
                    <div className="flex items-center">
                      <Icon
                        color={convertStatusColor(
                          convertStatusAssignment(row.expiredAt)
                        )}
                        path={mdiCircleSmall}
                        size={1.2}
                      />
                      <div className="text-sm mr-2">
                        {convertStatusAssignment(row.expiredAt)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell padding="none" width="10%" align="center">
                    <div className="flex justify-center">
                      {isTeacherRole && (
                        <Tooltip title="Xóa">
                          <IconButton
                            sx={{ color: "#ED3A3A" }}
                            onClick={() => handleClickDelete(row._id)}
                          >
                            <Icon path={mdiTrashCan} size={1} />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Xem chi tiết">
                        <IconButton
                          onClick={() =>
                            navigate(`/classes/${id}/assignment/${row._id}`)
                          }
                        >
                          <Icon path={mdiLoginVariant} size={1} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <img
                    src={NoData}
                    className="h-80 flex my-0 mx-auto"
                    alt="No-data"
                  />
                  <div className="mt-2 font-medium">
                    Hiện chưa có bài tập nào.
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
