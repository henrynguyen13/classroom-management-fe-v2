import { styled } from "styled-components";
import { Avatar, OutlinedInput, Chip } from "@mui/material";

import { Form, CustomButton } from "@/components";
import { IGroupProps, useAddUserToGroup } from "@/features";

export const AddUsersToGroup = (props: IGroupProps) => {
  const { isOpenForm, usersInGroups, handleClose, groupId, updateUserList } =
    props;

  const {
    isShowUserList,
    users,
    selectedUsers,
    handleCancel,
    handleSearch,
    handleSelect,
    handleDelete,
    handleCreate,
  } = useAddUserToGroup({
    usersInGroups,
    handleClose,
    groupId,
    updateUserList,
  });

  return (
    <Form
      title="Thêm học sinh"
      isOpenForm={isOpenForm!}
      handleClose={handleCancel}
      width="700px"
      height="77vh"
    >
      <Down $height="100px">
        <div className="dropdown">
          {selectedUsers &&
            selectedUsers.map((user) => (
              <Chip
                key={user._id}
                label={user.username}
                variant="outlined"
                sx={{
                  margin: "2px",
                }}
                onDelete={() => handleDelete(user._id)}
              />
              //BUG: DANG CÓ 11 HỌC SINH MA SAO HIEN CÓ 10
            ))}
        </div>
      </Down>
      <OutlinedInput
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "8px !important",
          },
          "& .MuiInputBase-input": {
            padding: "12px",
          },
          width: "100%",
          marginTop: 3,
        }}
        onChange={handleSearch}
        placeholder="Tìm kiếm theo tên hoặc email"
      />
      <Down>
        <div className="dropdown">
          {isShowUserList &&
            users.map((user) => (
              <div
                key={user._id}
                className="flex items-center h-16 hover:bg-neutral-7 cursor-pointer pl-3"
                onClick={() => handleSelect(user._id)}
              >
                <Avatar
                  sx={{ marginRight: 1, width: 40, height: 40 }}
                  src={
                    user.avatar
                      ? user.avatar
                      : `/src/assets/images/no-avatar/webp`
                  }
                />
                <div className="ml-3">
                  <h1>{user.username}</h1>
                  <p className="text-xs text-neutral-4">{user.email}</p>
                </div>
              </div>
            ))}
        </div>
      </Down>

      <div className="flex justify-end mt-20">
        <CustomButton
          text="Hủy"
          size="large"
          width="100"
          borderRadius="20"
          backgroundColor="grey"
          onClick={() => handleCancel()}
        />
        <span className="mr-3"></span>
        <CustomButton
          text="Thêm"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleCreate()}
        />
      </div>
    </Form>
  );
};

const Down = styled.div<{ $height?: string }>`
  .dropdown {
    height: ${(props) => props.$height || "300px"};
    overflow-y: auto;
  }

  .dropdown::-webkit-scrollbar {
    width: 8px;
  }
  .dropdown::-webkit-scrollbar-thumb {
    background-color: #e1e3e9;
    border-radius: 2px;
  }
`;
