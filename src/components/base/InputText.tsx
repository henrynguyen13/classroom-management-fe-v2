import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TextField } from "@mui/material";
import { Controller } from "@/plugins";
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
  minWidth?: string;
  onChange?: (e: any) => void;
}

export const InputText = ({
  name,
  control,
  label,
  variant,
  value,
  placeholder,
  disabled,
  width,
  isRequired = true,
}: Props) => {
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
                {isRequired && <span className="text-red">*</span>}
              </label>
            </div>
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  height: "48px",
                  width: width ? width + "px" : "100%",
                },
                "& .MuiInputLabel-root": {
                  display: "none",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ed3a3a",
                },
                width: "100%",
              }}
              id={elementId}
              variant={variant}
              placeholder={placeholder}
              value={fieldValue}
              onChange={fieldOnChange}
              onBlur={fieldOnBlur}
              helperText={error?.message}
              disabled={disabled}
              required={isRequired}
            />
          </div>
        );
      }}
    />
  );
};
