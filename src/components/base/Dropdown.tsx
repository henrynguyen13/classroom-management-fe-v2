import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";
import { IOption } from "@/common";

interface Props {
  control: any;
  name: any;
  options: IOption[];
  placeholder?: string;
  width?: string;
  label?: string;
  disabled?: boolean;
  setType?: (e: any) => void;
}

export const Dropdown = ({
  control,
  name,
  options,
  placeholder,
  width,
  label,
  disabled = false,
  setType,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "this field is requried",
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
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
              value={
                value
                  ? options.find((option) => {
                      return value === option.id;
                    }) ?? null
                  : null
              }
              getOptionLabel={(option) => {
                return option.label;
              }}
              onChange={(event: any, newValue) => {
                onChange(newValue ? newValue.id : null);
                if (setType) setType(newValue?.id);
              }}
              id={name}
              options={options}
              disabled={disabled}
              renderInput={(params) => (
                <TextField {...params} label={placeholder} inputRef={ref} />
              )}
              sx={{
                width: width,
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  padding: "5px",
                },
              }}
            />

            {error ? (
              <span className="text-error text-xs">{error.message}</span>
            ) : null}
          </div>
        );
      }}
    />
  );
};
