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
  Chip,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Icon from "@mdi/react";
import { mdiLeadPencil, mdiTrashCan, mdiLoginVariant } from "@mdi/js";

import { CustomButton } from "@/components";
import { CreateQuestionBank, UpdateQuestionBank } from "../components";
import {
  ICommonListQuery,
  ROWS_PER_PAGE,
  formatDate,
  showAlert,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
} from "@/common";
import { questionBankService, IQuestionBank } from "..";
import { NoData } from "@/assets";

export const QuestionBankListPage = () => {
  const navigate = useNavigate();

  const [questionBankList, setQuestionBankList] = useState<IQuestionBank[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [currentId, setCurrentId] = useState("");
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);

  async function getQuestionBankList(query: ICommonListQuery) {
    const response = await questionBankService.getAllQuestionBanks(query);
    setQuestionBankList(response.data?.items);
    setTotalItems(response.data?.totalItems);
  }

  useEffect(() => {
    getQuestionBankList({});
  }, []);

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    const query: ICommonListQuery = {
      page: newPage + 1,
      limit: ROWS_PER_PAGE,
    };
    getQuestionBankList(query);
  };
  const updateList = async () => {
    const query: ICommonListQuery = {
      page: page + 1,
      limit: ROWS_PER_PAGE,
    };
    getQuestionBankList(query);
  };

  const handleClickDelete = (id: string) => {
    showAlert({
      title: "Bạn có chắc muốn xóa ngân hàng câu hỏi này",
    }).then((result) => {
      if (result.isConfirmed) {
        return handleDelete(id);
      }
    });
  };

  const handleDelete = async (id: string) => {
    const response = await questionBankService.delete(id);
    if (response?.success) {
      showSuccessNotificationFunction("Xóa ngân hàng câu hỏi thành công");
      updateList();
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra. Vui lòng kiểm tra lại");
    }
  };

  return (
    <>
      <h2 className="text-xl font-medium mb-2">Danh sách ngân hàng câu hỏi</h2>
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
        <div>Tổng số: {totalItems} ngân hàng câu hỏi</div>
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
          rowsPerPage={ROWS_PER_PAGE}
          page={page}
          onPageChange={handleChangePage}
          labelDisplayedRows={({ page, count }: any) => {
            const totalPages =
              count !== 0 ? Math.ceil(count / ROWS_PER_PAGE) : 1;
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
                width="25%"
                align="center"
              >
                Tên ngân hàng
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="25%"
                align="center"
              >
                Mô tả
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="10%"
                align="center"
              >
                Số lượng câu hỏi
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
                width="10%"
                align="center"
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionBankList?.length > 0 ? (
              questionBankList.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell width="5%">{index + 1}</TableCell>

                  <TableCell
                    width="25%"
                    align="center"
                    sx={{ "&:hover": { cursor: "pointer", opacity: 0.7 } }}
                    onClick={() => navigate(`/question-bank/${row._id}`)}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell width="25%" align="center">
                    <div className="line-clamp-2 text-sm">
                      {row.description ?? ""}
                    </div>
                  </TableCell>
                  <TableCell width="10%" align="center">
                    <Chip
                      sx={{ backgroundColor: "#1D8FE4", color: "#ffffff" }}
                      label={row.questions.length}
                    />
                  </TableCell>
                  <TableCell width="25%" align="center">
                    {formatDate(row.createdAt)}
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
                          onClick={() => navigate(`/question-bank/${row._id}`)}
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
                    Hiện chưa có ngân hàng câu hỏi nào.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateQuestionBank
        isOpenForm={isOpenCreateForm}
        handleClose={() => setIsOpenCreateForm(false)}
        updateList={updateList}
      />
      <UpdateQuestionBank
        bankId={currentId}
        isOpenForm={isOpenUpdateForm}
        handleClose={() => setIsOpenUpdateForm(false)}
        updateList={updateList}
      />
    </>
  );
};
