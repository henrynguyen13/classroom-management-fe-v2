import {
  ICommonListQuery,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
} from "@/common";
import { IGroupProps, IUser, groupService, userService } from "@/features";
import { useEffect, useState } from "react";

export const useAddUserToGroup = (props?: IGroupProps) => {
  const { usersInGroups, handleClose, groupId, updateUserList } = props!;
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [isShowUserList, setIsShowUserList] = useState<boolean>(false);

  const getAllUsers = async (query: ICommonListQuery) => {
    try {
      const response = await userService.getAllUserWithoutPagination(query);
      if (response?.success) {
        setUsers(
          response.users.filter(
            (user: IUser) =>
              !usersInGroups?.map((i) => i._id).includes(user._id)
          )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  const getAllUsersWithoutSelected = async (query: ICommonListQuery) => {
    try {
      const response = await userService.getAllUserWithoutPagination(query);
      if (response?.success) {
        setUsers(
          response.users
            .filter(
              (student: IUser) =>
                !usersInGroups?.map((i) => i._id).includes(student._id)
            )
            .filter(
              (student: IUser) =>
                !selectedUsers
                  .map((selected) => selected._id)
                  .includes(student._id)
            )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  useEffect(() => {
    getAllUsers({});
  }, []);

  const handleCreate = async () => {
    const dto = selectedUsers.map((selected) => selected.email);
    const response = await groupService.addUsersToGroup(groupId!, dto);
    if (response?.success) {
      showSuccessNotificationFunction("Thêm người dùng thành công");
      setUsers([]);
      setSelectedUsers([]);
      setIsShowUserList(false);
      updateUserList?.();
      handleClose?.();
    } else {
      showErrorNotificationFunction(
        "Email này đã có trong lớp học hoặc chưa đăng ký tài khoản"
      );
    }
  };

  const handleCancel = () => {
    handleClose?.();
    setUsers([]);
    setSelectedUsers([]);
    setIsShowUserList(false);
  };

  const handleSearch = async (e: any) => {
    if (e.target.value.length > 0) {
      setIsShowUserList(true);
    } else {
      setIsShowUserList(false);
    }
    const query: ICommonListQuery = {
      textFilter: e.target.value,
    };
    await getAllUsersWithoutSelected(query);
  };

  const handleSelect = (id: string) => {
    const selectedUser = users.find((user) => user._id === id);
    if (selectedUser) {
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setSelectedUsers((prevSelected) => [...prevSelected, selectedUser]);
    }
  };

  const handleDelete = (id: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.filter((user) => user._id !== id)
    );
    const deletedUser = selectedUsers.find((user) => user._id === id);
    if (deletedUser) {
      setUsers((prevUsers) => [...prevUsers, deletedUser]);
    }
  };

  return {
    isShowUserList,
    users,
    selectedUsers,
    setUsers,
    handleCancel,
    handleSearch,
    handleSelect,
    handleDelete,
    handleCreate,
    setIsShowUserList,
  };
};
