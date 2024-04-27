// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import _ from "lodash";
// import Image from "next/image";
// import logo from "@/assets/images/logo-blue.svg";
// import { ICommonListQuery, ISideBar } from "@/common/interfaces";
// import Icon from "@mdi/react";
// import { mdiGoogleClassroom, mdiNoteTextOutline } from "@mdi/js";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// import { useSelector } from "react-redux";

// import { useRouter } from "next/router";
// import { userService } from "@/features/profile/services/profile.service";
// import { IUser } from "@/features/auth/interfaces";
// const drawerWidth = 240;
// // const sidebarItems: ISideBar[] = [
// //   {
// //     text: "Lớp học",
// //     icon: <Icon path={mdiGoogleClassroom} size={1}></Icon>,
// //     redirect: "/classes",
// //     role: ONLY_TEACHER,
// //   },
// //   {
// //     text: "Lớp học của tôi ",
// //     icon: <Icon path={mdiGoogleClassroom} size={1}></Icon>,
// //     redirect: "/my-classes",
// //     role: ONLY_STUDENT,
// //   },
// //   {
// //     text: "Bài tập về nhà",
// //     icon: <Icon path={mdiNoteTextOutline} size={1}></Icon>,
// //     redirect: "/homework",
// //     role: ONLY_TEACHER,
// //   },
// //   {
// //     text: "Đề thi",
// //     icon: <Icon path={mdiNoteTextOutline} size={1}></Icon>,
// //     redirect: "/exams",
// //     role: STUDENT_AND_TEACHER,
// //   },
// //   {
// //     text: "Trò chuyện",
// //     icon: <Icon path={mdiNoteTextOutline} size={1}></Icon>,
// //     redirect: "/chat",
// //     role: STUDENT_AND_TEACHER,
// //   },
// // ];

// export default function ChatSideBar() {
//   const router = useRouter();
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [users, setUsers] = useState<IUser[]>([]);

//   //   const menuItems: ISideBar[] = sidebarItems.filter((item) => {
//   //     return item.role.includes(useSelector(userRole) as ROLES);
//   //   });
//   const handleListItemClick = (
//     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
//     index: number
//   ) => {
//     setSelectedIndex(index);
//   };

//   useEffect(() => {
//     const getAllUser = async (query: ICommonListQuery) => {
//       const response = await userService.getAllUser(query);
//       if (response?.success) {
//         setUsers(response?.users);
//       }
//       console.log("---", response);
//     };
//     getAllUser({});
//   }, []);

//   return (
//     <>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             zIndex: 10,
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <div
//           onClick={() => router.push("/dashboard")}
//           className="cursor-pointer"
//         >
//           <Image
//             src={logo}
//             alt="logo-blue"
//             className="mx-auto mt-[10px] mb-0"
//           />
//         </div>
//         <List>
//           {users.map((item, index) => (
//             // <Link href={item.redirect}>
//             <Link href="#">
//               <ListItem
//                 disableGutters={true}
//                 disablePadding={true}
//                 key={index}
//                 sx={{
//                   "& .MuiListItemButton-root.Mui-selected": {
//                     backgroundColor: "#00ADEF",
//                     color: "#ffffff",
//                   },
//                   "& .MuiListItemButton-root:hover": {
//                     backgroundColor: "#00ADEF",
//                     color: "#ffffff",
//                   },
//                   "& .MuiButtonBase-root.MuiListItemButton-root.Mui-selected:hover":
//                     {
//                       backgroundColor: "#00ADEF",
//                       color: "#ffffff",
//                     },
//                 }}
//               >
//                 <ListItemButton
//                   selected={selectedIndex === index}
//                   onClick={(event) => handleListItemClick(event, index)}
//                 >
//                   {/* <ListItemIcon>{item?.avatar}</ListItemIcon> */}
//                   <ListItemText primary={item?.username} />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//           ))}
//         </List>
//       </Drawer>
//     </>
//   );
// }
