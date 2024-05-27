import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import _ from "lodash";
import { Link, useLocation } from "react-router-dom";

import {
  STUDENT_AND_TEACHER,
  ROLES,
  ISideBar,
  PAGES,
  ADMIN_AND_AFFAIR,
  ALL_MEMBERS,
  AuthStorageService,
  ONLY_TEACHER,
} from "@/common";
import { Student, Class, Dashboard, Question, Calendar } from "@/assets";

const drawerWidth = 240;

export const SideBar = () => {
  const location = useLocation();

  const sidebarItems: ISideBar[] = [
    {
      text: "Trang chủ",
      icon: Dashboard,
      redirect: PAGES.DASHBOARD,
      role: ALL_MEMBERS,
    },
    {
      text: "Lớp học",
      icon: Class,
      redirect: PAGES.CLASS,
      role: ADMIN_AND_AFFAIR,
    },
    {
      text: "Lớp học của tôi",
      icon: Class,
      redirect: PAGES.MY_CLASS,
      role: STUDENT_AND_TEACHER,
    },
    {
      text: "Ngân hàng câu hỏi",
      icon: Question,
      redirect: PAGES.QUESTION,
      role: ONLY_TEACHER,
    },
    {
      text: "Người dùng",
      icon: Student,
      redirect: PAGES.USERS,
      role: ADMIN_AND_AFFAIR,
    },
    {
      text: "Thời khóa biểu",
      icon: Calendar,
      redirect: PAGES.TIME_TABLE,
      role: STUDENT_AND_TEACHER,
    },
  ];

  const role = AuthStorageService.getLoginUser().role;

  const menuItems: ISideBar[] = sidebarItems.filter((item) => {
    return item.role.includes(role as ROLES);
  });

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: 10,
            top: "64px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.15)",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List
          sx={{
            padding: "20px",
            marginTop: "20px",
          }}
        >
          {menuItems.map((item, index) => (
            <Link to={item.redirect} key={index}>
              <ListItem
                disableGutters={true}
                disablePadding={true}
                key={index}
                sx={{
                  marginBottom: "12px",
                  backgroundColor: `${
                    location.pathname.includes(item.redirect)
                      ? "#D4EEFF"
                      : "inherit"
                  }`,
                  borderRadius: 4,
                  "& .MuiListItemButton-root.Mui-selected": {
                    borderRadius: 4,
                    backgroundColor: "#D4EEFF",
                  },
                  "& .MuiListItemButton-root:hover": {
                    borderRadius: 4,
                    backgroundColor: "#D4EEFF",
                  },
                  "& .MuiButtonBase-root.MuiListItemButton-root.Mui-selected:hover":
                    {
                      borderRadius: 4,
                      backgroundColor: "#D4EEFF",
                    },
                  "& .MuiButtonBase-root": {
                    borderRadius: 4,
                  },
                }}
              >
                <ListItemButton selected={location.pathname === item.redirect}>
                  <ListItemIcon>
                    <img src={item.icon} alt={item.icon} />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
};
