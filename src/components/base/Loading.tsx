import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
  isLoading: boolean;
}
export const Loading = ({ isLoading }: Props) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
