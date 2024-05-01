import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Divider,
  Paper,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LogoutIcon from "@mui/icons-material/Logout";

import { authService, loggedout } from "@/features";
import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  AuthStorageService,
} from "@/common";

interface Props {
  onClose: () => void;
}
export const HeaderMenu = ({ onClose }: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = AuthStorageService.getLoginUser();

  const handleLogOut = async (userId: string) => {
    const response = await authService.logout(userId);
    console.log("------", response);
    if (response?.success) {
      await showSuccessNotificationFunction("Đăng xuất thành công");
      dispatch(loggedout());
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      await showErrorNotificationFunction(
        "Có lỗi xảy ra, vui lòng kiểm tra lại"
      );
    }
  };

  const navigateToProfilePage = () => {
    navigate(`/profile/${user?._id}`);
    onClose();
  };
  return (
    <>
      <Paper
        sx={{
          width: 220,
          maxWidth: "100%",
          position: "absolute",
          right: "20px",
          zIndex: 10,
        }}
      >
        <MenuList>
          <MenuItem onClick={navigateToProfilePage}>
            <ListItemIcon>
              <ContactPhoneIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Thông tin cá nhân</ListItemText>
          </MenuItem>

          <Divider />
          <MenuItem
            onClick={() => {
              onClose;
              handleLogOut(user?._id ? user._id : "");
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Đăng xuất</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </>
  );
};
