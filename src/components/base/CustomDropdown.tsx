import { TextField, Autocomplete } from "@mui/material";
import { IOption } from "@/common";
import React from "react";

interface Props {
  name: any;
  options: IOption[];
  placeholder?: string;
  width?: string;
  label?: string;
  defaultValue?: IOption;
  error?: string;
  value?: IOption;
  disabled?: boolean;
  onChange?: (event: any, value: any) => void;
}

export const CustomDropdown = React.forwardRef<any, Props>((props, ref) => {
  const {
    name,
    options,
    placeholder,
    width,
    label,
    value,
    disabled = false,
    error,
    ...restProps
  } = props;

  return (
    <div className="w-full mb-6 h-[100px]">
      <div className="mb-[10px] h-6">
        {label && (
          <label>
            <span className="text-base font-medium">{label}</span>
            <span className="text-red">*</span>
          </label>
        )}
      </div>
      <Autocomplete
        ref={ref}
        {...restProps}
        getOptionLabel={(option) => {
          return option.label;
        }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        value={value || null}
        // defaultValue={defaultValue ? defaultValue : field?.value}
        id={name}
        options={options}
        disabled={disabled}
        renderInput={(params) => <TextField {...params} label={placeholder} />}
        sx={{
          width: width,
          "& .MuiInputBase-root": {
            borderRadius: 2,
            padding: "5px",
          },
        }}
      />

      {error ? <span className="text-error text-xs">{error}</span> : null}
    </div>
  );
});
