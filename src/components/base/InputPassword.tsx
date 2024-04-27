import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller } from "@/plugins/hook-form";
interface Props {
  control: any;
  name: string;
  label?: string;
  variant?: "filled" | "outlined" | "standard";
  placeholder?: string;
  isRequired?: boolean;
  readonly?: boolean;
  value?: string;
  disabled?: boolean;
  width?: string;
  onChange?: (e: any) => void;
}

export default function InputPassword({
  name,
  control,
  label,
  variant,
  value,
  placeholder,
  width = "500px",
}: Props) {
  const [elementId, setElementId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  useEffect(() => {
    setElementId(uuidv4());
  }, []);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value || ""}
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        const {
          value: fieldValue,
          onChange: fieldOnChange,
          onBlur: fieldOnBlur,
        } = field;
        return (
          <div className="w-full mb-6">
            <div className="mb-[10px]">
              <label>
                <span className="text-base font-medium">{label}</span>
                <span className="text-red">*</span>
              </label>
            </div>
            {/* <TextField
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  height: "48px",
                  width: { width },
                },
                "& .MuiInputLabel-root": {
                  display: "none",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ed3a3a",
                },
              }}
              id={elementId}
              variant={variant}
              placeholder={placeholder}
              value={fieldValue}
              onChange={fieldOnChange}
              onBlur={fieldOnBlur}
              helperText={error?.message}
            /> */}

            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  height: "48px",
                  width: { width },
                },
                "& .MuiInputLabel-root": {
                  display: "none",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ed3a3a",
                },
              }}
              id={elementId}
              variant={variant}
              placeholder={placeholder}
              type={showPassword ? "text" : "password"}
              onChange={fieldOnChange}
              onBlur={fieldOnBlur}
              helperText={error?.message}
              value={fieldValue}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        );
      }}
    />
  );
}
