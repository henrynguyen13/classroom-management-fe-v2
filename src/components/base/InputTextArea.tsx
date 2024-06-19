import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Textarea from "@mui/joy/Textarea";

import { Controller } from "@/plugins";
interface Props {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  readonly?: boolean;
  value?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
}

export const InputTextArea = ({
  name,
  control,
  label,
  value,
  placeholder,
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
      render={({ field }) => {
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

            <Textarea
              id={elementId}
              placeholder={placeholder}
              defaultValue=""
              minRows={2}
              maxRows={6}
              value={fieldValue}
              onChange={fieldOnChange}
              onBlur={fieldOnBlur}
            />
          </div>
        );
      }}
    />
  );
};
