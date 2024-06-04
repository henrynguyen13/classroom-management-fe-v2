import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "styled-components";

interface IProps {
  items?: any[];
}
export const ItemList = ({ items }: IProps) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 400,

        bgcolor: "background.paper",
        position: "absolute",
        top: "53px",
        right: "235px",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <div className="ml-5 font-semibold">Thông báo</div>
      <div className="flex justify-between my-5">
        <div className="ml-5 font-medium text-sm">Gần đây</div>
        <div className="font-medium text-sm mr-5 text-primary-1">
          Đánh dấu tất cả là đã đọc
        </div>
      </div>
      <Down>
        <div className="dropdown">
          {items && items.length > 0 ? (
            items?.map((item) => (
              <ListItem
                sx={{
                  borderTop: "rgb(231, 232, 233) solid 1px",
                  backgroundColor: `${item?.isRead ? "#FFFFFF" : "#F3F3F3"}`,
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item?.message} secondary="Jan 9, 2014" />
              </ListItem>
            ))
          ) : (
            <div>Hiện chưa có thông báo nào</div>
          )}
        </div>
      </Down>
    </List>
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
