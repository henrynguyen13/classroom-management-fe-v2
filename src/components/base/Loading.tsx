import { setHandleLoading } from "@/common/app.reducers";
import { useAppSelector } from "@/plugins";
import { Backdrop } from "@mui/material";

export const Loading = () => {
  const isOpenLoading = useAppSelector(setHandleLoading);
  return (
    <Backdrop
      className="ant-picker-dropdown"
      sx={{
        backgroundColor: "rgba(243, 243, 243, 0.4)",
        opacity: 0.4,
      }}
      open={isOpenLoading}
    >
      <div className="loader"></div>
    </Backdrop>
  );
};
