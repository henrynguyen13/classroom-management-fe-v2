import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import Icon from "@mdi/react";
import { mdiLeadPencil, mdiTrashCan, mdiLoginVariant } from "@mdi/js";

import {
  convertStatusClass,
  ROWS_PER_PAGE,
  showAlert,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  ICommonListQuery,
  openLoading,
  closeLoading,
  useBreakpoint,
  ScreenType,
} from "@/common";
import { NoData } from "@/assets";
import { AppStatus, CardItem, CustomButton } from "@/components";
import { IClass, classService, UpdateClass, CreateClass } from "../index";
import dayjs from "dayjs";
import { useAppDispatch } from "@/plugins";
import { AssignmentStatus } from "@/features";

export const ClassListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isSm } = useBreakpoint(ScreenType.SM);

  const [classList, setClassList] = useState<IClass[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [currentId, setCurrentId] = useState("");
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const rowsPerPage = ROWS_PER_PAGE;
  const [viewMode, setViewMode] = useState(`${isSm ? "table" : "card"} `);

  async function getClassList(query: ICommonListQuery) {
    dispatch(openLoading());
    try {
      const response = await classService.getAllClasses(query);
      if (response?.success) {
        setClassList(response.data?.items);
        setTotalItems(response.data?.totalItems);
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(closeLoading());
    }
  }

  useEffect(() => {
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
  const handleChangePage = async (_event: unknown, newPage: number) => {
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

  return (
    <div>
      <div className="mx-[20px] lg:mx-0">
        <h2 className="text-xl font-medium mb-2">Danh sách lớp học</h2>
        <div className="flex justify-between items-center">
          <OutlinedInput
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "8px !important",
              },
              "& .MuiInputBase-input": {
                padding: "12px",
              },
              width: isSm ? "auto" : "200px",
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
            {isSm && (
              <Tooltip
                sx={{ marginLeft: 2 }}
                title={`${
                  viewMode === "table" ? "Chế độ lưới" : "Chế độ bảng"
                }`}
              >
                <IconButton
                  onClick={() =>
                    setViewMode(viewMode === "table" ? "card" : "table")
                  }
                >
                  {viewMode === "table" ? <ViewModuleIcon /> : <ViewListIcon />}
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      {viewMode === "table" ? (
        <>
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
                const totalPages =
                  count !== 0 ? Math.ceil(count / rowsPerPage) : 1;
                return `Trang ${page + 1}/${totalPages} `;
              }}
            />
          </div>
          <TableContainer
            sx={{
              marginBottom: 10,
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
                    width="10%"
                    align="center"
                  >
                    Giáo viên
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#e3e1e1" }}
                    width="20%"
                    align="center"
                  >
                    Lịch học
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#e3e1e1" }}
                    width="10%"
                    align="center"
                  >
                    Ngày khai giảng
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#e3e1e1" }}
                    width="10%"
                    align="center"
                  >
                    Ngày kết thúc
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
                      key={row?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell width="5%">{index + 1}</TableCell>
                      <TableCell padding="none" width="10%" align="center">
                        {row.code ? (
                          <Chip
                            sx={{
                              backgroundColor: "#1D8FE4",
                              color: "#ffffff",
                            }}
                            label={row?.code}
                          />
                        ) : null}
                      </TableCell>
                      <TableCell width="15%" align="center">
                        {row?.name}
                      </TableCell>
                      <TableCell width="10%" align="center">
                        <div className="line-clamp-2 text-sm">
                          {row?.teacher?.username}
                        </div>
                      </TableCell>

                      <TableCell width="20%" align="center">
                        {row?.description.map((i, index) => (
                          <li className="text-sm" key={index}>
                            Từ {i?.from} đến {i?.to} {i?.date}
                          </li>
                        ))}
                      </TableCell>
                      <TableCell width="10%" align="center">
                        {dayjs(row?.duration[0]).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell width="10%" align="center">
                        {dayjs(row?.duration[1]).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell padding="none" width="10%" align="center">
                        <div className="flex items-center">
                          {/* <Icon
                        color={convertStatusColor(row.status)}
                        path={mdiCircleSmall}
                        size={1.2}
                      /> */}

                          <AppStatus
                            label={convertStatusClass(
                              dayjs(row.duration[0]).toDate(),
                              dayjs(row.duration[1]).toDate()
                            )}
                            backgroundColor={`${
                              convertStatusClass(
                                dayjs(row.duration[0]).toDate(),
                                dayjs(row.duration[1]).toDate()
                              ) === AssignmentStatus.HAPPENNING
                                ? "#EDFFDF"
                                : "#FBEAEA"
                            }`}
                            dotColor={`${
                              convertStatusClass(
                                dayjs(row.duration[0]).toDate(),
                                dayjs(row.duration[1]).toDate()
                              ) === AssignmentStatus.HAPPENNING
                                ? "#57AA16"
                                : "#D62828"
                            }`}
                          />
                          {/* <div className="text-sm mr-2">
                        {convertStatusClass(
                          dayjs(row?.duration[0]).toDate(),
                          dayjs(row?.duration[1]).toDate()
                        )}
                      </div> */}

                          {/* {row.status === ClassStatus.CREATED && (
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
                      )} */}
                        </div>
                      </TableCell>
                      <TableCell padding="none" width="10%" align="center">
                        <div className="flex justify-center">
                          <Tooltip title="Sửa">
                            <IconButton
                              sx={{ color: "#e28d0f" }}
                              onClick={() => {
                                setIsOpenUpdateForm(true),
                                  setCurrentId(row._id);
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
        </>
      ) : (
        <div className="grid grid-cols-12">
          {classList?.length > 0 &&
            classList.map((row, _) => (
              <div
                className="col-span-12 md:col-span-6 lg:col-span-4"
                onClick={() => navigate(`/classes/${row._id}`)}
              >
                <CardItem
                  classItem={row}
                  onEdit={() => {
                    setIsOpenUpdateForm(true), setCurrentId(row._id);
                  }}
                  onDelete={() => handleClickDelete(row._id)}
                  onViewDetails={() => navigate(`/classes/${row._id}`)}
                />
              </div>
            ))}
        </div>
      )}

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
};
