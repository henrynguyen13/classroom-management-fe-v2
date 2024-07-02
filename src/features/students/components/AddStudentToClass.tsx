import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Avatar, OutlinedInput, Chip } from "@mui/material";

import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  ROLES,
  ICommonListQuery,
  IStudent,
  useBreakpoint,
  ScreenType,
} from "@/common";
import { Form, CustomButton } from "@/components";
import { IUser, classService, userService } from "@/features";

interface Props {
  studentsInClass: IStudent[];
  isOpenForm: boolean;
  id: string;
  handleClose: () => void;
  updateStudentList?: () => void;
}

export const AddStudentToClass = (props: Props) => {
  const { isOpenForm, handleClose, id, updateStudentList, studentsInClass } =
    props;
  const { isSm } = useBreakpoint(ScreenType.SM);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<IStudent[]>([]);
  const [isShowStudentList, setIsShowStudentList] = useState<boolean>(false);

  const getAllStudents = async (query: ICommonListQuery) => {
    try {
      const response = await userService.getAllUserWithoutPagination(query);
      if (response?.success) {
        setStudents(
          response.users
            .filter((user: IUser) => user.role === ROLES.STUDENT)
            .filter(
              (student: IStudent) =>
                !studentsInClass.map((i) => i._id).includes(student._id)
            )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  const getAllStudentsWithoutSelected = async (query: ICommonListQuery) => {
    try {
      const response = await userService.getAllUserWithoutPagination(query);
      if (response?.success) {
        setStudents(
          response.users
            .filter((user: IUser) => user.role === ROLES.STUDENT)
            .filter(
              (student: IStudent) =>
                !studentsInClass.map((i) => i._id).includes(student._id)
            )
            .filter(
              (student: IStudent) =>
                !selectedStudents
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
    getAllStudents({});
  }, []);

  const handleCreate = async () => {
    const dto = selectedStudents.map((selected) => selected.email);
    const response = await classService.addToClass(id, dto);
    if (response?.success) {
      showSuccessNotificationFunction("Thêm học sinh thành công");
      setStudents([]);
      setSelectedStudents([]);
      setIsShowStudentList(false);
      if (updateStudentList) {
        updateStudentList();
      }
      handleClose();
    } else {
      showErrorNotificationFunction(
        "Email này đã có trong lớp học hoặc chưa đăng ký tài khoản"
      );
    }
  };

  const handleCancel = () => {
    handleClose();
    setStudents([]);
    setSelectedStudents([]);
    setIsShowStudentList(false);
  };

  const handleSearch = async (e: any) => {
    if (e.target.value.length > 0) {
      setIsShowStudentList(true);
    } else {
      setIsShowStudentList(false);
    }
    const query: ICommonListQuery = {
      textFilter: e.target.value,
    };
    await getAllStudentsWithoutSelected(query);
  };

  const handleSelect = (id: string) => {
    const selectedStudent = students.find((student) => student._id === id);
    if (selectedStudent) {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
      setSelectedStudents((prevSelected) => [...prevSelected, selectedStudent]);
    }
  };

  const handleDelete = (id: string) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.filter((student) => student._id !== id)
    );
    const deletedStudent = selectedStudents.find(
      (student) => student._id === id
    );
    if (deletedStudent) {
      setStudents((prevStudents) => [...prevStudents, deletedStudent]);
    }
  };

  return (
    <Form
      title="Thêm học sinh"
      isOpenForm={isOpenForm}
      handleClose={handleCancel}
      width={isSm ? "700px" : "90vw"}
      height="77vh"
    >
      <Down $height="100px">
        <div className="dropdown">
          {selectedStudents &&
            selectedStudents.map((student) => (
              <Chip
                key={student._id}
                label={student.username}
                variant="outlined"
                sx={{
                  margin: "2px",
                }}
                onDelete={() => handleDelete(student._id)}
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
          {isShowStudentList &&
            students.map((student) => (
              <div
                key={student._id}
                className="flex items-center h-16 hover:bg-neutral-7 cursor-pointer pl-3"
                onClick={() => handleSelect(student._id)}
              >
                <Avatar
                  sx={{ marginRight: 1, width: 40, height: 40 }}
                  src={
                    student.avatar
                      ? student.avatar
                      : `/src/assets/images/no-avatar/webp`
                  }
                />
                <div className="ml-3">
                  <h1>{student.username}</h1>
                  <p className="text-xs text-neutral-4">{student.email}</p>
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
    max-height: ${(props) => props.$height || "300px"};
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
