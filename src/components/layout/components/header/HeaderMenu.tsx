import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LogoutIcon from "@mui/icons-material/Logout";
import { authService } from "@/features/auth/services/auth.service";
import { useDispatch } from "react-redux";
import { loggedout } from "@/features/auth/reducers/auth.reducer";
import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
} from "@/common/helpers";
import { useNavigate } from "react-router-dom";
import authStorageService from "@/common/storages/authStorage.service";

interface Props {
  onClose: () => void;
}
export default function HeaderMenu({ onClose }: Props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = authStorageService.getLoginUser();

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
}
