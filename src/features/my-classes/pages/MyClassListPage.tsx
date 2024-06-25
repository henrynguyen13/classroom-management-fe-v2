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
import Icon from "@mdi/react";
import { mdiCircleSmall, mdiLoginVariant } from "@mdi/js";

import {
  ICommonListQuery,
  convertStatusClass,
  AuthStorageService,
  openLoading,
  closeLoading,
} from "@/common";
import { IClass, classService } from "@/features";
import { NoData } from "@/assets";
import dayjs from "dayjs";
import { useAppDispatch } from "@/plugins";

export const MyClassListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userId = AuthStorageService.getLoginUser()._id;
  const [classList, setClassList] = useState<IClass[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  async function getClassList(query: ICommonListQuery) {
    dispatch(openLoading());

    try {
      const response = await classService.getAllMyClasses(
        userId as string,
        query
      );
      setClassList(response.data?.items);
      setTotalItems(response.data?.totalItems);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(closeLoading());
    }
  }
  useEffect(() => {
    getClassList({});
  }, []);
  const [page, setPage] = useState(0);

  const rowsPerPage = 10;

  const handleChangePage = async (_event: unknown, newPage: number) => {
    setPage(newPage);
    const query: ICommonListQuery = {
      page: newPage + 1,
      limit: rowsPerPage,
    };
    const response = await classService.getAllMyClasses(
      userId as string,
      query
    );
    setClassList(response.data.items);
  };

  const convertStatusColor = (status: string) => {
    return status === "Đã tạo"
      ? "#FA8C16"
      : status === "Đang diễn ra"
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
                  <TableCell
                    width="15%"
                    align="center"
                    sx={{ "&:hover": { cursor: "pointer", opacity: 0.7 } }}
                    onClick={() => navigate(`/classes/${row._id}`)}
                  >
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
                        color={convertStatusColor(
                          convertStatusClass(
                            dayjs(row?.duration[0]).toDate(),
                            dayjs(row?.duration[1]).toDate()
                          )
                        )}
                        path={mdiCircleSmall}
                        size={1.2}
                      />
                      <div className="text-sm mr-2">
                        {convertStatusClass(
                          dayjs(row?.duration[0]).toDate(),
                          dayjs(row?.duration[1]).toDate()
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell padding="none" width="10%" align="center">
                    <Tooltip title="Xem chi tiết">
                      <IconButton
                        onClick={() => navigate(`/classes/${row._id}`)}
                      >
                        <Icon path={mdiLoginVariant} size={1} />
                      </IconButton>
                    </Tooltip>
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
    </div>
  );
};
