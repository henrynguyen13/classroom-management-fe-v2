import { useEffect, useState } from "react";

import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tooltip,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  TablePagination,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Icon from "@mdi/react";
import {
  mdiLeadPencil,
  mdiTrashCan,
  mdiCircleSmall,
  mdiLoginVariant,
  mdiLockOpenVariantOutline,
  mdiLockOutline,
} from "@mdi/js";

import {
  convertStatusClass,
  ROWS_PER_PAGE,
  showAlert,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  ICommonListQuery,
} from "@/common";
import { NoData } from "@/assets/icons";
import CustomButton from "@/components/base/Button";
import CreateClass from "./CreateClass";
import UpdateClass from "./UpdateClass";
import { IClass } from "../interfaces";
import { ClassStatus } from "../constants";
import { classService } from "../services/class.service";
import { useNavigate } from "react-router-dom";

export default function ClassListPage() {
  const navigate = useNavigate();

  const [classList, setClassList] = useState<IClass[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [currentId, setCurrentId] = useState("");
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const rowsPerPage = ROWS_PER_PAGE;

  useEffect(() => {
    async function getClassList(query: ICommonListQuery) {
      const response = await classService.getAllClasses(query);
      setClassList(response.data?.items);
      setTotalItems(response.data?.totalItems);
    }
    getClassList({});
  }, []);

  const updateClassList = async () => {
    const query: ICommonListQuery = {
      page: page + 1,
      limit: rowsPerPage,
    };
    const response = await classService.getAllClasses(query);
    setClassList(response.data?.items);
    setTotalItems(response.data?.totalItems);
  };
  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    const query: ICommonListQuery = {
      page: newPage + 1,
      limit: rowsPerPage,
    };
    const response = await classService.getAllClasses(query);
    setClassList(response.data.items);
  };

  const handleClickDelete = (id: string) => {
    showAlert({
      title: "Bạn có chắc muốn xóa lớp học này",
    }).then((result) => {
      if (result.isConfirmed) {
        return handleDelete(id);
      }
    });
  };

  const handleDelete = async (id: string) => {
    const response = await classService.delete(id);
    if (response?.success) {
      showSuccessNotificationFunction("Xóa lớp học thành công");
      updateClassList();
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra. Vui lòng kiểm tra lại");
    }
  };

  const handleClickOpen = (id: string) => {
    showAlert({
      title: "Bạn có chắc muốn mở lớp học này",
      text: "",
    }).then((result) => {
      if (result.isConfirmed) {
        return handleOpen(id);
      }
    });
  };

  const handleOpen = async (id: string) => {
    const response = await classService.openClass(id);
    if (response?.success) {
      showSuccessNotificationFunction("Mở lớp học thành công");
      updateClassList();
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra. Vui lòng kiểm tra lại");
    }
  };

  const handleClickClose = (id: string) => {
    showAlert({
      title: "Bạn có chắc muốn đóng lớp học này",
    }).then((result) => {
      if (result.isConfirmed) {
        return handleClose(id);
      }
    });
  };

  const handleClose = async (id: string) => {
    const response = await classService.closeClass(id);
    if (response?.success) {
      showSuccessNotificationFunction("Đóng lớp học thành công");
      updateClassList();
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra. Vui lòng kiểm tra lại");
    }
  };

  const convertStatusColor = (status: string) => {
    return status === ClassStatus.CREATED
      ? "#FA8C16"
      : status === ClassStatus.OPENING
      ? "#52C41A"
      : "#D9D9D9";
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <OutlinedInput
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "8px !important",
            },
            "& .MuiInputBase-input": {
              padding: "12px",
            },
          }}
          id="outlined-adornment-search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          placeholder="Tìm kiếm"
        />
        <div>
          <CustomButton
            onClick={() => setIsOpenCreateForm(true)}
            text="Tạo mới"
            width="100"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>Tổng số: {totalItems} lớp học</div>
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
                width="10%"
                align="center"
              >
                Mã lớp học
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="15%"
                align="center"
              >
                Tên lớp học
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="25%"
                align="center"
              >
                Giáo viên
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="25%"
                align="center"
              >
                Lịch học
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
                width="10%"
                align="center"
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classList?.length > 0 ? (
              classList.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell width="5%">{index + 1}</TableCell>
                  <TableCell padding="none" width="10%" align="center">
                    {row.code ? (
                      <Chip
                        sx={{ backgroundColor: "#1D8FE4", color: "#ffffff" }}
                        label={row.code}
                      />
                    ) : null}
                  </TableCell>
                  <TableCell width="15%" align="center">
                    {row.name}
                  </TableCell>
                  <TableCell width="25%" align="center">
                    <div className="line-clamp-2 text-sm">
                      {row.teacher.username}
                    </div>
                  </TableCell>
                  <TableCell width="20%" align="center">
                    {row.description.map((i, index) => (
                      <li className="text-sm" key={index}>
                        Từ {i.from} đến {i.to} {i.date}
                      </li>
                    ))}
                  </TableCell>
                  <TableCell padding="none" width="15%" align="center">
                    <div className="flex items-center">
                      <Icon
                        color={convertStatusColor(row.status)}
                        path={mdiCircleSmall}
                        size={1.2}
                      />
                      <div className="text-sm mr-2">
                        {convertStatusClass(row.status)}
                      </div>

                      {row.status === ClassStatus.CREATED && (
                        <Tooltip title="Mở lớp học">
                          <IconButton
                            sx={{ color: "#e28d0f" }}
                            onClick={() => {
                              handleClickOpen(row._id);
                            }}
                          >
                            <Icon path={mdiLockOutline} size={1} />
                          </IconButton>
                        </Tooltip>
                      )}

                      {row.status === ClassStatus.OPENING && (
                        <Tooltip title="Đóng lớp học">
                          <IconButton
                            sx={{ color: "#e28d0f" }}
                            onClick={() => {
                              handleClickClose(row._id);
                            }}
                          >
                            <Icon path={mdiLockOpenVariantOutline} size={1} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell padding="none" width="10%" align="center">
                    <div className="flex justify-center">
                      <Tooltip title="Sửa">
                        <IconButton
                          sx={{ color: "#e28d0f" }}
                          onClick={() => {
                            setIsOpenUpdateForm(true), setCurrentId(row._id);
                          }}
                        >
                          <Icon path={mdiLeadPencil} size={1} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton
                          sx={{ color: "#ED3A3A" }}
                          onClick={() => handleClickDelete(row._id)}
                        >
                          <Icon path={mdiTrashCan} size={1} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xem chi tiết">
                        <IconButton
                          onClick={() => navigate(`/classes/${row._id}`)}
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
                <TableCell colSpan={7} align="center">
                  <img
                    src={NoData}
                    className="h-80 flex my-0 mx-auto"
                    alt="No-data"
                  />
                  <div className="mt-2 font-medium">
                    Hiện chưa có lớp học nào.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateClass
        isOpenForm={isOpenCreateForm}
        handleClose={() => setIsOpenCreateForm(false)}
        updateClassList={updateClassList}
      />

      <UpdateClass
        classId={currentId}
        isOpenForm={isOpenUpdateForm}
        handleClose={() => setIsOpenUpdateForm(false)}
        updateClassList={updateClassList}
      />
    </div>
  );
}
