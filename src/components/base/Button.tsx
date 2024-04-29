import { MouseEventHandler, ReactNode } from "react";

import Button from "@mui/material/Button";
interface Props {
  text: string;
  variant?: "contained" | "outlined" | "text";
  readonly?: boolean;
  value?: string;
  disabled?: boolean;
  width?: string;
  color?: string;
  backgroundColor?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  size?: "small" | "medium" | "large";
  borderRadius?: string;
  marginRight?: string;
  onClick?:
    | MouseEventHandler<HTMLButtonElement>
    | ((input: any) => Promise<void>);
}

export default function CustomButton({
  text,
  variant = "contained",
  width = "200",
  disabled = false,
  startIcon,
  color = "white",
  size = "medium",
  backgroundColor = "#1D8FE4",
  endIcon,
  borderRadius = "8",
  marginRight,
  onClick,
}: Props) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      size={size}
      sx={{
        color: color,
        backgroundColor: backgroundColor + " !important",
        width: width + "px",
        textTransform: "none",
        borderRadius: borderRadius + "px",
        marginRight: marginRight + "px",
      }}
    >
      {text}
    </Button>
  );
}
