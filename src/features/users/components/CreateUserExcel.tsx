import { useState } from "react";
import * as xlsx from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import {
  BUFFER,
  MAX_FILE_SIZE,
  convertArrayToJSON,
  convertUserRole,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
} from "@/common";
import { Form, CustomButton, ButtonFile } from "@/components";
import { authService } from "@/features";
interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  updateUserList: () => void;
}

export const CreateUserExcel = (props: Props) => {
  const { isOpenForm, handleClose, updateUserList } = props;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewTable, setPreviewTable] = useState<string[]>([]);

  const handleFileSelect = async (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const data = await file.arrayBuffer();

      const workbook = xlsx.read(data, { type: BUFFER });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, {
        header: 1,
        blankrows: false,
      }) as string[];

      setPreviewTable(jsonData);
    }
  };
  const handleCreate = async () => {
    try {
      if (selectedFile && selectedFile?.size > MAX_FILE_SIZE) {
        throw new Error("This file is exceeds 10MB");
      } else {
        const response = await authService.registerImport(
          convertArrayToJSON(previewTable)
        );
        if (response?.success) {
          showSuccessNotificationFunction("Tạo người dùng thành công");
          setSelectedFile(null);
          setPreviewTable([]);
          handleClose();
          updateUserList();
        } else {
          showErrorNotificationFunction(response?.message);
        }
      }
    } catch (e) {
      showErrorNotificationFunction(e as string);
    } finally {
    }
  };

  return (
    <Form
      title="Tạo file excel"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
      width="700px"
      minWidth={previewTable.length > 0 ? "90vw" : ""}
    >
      <ButtonFile
        title="Chọn file excel"
        onSelectedFile={handleFileSelect}
        selectedFile={selectedFile}
        previewTable={previewTable}
      />

      {previewTable.length > 0 && (
        <TableContainer
          sx={{
            maxHeight: "36vh",
            "&::-webkit-scrollbar": {
              width: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#E1E3E9",
              borderRadius: 2,
            },
            marginTop: 5,
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
                  Tên người dùng
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#e3e1e1" }}
                  width="15%"
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#e3e1e1" }}
                  width="25%"
                  align="center"
                >
                  Vai trò
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {previewTable?.length > 0 &&
                previewTable.slice(1).map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell width="5%">{index + 1}</TableCell>
                    <TableCell width="15%" align="center">
                      {user[0]}
                    </TableCell>
                    <TableCell width="25%" align="center">
                      <div className="line-clamp-2 text-sm">{user[1]}</div>
                    </TableCell>
                    <TableCell width="25%" align="center">
                      <div className="line-clamp-2 text-sm">
                        {convertUserRole(user[3])}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className="flex justify-end mt-10">
        <CustomButton
          text="Hủy"
          backgroundColor="grey"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleClose()}
        />
        <span className="mr-3"></span>
        <CustomButton
          text="Tạo"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleCreate()}
        />
      </div>
    </Form>
  );
};
