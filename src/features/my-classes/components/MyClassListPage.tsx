// import {
//   IconButton,
//   InputAdornment,
//   OutlinedInput,
//   Tooltip,
// } from "@mui/material";
// import { formatDate } from "@/common/helpers";
// import SearchIcon from "@mui/icons-material/Search";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import TablePagination from "@mui/material/TablePagination";
// import { useEffect, useState } from "react";
// import Chip from "@mui/material/Chip";
// import { IClass } from "@/features/classes/interfaces";
// import { classService } from "@/features/classes/services/class.service";
// import { ICommonListQuery } from "@/common/interfaces";
// import Icon from "@mdi/react";
// import { mdiCircleSmall, mdiLoginVariant } from "@mdi/js";

// import { ClassStatus } from "@/features/classes/constants";
// import { convertStatusClass } from "@/common/helpers";
// import authStorageService from "@/common/storages/authStorage.service";
// import { useNavigate } from "react-router-dom";

// export default function MyClassListPage() {
//   const navigate = useNavigate();
//   const userId = authStorageService.getLoginUser()._id
//   const [classList, setClassList] = useState<IClass[]>([]);
//   const [totalItems, setTotalItems] = useState(0);
//   useEffect(() => {
//     async function getClassList(query: ICommonListQuery) {
//       const response = await classService.getAllClasses(
//         userId as string,
//         query
//       );
//       setClassList(response.data?.items);
//       setTotalItems(response.data?.totalItems);
//     }
//     getClassList({});
//   }, []);
//   const [page, setPage] = useState(0);

//   const rowsPerPage = 10;

//   const handleChangePage = async (event: unknown, newPage: number) => {
//     setPage(newPage);
//     const query: ICommonListQuery = {
//       page: newPage + 1,
//       limit: rowsPerPage,
//     };
//     const response = await classService.getAllClasses(userId as string, query);
//     setClassList(response.data.items);
//   };

//   const convertStatusColor = (status: string) => {
//     return status === ClassStatus.CREATED
//       ? "#FA8C16"
//       : status === ClassStatus.OPENING
//       ? "#52C41A"
//       : "#D9D9D9";
//   };
//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <OutlinedInput
//           sx={{
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderRadius: "8px !important",
//             },
//             "& .MuiInputBase-input": {
//               padding: "12px",
//             },
//           }}
//           id="outlined-adornment-search"
//           startAdornment={
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           }
//           placeholder="Tìm kiếm"
//         />
//       </div>
//       <div className="flex justify-between items-center">
//         <div>Tổng số: {totalItems} lớp học</div>
//         <TablePagination
//           sx={{
//             "& .MuiTablePagination-selectLabel": {
//               display: "none",
//             },
//             "& .MuiTablePagination-input": {
//               display: "none",
//             },
//             "& .MuiButtonBase-root:hover": {
//               backgroundColor: "#1D8FE4",
//               opacity: 0.8,
//               color: "#FFFFFF",
//             },
//           }}
//           component="div"
//           count={totalItems}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           labelDisplayedRows={({ page, count }: any) => {
//             const totalPages = count !== 0 ? Math.ceil(count / rowsPerPage) : 1;
//             return `Trang ${page + 1}/${totalPages} `;
//           }}
//         />
//       </div>
//       <TableContainer
//         sx={{
//           maxHeight: "70vh",
//           "&::-webkit-scrollbar": {
//             width: 8,
//           },
//           "&::-webkit-scrollbar-thumb": {
//             backgroundColor: "#E1E3E9",
//             borderRadius: 2,
//           },
//         }}
//         component={Paper}
//       >
//         <Table
//           sx={{
//             minWidth: 650,
//             border: "1px solid #ccc",
//           }}
//           aria-label="sticky table"
//           stickyHeader
//         >
//           <TableHead>
//             <TableRow
//               sx={{
//                 color: "#1b1b33",
//               }}
//             >
//               <TableCell sx={{ backgroundColor: "#e3e1e1" }} width="5%">
//                 STT
//               </TableCell>
//               <TableCell
//                 sx={{ backgroundColor: "#e3e1e1" }}
//                 width="10%"
//                 align="center"
//               >
//                 Mã lớp học
//               </TableCell>
//               <TableCell
//                 sx={{ backgroundColor: "#e3e1e1" }}
//                 width="15%"
//                 align="center"
//               >
//                 Tên lớp học
//               </TableCell>
//               <TableCell
//                 sx={{ backgroundColor: "#e3e1e1" }}
//                 width="25%"
//                 align="center"
//               >
//                 Mô tả
//               </TableCell>
//               <TableCell
//                 sx={{ backgroundColor: "#e3e1e1" }}
//                 width="25%"
//                 align="center"
//               >
//                 Ngày tạo
//               </TableCell>
//               <TableCell
//                 sx={{ backgroundColor: "#e3e1e1" }}
//                 width="10%"
//                 align="left"
//               >
//                 Trạng thái
//               </TableCell>
//               <TableCell
//                 sx={{ backgroundColor: "#e3e1e1" }}
//                 width="10%"
//                 align="center"
//               >
//                 Hành động
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {classList?.length > 0
//               ? classList.map((row, index) => (
//                   <TableRow
//                     key={row._id}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell width="5%">{index + 1}</TableCell>
//                     <TableCell padding="none" width="10%" align="center">
//                       {row.code ? (
//                         <Chip
//                           sx={{ backgroundColor: "#1D8FE4", color: "#ffffff" }}
//                           label={row.code}
//                         />
//                       ) : null}
//                     </TableCell>
//                     <TableCell width="15%" align="center">
//                       {row.name}
//                     </TableCell>
//                     <TableCell width="25%" align="center">
//                       <div className="line-clamp-2 text-sm">
//                         {row.description}
//                       </div>
//                     </TableCell>
//                     <TableCell width="20%" align="center">
//                       {formatDate(row.createdAt)}
//                     </TableCell>
//                     <TableCell padding="none" width="15%" align="center">
//                       <div className="flex items-center">
//                         <Icon
//                           color={convertStatusColor(row.status)}
//                           path={mdiCircleSmall}
//                           size={1.2}
//                         />
//                         <div className="text-sm mr-2">
//                           {convertStatusClass(row.status)}
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell padding="none" width="10%" align="center">
//                       <div className="flex justify-center">
//                         <Tooltip title="Xem chi tiết">
//                           <IconButton
//                             onClick={() => router.push(`/classes/${row._id}`)}
//                           >
//                             <Icon path={mdiLoginVariant} size={1} />
//                           </IconButton>
//                         </Tooltip>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               : null}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }
