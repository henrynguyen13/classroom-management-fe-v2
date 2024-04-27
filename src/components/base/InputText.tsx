import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import TextField from "@mui/material/TextField";
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

export default function InputText({
  name,
  control,
  label,
  variant,
  value,
  placeholder,
  disabled,
  width = "500",
}: Props) {
  const [elementId, setElementId] = useState("");

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
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  height: "48px",
                  width: width + "px",
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
              disabled={disabled}
            />
          </div>
        );
      }}
    />
  );
}
