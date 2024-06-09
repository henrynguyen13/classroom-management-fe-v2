import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import _ from "lodash";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  ROLES,
  ISideBar,
  PAGES,
  ALL_MEMBERS,
  AuthStorageService,
  ICommonListQuery,
} from "@/common";
import { Group } from "@/assets";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IGroup, groupService } from "@/features";

const drawerWidth = 280;

export const ForumSideBar = () => {
  const location = useLocation();

  const sidebarItems: ISideBar[] = [
    {
      text: "Tất cả các nhóm",
      icon: Group,
      redirect: PAGES.FORUM,
      role: ALL_MEMBERS,
    },
  ];

  const user = AuthStorageService.getLoginUser();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [total, setTotal] = useState(0);

  const menuItems: ISideBar[] = sidebarItems.filter((item) => {
    return item.role.includes(user?.role as ROLES);
  });

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  async function getAllMyGroups(query: ICommonListQuery) {
    const response = await groupService.getAllMyGroups(user?._id!, query);
    setGroups(response.data?.items);
    setTotal(response.data?.totalItems);
  }

  useEffect(() => {
    getAllMyGroups({});
  }, []);

  const navigate = useNavigate();
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

          <ListItemButton
            onClick={handleClick}
            sx={{
              marginBottom: "12px",
              //   backgroundColor: `${
              //     location.pathname.includes(item.redirect)
              //       ? "#D4EEFF"
              //       : "inherit"
              //   }`,
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
            <ListItemIcon>
              <img src={Group} alt={Group} />
            </ListItemIcon>
            <ListItemText primary="Nhóm của tôi" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {groups.map((group) => (
                <ListItemButton
                  sx={{
                    pl: 4,
                    marginBottom: "12px",
                    //   backgroundColor: `${
                    //     location.pathname.includes(item.redirect)
                    //       ? "#D4EEFF"
                    //       : "inherit"
                    //   }`,
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
                  <ListItemText
                    primary={group?.name}
                    onClick={() => navigate(`/forum/${group._id}`)}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  );
};
