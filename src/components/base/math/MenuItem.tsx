import { Tooltip, IconButton } from "@mui/material";

interface Props {
  title: string;
  icon: any;
  action: () => void;
  isActive: boolean;
}
export const MenuItem = ({ title, icon, action, isActive }: Props) => {
  return (
    <>
      <Tooltip title={title}>
        <IconButton
          sx={{
            color: isActive ? "red" : "#000", // Highlight active item in red
          }}
          onClick={() => action()}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </>
  );
};
