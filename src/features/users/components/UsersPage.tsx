import {
  Avatar,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import {
  convertUserRole,
  formatDate,
  showAlert,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
} from "@/common/helpers";
import SearchIcon from "@mui/icons-material/Search";
import CustomButton from "@/components/base/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import { ICommonListQuery } from "@/common/interfaces";
import Icon from "@mdi/react";
import {
  mdiCircleSmall,
  mdiLeadPencil,
  mdiLoginVariant,
  mdiTrashCan,
} from "@mdi/js";
import { NoData } from "@/assets/icons";
import { userService } from "@/features/profile/services/profile.service";
import { IUser } from "@/features/auth/interfaces";
import { ROLES, roles } from "@/common";
import CreateUser from "./CreateUser";
import { useNavigate } from "react-router-dom";
import CreateUserExcel from "./CreateUserExcel";
import { MultiSelect } from "@/components/base";
import UpdateProfile from "@/features/profile/components/UpdateProfile";
import UpdateUser from "./UpdateUser";
export default function UsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentId, setCurrentId] = useState<string>("");
  const [totalItems, setTotalItems] = useState(0);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenCreateExcelForm, setIsOpenCreateExcelForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);

  async function getUsers(query: ICommonListQuery) {
    try {
      const response = await userService.getAllUser(query);
      if (response?.success) {
        setUsers(response.users);
        setTotalItems(response?.totalUsers ?? 0);
      }
    } catch (e) {
      console.error("Error: ", e);
    } finally {
    }
  }

  const handleSearch = async (e: any) => {
    const query: ICommonListQuery = {
      textFilter: e.target.value,
    };
    await getUsers(query);
  };

  useEffect(() => {
    getUsers({});
  }, []);

  const [page, setPage] = useState(0);

  const rowsPerPage = 10;

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    const query: ICommonListQuery = {
      page: newPage + 1,
      limit: rowsPerPage,
    };
    await getUsers(query);
  };

  const handleUpdateUserList = () => {
    handleChangePage(null, 0);
  };

  const convertRoleColor = (role: string) => {
    return role === ROLES.TEACHER
      ? "#FA8C16"
      : role === ROLES.STUDENT
      ? "#52C41A"
      : "#D9D9D9";
  };

  const handleSelectRole = async (role: string) => {
    const query: ICommonListQuery = {
      keyword: role,
    };
    await getUsers(query);
  };

  const handleClickDelete = (id: string) => {
    showAlert({
      title: "Bạn có chắc muốn xóa người dùng này",
    }).then((result) => {
      if (result.isConfirmed) {
        return handleDelete(id);
      }
    });
  };

  const handleDelete = async (id: string) => {
    const response = await userService.deleteUserById(id);
    if (response?.success) {
      showSuccessNotificationFunction("Xóa người dùng thành công");
      handleUpdateUserList();
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra. Vui lòng kiểm tra lại");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium">Danh sách người dùng</h2>

      <div className="flex justify-between items-center">
        <OutlinedInput
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "8px !important",
            },
            "& .MuiInputBase-input": {
              padding: "12px",
            },
            width: "400px",
          }}
          id="outlined-adornment-search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={handleSearch}
          placeholder="Tìm kiếm theo mã, tên, email"
        />

        <MultiSelect
          label="Vai trò"
          name={roles}
          getValue={convertUserRole}
          handleSelect={handleSelectRole}
        />

        <div>
          <CustomButton
            text="Tạo file excel"
            marginRight="12"
            onClick={() => setIsOpenCreateExcelForm(true)}
          />
          <CustomButton
            onClick={() => setIsOpenCreateForm(true)}
            text="Tạo mới"
            width="100"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>Tổng số: {totalItems} người dùng</div>
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
          maxHeight: "60vh",
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
                Mã người dùng
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="20%"
                align="center"
              >
                Tên người dùng
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="20%"
                align="center"
              >
                Email
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="25%"
                align="center"
              >
                Ngày tham gia
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#e3e1e1" }}
                width="10%"
                align="left"
              >
                Vai trò
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
            {users?.length > 0 ? (
              users.map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#F3F4F8" },
                  }}
                >
                  <TableCell width="5%">{index + 1}</TableCell>
                  <TableCell padding="none" width="10%" align="center">
                    {user.code ? (
                      <Chip
                        sx={{ backgroundColor: "#1D8FE4", color: "#ffffff" }}
                        label={user.code}
                      />
                    ) : null}
                  </TableCell>
                  <TableCell
                    width="20%"
                    align="center"
                    sx={{ "&:hover": { cursor: "pointer", opacity: 0.7 } }}
                    onClick={() => navigate(`/users/${user._id}`)}
                  >
                    <div className="flex flex-start items-center text-sm">
                      <Avatar
                        sx={{ marginRight: 1, width: 40, height: 40 }}
                        src={
                          user?.avatar
                            ? user?.avatar
                            : `/src/assets/images/no-avatar/webp`
                        }
                      />
                      {user.username}
                    </div>
                  </TableCell>
                  <TableCell width="20%" align="center">
                    <div className="line-clamp-2 text-sm">{user.email}</div>
                  </TableCell>
                  <TableCell width="25%" align="center">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell padding="none" width="10%" align="center">
                    <div className="flex items-center">
                      <Icon
                        color={convertRoleColor(user.role)}
                        path={mdiCircleSmall}
                        size={1.2}
                      />
                      <div className="text-sm mr-2">
                        {convertUserRole(user.role)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell padding="none" width="10%" align="center">
                    <div className="flex justify-center">
                      <Tooltip title="Sửa">
                        <IconButton
                          sx={{ color: "#e28d0f" }}
                          onClick={() => {
                            setIsOpenUpdateForm(true), setCurrentId(user._id);
                          }}
                        >
                          <Icon path={mdiLeadPencil} size={1} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton
                          sx={{ color: "#ED3A3A" }}
                          onClick={() => handleClickDelete(user._id)}
                        >
                          <Icon path={mdiTrashCan} size={1} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xem chi tiết">
                        <IconButton
                          onClick={() => navigate(`/users/${user._id}`)}
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
                    Hiện chưa có người dùng nào.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateUser
        isOpenForm={isOpenCreateForm}
        handleClose={() => setIsOpenCreateForm(false)}
        updateUserList={handleUpdateUserList}
      />
      <CreateUserExcel
        isOpenForm={isOpenCreateExcelForm}
        handleClose={() => setIsOpenCreateExcelForm(false)}
        updateUserList={handleUpdateUserList}
      />
      <UpdateUser
        id={currentId}
        isOpenForm={isOpenUpdateForm}
        handleClose={() => setIsOpenUpdateForm(false)}
        updateProfile={handleUpdateUserList}
      />
    </div>
  );
}
